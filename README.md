# NoDbStore-gist

NoDB storage using gist as persistent mode

You need to create a gist manually to obtain his id

## Getting started
You can define these two keys in your environnement :
```
NODB_GIST_ID=
NODB_GIST_TOKEN=
```

Install with `npm i nodbstore nodbstore-gist`

```js
const NoDB = require('nodbstore')

// create a store
const NoDBStoreGist = require('nodbstore-gist')
const store = new NoDBStoreGist()

// if you want to use another token / gistId / database name
const store = new NoDBStoreGist({gistId, token, name})
// no one are necessary if you use only the gistId 
//   the token stored in the environement will be used

// add the store to the db
const db = new NoDB()
db.addStore(store)

// you can change the time between two save with (ms)
store.minUpdate = 3000

// load the database
store.load().then(()=>{
  db.put({addMore: 'data'})
}).catch(console.error)
```
