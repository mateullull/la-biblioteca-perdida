import FileSaver from 'file-saver'

export default class Downloader {
  download (sourceUrl, targetFile, progressCallback) {
    fetch(sourceUrl)
      .then(res => consume(res.body.getReader(), targetFile, progressCallback))
      .catch(e => console.log('something went wrong: ' + e))
  }
}

function consume (reader, targetFile, progressCallback) {
  var total = 0
  let buffers = []
  // let myFile = null
  return new Promise((resolve, reject) => {
    function pump () {
      reader.read().then(({done, value}) => {
        if (done) {
          FileSaver.saveAs(new Blob(buffers), targetFile + '.mp3')
          progressCallback(formatBytes(total, 3), true)
          resolve()
          return
        }
        total += value.byteLength
        progressCallback(formatBytes(total, 3), false)
        buffers.push(Buffer.from(value))
        pump()
      }).catch(reject)
    }
    pump()
  })
}

function formatBytes (bytes, decimals) {
  if (bytes === 0) return '0 Bytes'
  var k = 1024
  var dm = decimals || 2
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  var i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}
