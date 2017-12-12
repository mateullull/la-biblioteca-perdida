<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{ item.title }}</span>
      <el-button-group style="float: right">
        <el-tooltip v-if="downloadedSize" content="Descargando audio" placement="top">
          <el-button disabled size="mini" type="primary" icon="el-icon-loading"></el-button>
        </el-tooltip>
        <el-tooltip v-else content="Descargar audio" placement="top">
          <el-button size="mini" type="primary" icon="el-icon-download" v-on:click="downloadFile(item.url, item.title)"></el-button>
        </el-tooltip>
        <el-tooltip v-if="item.listened == true" content="Marcar como no escuchado" placement="top">
          <el-button size="mini" type="success" icon="el-icon-view" v-on:click="alreadyListen(item)"></el-button>
        </el-tooltip>
        <el-tooltip v-else content="Marcar como ya escuchado" placement="top">
          <el-button size="mini" type="primary" icon="el-icon-view" v-on:click="alreadyListen(item)"></el-button>
        </el-tooltip>
        <el-tooltip content="Escuchar audio" placement="top">
          <el-button size="mini" type="primary" icon="el-icon-caret-right" v-on:click="open(item.url)"></el-button>
        </el-tooltip>
      </el-button-group><br>
      <span style="font-size: 13px" v-if="downloadedSize">Descargando: {{ downloadedSize }}</span>
    </div>
    <div class="text">
      {{ item.description }}
      <br> <br>
      <small>{{ item.dateUploaded }}</small>
      <small style="float: right;">{{ item.len }}</small>
    </div>
  </el-card>
</template>

<script>
  // import download from 'downloadjs'
  import Downloader from './Downloader.js'

  export default {
    props: ['item'],
    data: () => {
      return {downloadedSize: null}
    },
    methods: {
      alreadyListen (item) {
        this.$ga.event('AudioItem', 'ToggleListened-Clicked')
        this.$store.commit('TOGGLE_LISTENED', item)
        this.$db.update({'_id': item._id}, {$set: {listened: item.listened}})
      },
      downloadFile (url, title) {
        this.$ga.event('AudioItem', 'DownloadFile-Clicked', url)
        const restResourceService = new Downloader()
        this.$store.dispatch('downloadFileFromURL', url).then((downloadURL) => {
          restResourceService.download(downloadURL, title, (bytes, done) => {
            this.downloadedSize = bytes
            if (done === true) this.downloadedSize = null
          })
        })
      },
      // addRepo () {
      // }
      open (link) {
        this.$ga.event('AudioItem', 'OpenIvoox-Clicked', link)
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style scoped>
  .title {
    color: #888;
    font-size: 18px;
    font-weight: initial;
    letter-spacing: .25px;
    margin-top: 10px;
  }

  .items { margin-top: 8px; }

  .item {
    display: flex;
    margin-bottom: 6px;
  }

  .item .name {
    color: #6a6a6a;
    margin-right: 6px;
  }

  .item .value {
    color: #35495e;
    font-weight: bold;
  }
</style>
