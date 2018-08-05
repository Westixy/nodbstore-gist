# NoDbStore-gist

NoDB storage using gist as persistent mode

## Getting started
You can define these two keys in your environnement : 
```
NODB_GIST_ID=
NODB_GIST_TOKEN=
```

Install with `npm i nodbstore nodbstore-gist`

create a store
```js
const NoDBStoreGist = require('nodbstore-gist')
const store = new NoDBStoreGist()
// if you want to use another token / gistId / database name
const store = new NoDBStoreGist({gistId, token, name})
// no one are necessary if you use only the gistId 
//   the token stored in the environement will be used
```