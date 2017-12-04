<template>
  <el-row style="width: 100%;">
    <el-col :span="24">
      <el-input placeholder="Escribe alguna palabra y buscamos por ti" v-model="inputSearch">
        <el-button slot="prepend" icon="el-icon-delete" v-on:click="inputSearch = ''"></el-button>
      </el-input>
      <p style="font-size: 13px">Audios en la lista: {{ list | length }}</p>
    </el-col>

    <el-col :span="24" style="overflow-x: auto;height: 82vh;">
      <audio-item v-for="item in list" v-bind:item="item" v-bind:description="item.description" v-bind:key="item.title"></audio-item>
    </el-col>
  </el-row>
</template>


<script>
  import AudioItem from './AudioItem'

  export default {
    data: function () {
      return {
        inputSearch: ''
      }
    },
    filters: {
      length: function (value) {
        return value.length
      }
    },
    computed: {
      list () {
        return this.$store.state.Audios.lista.filter(item => {
          return (item.title.toLowerCase().indexOf(this.inputSearch.toLowerCase()) > -1) && (item.listened === true)
        })
      },
      listened () {
        let count = 0
        this.$store.state.Audios.lista.forEach((item) => {
          if (item.listened === true) count++
        })
        return count
      }
    },
    name: 'audio-list',
    components: { AudioItem }
  }
</script>