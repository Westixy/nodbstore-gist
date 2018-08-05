const now = () => (new Date).getTime()
const Gists = require('gists')

class NoDBStoreGist {
  constructor({
    gistId = process.env.NODB_GIST_ID,
    token = process.env.NODB_GIST_TOKEN,
    name = 'default'
  } = {}) {
    this._gistId = gistId
    this._gistToken = token
    this._gistName = name
    this._pending = false
    this._lastWrite = 0
    /**
     * used to define the minimum time between 2 updates (default : 10000ms)
     * @type {int}
     */
    this.minUpdate = 10000
    this._gist = new Gists({
      token
    })
  }

  init() {}
  write() {
    if (this._pending === true) return
    if (this._checkWritable()) {
      this._updateGist().catch(console.error)
    } else {
      this._pending = true
      setTimeout(() => {
        this._updateGist().catch(console.error)
        this._pending = false
      }, this.minUpdate - (now() - this._lastWrite))
    }
  }

  async load() {
    const obj = await this._getGist().catch(console.error)
    this.nodb.loadJson(obj.content)
  }

  _updateGist() {
    this._lastWrite = now()
    return new Promise((res, rej) =>
      this._gist.edit({
        id: this._gistId,
        files: {
          [`${this._gistName}.nodb.json`]: {
            content: this.nodb.toJson()
          }
        }
      }, (e, r) => {
        if (e === null) {
          const name = `${this._gistName}.nodb.json`
          if (r.files[name] !== undefined)
            res(r.files[name])
          else
            res(null)
        } else rej(e)
      })
    )
  }

  _getGist() {
    return new Promise((res, rej) =>
      this._gist.download({
        id: this._gistId
      }, (e, r) => {
        if (e === null) {
          const name = `${this._gistName}.nodb.json`
          if (r.files[name] !== undefined)
            res(r.files[name])
          else
            res(null)
        } else rej(e)
      })
    )
  }

  _checkWritable() {
    return (now() - this._lastWrite >= this.minUpdate)
  }
}



module.exports = NoDBStoreGist