<template>
  <el-row style="width: 100%;">
    <el-col :span="24">
      <el-input placeholder="Escribe alguna palabra y buscamos por ti" v-model="inputSearch">
        <el-button slot="prepend" icon="el-icon-delete" v-on:click="clearSearch()"></el-button>
      </el-input>
      <p style="font-size: 13px">Audios en la lista: {{ totalItems }}</p>
    </el-col>

    <div>
      <el-col :span="24" style="overflow-x: auto;height: 82vh; padding-bottom: 20px" id="listContainer">
        <audio-item v-for="item in list" v-bind:item="item" v-bind:description="item.description" v-bind:key="item.title"></audio-item>
        <el-button v-if="totalItems > 9" style="width: 63%;margin: auto;display: block;" type="primary" v-on:click="infiniteHandler()">Mostrar más</el-button>
      </el-col>
    </div>
  </el-row>
</template>


<script>
  import AudioItem from './AudioItem'

  function paginate (array, pageSize, pageNumber) {
    --pageNumber
    return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize)
  }

  export default {
    data: function () {
      return {
        inputSearch: '',
        busy: false,
        page: 1,
        totalItems: 0
      }
    },
    filters: {
      length: function (value) {
        return value.length
      }
    },
    methods: {
      clearSearch () {
        this.$ga.event('AudioList', 'ClearSearch-Clicked')
        this.inputSearch = ''
        document.getElementById('listContainer').scrollTop = 0
      },
      infiniteHandler () {
        this.page++
        console.log(this.page)
      }
    },
    computed: {
      list () {
        let lista = this.$store.state.Audios.lista.filter(item => {
          return item.title.toLowerCase().indexOf(this.inputSearch.toLowerCase()) > -1
        })
        this.totalItems = lista.length
        return paginate(lista, 10 * this.page, 1)
      }
    },
    name: 'audio-list',
    components: { AudioItem }
  }
</script>