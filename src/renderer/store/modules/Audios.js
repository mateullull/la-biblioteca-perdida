import cheerio from 'cheerio'
import axios from 'axios'
import moment from 'moment'

moment.locale('es')

const state = {
  lista: []
}

const mutations = {
  CLEAR_LIST (state) {
    state.lista = []
  },
  ADD_CHAPTER_TO_LIST (state, chapter) {
    state.lista.push(chapter)
  },
  SET_LIST (state, list) {
    if (list) {
      state.lista = list
    } else {
      state.lista = []
    }
  },
  TOGGLE_LISTENED (state, item) {
    state.lista = state.lista.map(t => {
      if (t._id === item._id) {
        t.listened = !t.listened
        return t
      }
      return t
    })
  }
}

const actions = {
  resetList ({ commit }) {
    // do something async
    return new Promise((resolve, reject) => {
      if (!navigator.onLine) {
        resolve()
      } else {
        commit('CLEAR_LIST')
        axios.get('https://raw.githubusercontent.com/mateullull/la-biblioteca-perdida/master/static/database.db').then((response) => {
          // get body data
          let lista = response.data.split('{')
          lista.shift()
          for (var i in lista) {
            let item = '{' + lista[i]
            commit('ADD_CHAPTER_TO_LIST', JSON.parse(item))
          }
          resolve()
        })
      }
    })
  },
  updateList ({ commit }, db) {
    db.find({}).sort({utcTime: -1}).exec((err, doc) => {
      if (err) {
        console.log(err)
      } else {
        commit('SET_LIST', doc)
        let lastDate = doc[0].dateUploaded
        return new Promise((resolve, reject) => {
          if (!navigator.onLine) {
            resolve()
          } else {
            axios.get('https://www.ivoox.com/podcast-podcast-la-biblioteca-perdida_sq_f171036_1.html').then((response) => {
              // get body data
              const $ = cheerio.load(response.data)
              $('.modulo-type-episodio').each(function (i, elem) {
                var chapter = {
                  title: $(this).find('.title-wrapper a').text().trim(),
                  url: $(this).find('.title-wrapper a').attr('href'),
                  description: $(this).find('.title-wrapper button').attr('data-content'),
                  len: $(this).find('div.content p.time').text().trim(),
                  dateUploaded: $(this).find('li.date').attr('title').split('-')[1].trim(),
                  utcTime: parseDate($(this).find('li.date').attr('title').split('-')[1].trim()),
                  listened: false
                }
                if (isBefore($(this).find('li.date').attr('title').split('-')[1].trim(), lastDate)) {
                  resolve()
                  return false
                } else {
                  db.insert(chapter)
                  commit('ADD_CHAPTER_TO_LIST', chapter)
                }
              })
              resolve()
            })
          }
        })
      }
    })
  },
  downloadFileFromURL ({commit}, url) {
    return new Promise((resolve, reject) => {
      axios.get(url).then((response) => {
        // get body data
        const regex = /downloadlink_mm(.*?)ok/g
        let dwURL = 'http://www.ivoox.com/' + regex.exec(response.data)[0]
        axios.get(dwURL).then((response) => {
          // get body data
          const $ = cheerio.load(response.data)
          resolve($('a.btn').attr('href'))
        })
      })
    })
  }
}

function parseDate (date) {
  let audioDate = date.replace(' de ', '-').replace('. de ', '-')
  let day = moment(audioDate, 'DD-MMM-YYYY')
  return moment.utc(moment(day).add(1, 'hour').format()).valueOf()
}

function isBefore (dateA, dateB) {
  if (dateA === dateB) {
    return true
  }
  return moment(parseDate(dateA)).isBefore(parseDate(dateB))
}

export default {
  state,
  mutations,
  actions
}
