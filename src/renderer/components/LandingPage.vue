<template>
  <el-container>
    <el-aside style="width: 210px; position: relative">
      <el-header>
        <h1>LBP</h1>
      </el-header>
      
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
              default-active="1"
              class="el-menu-vertical"
              background-color="#363E43"
              text-color="#fff"
              active-text-color="#ffd04b">
              <router-link to="/audio-list" tag="div">
                <el-menu-item index="1">
                  <i class="el-icon-tickets"></i>
                  <span>Audios</span>
                </el-menu-item>
              </router-link>
              <router-link to="/listened" tag="div">
                <el-menu-item index="2">
                  <i class="el-icon-view"></i>
                  <span>Ya escuchados</span>
                  <el-badge class="mark" :value="listened" />
                </el-menu-item>
              </router-link>
            </el-menu>
          </el-col>
        </el-row>
        <div class="text-center paypal-frm" style="background-color: #4C5456; bottom: 0px; position: absolute; width: 184px; padding-top: 15px; padding-left: 26px; padding-bottom: 10px;">
          <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
              <input type="hidden" name="cmd" value="_donations">
              <input type="hidden" name="business" value="mikelcg@gmail.com">
              <input type="hidden" name="lc" value="ES">
              <input type="hidden" name="item_name" value="Podcast La Biblioteca Perdida">
              <input type="hidden" name="no_note" value="0">
              <input type="hidden" name="currency_code" value="EUR">
              <input type="hidden" name="bn" value="PP-DonationsBF:btn_donateCC_LG.gif:NonHostedGuest">
              <input type="image" src="https://www.paypalobjects.com/es_ES/ES/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal. La forma rápida y segura de pagar en Internet">
              <img alt="paypal image" border="0" src="https://www.paypalobjects.com/es_XC/i/scr/pixel.gif" width="1" height="1">
          </form>
      </div>
    </el-aside>
    
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    created: function () {
      this.$router.push({ path: 'audio-list' })
      const loading = this.$loading({
        lock: true,
        text: 'Actualizando información',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      const store = this.$store
      const db = this.$db

      console.log('Created')

      this.$db.count({}).exec((err, count) => {
        if (err) {
          console.log(err)
        } else {
          if (count === 0) {
            store.dispatch('resetList').then(function () {
              db.insert(store.state.Audios.lista)
              loading.close()
            })
          } else {
            store.dispatch('updateList', db).then(() => {
              loading.close()
            })
          }
        }
      })
    },
    computed: {
      listened () {
        let count = 0
        this.$store.state.Audios.lista.forEach((item) => {
          if (item.listened === true) count++
        })
        return count
      }
    },
    name: 'landing-page'
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  body {
    font-family: 'Source Sans Pro', sans-serif;
    margin: 0px !important;
  }

  .el-main {
    height: 100vh !important;
    overflow: hidden !important;
  }

  .el-badge__content{
    border: none;
  }

  .el-menu-vertical{
    border-right: none;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 98%;
    margin: 10px;
  }

  h1{
    margin: 0px !important;
    padding-top: 14px;
    color: white;
  }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    max-width: 830px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }


  .el-header{
    background-color: #4C5456;
    height: 50px
  }

  .el-aside{
    height: 100vh;
    background-color: #363E43;
  }
</style>
