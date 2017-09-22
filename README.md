# saleweb

> A Vue.js project

## framework css
```
# font awesome
npm install font-awesome --save
import '../node_modules/font-awesome/css/font-awesome.css'

# bulma
npm install bulma --save
import 'bulma/css/bulma.css'

# JQuery
npm install jquery --save-dev
import $ from 'jquery'

# numeral
npm install numeral --save
import numeral from 'numeral'

# material
npm install vue-material --save
import VueMaterial from 'vue-material'
Vue.use(VueMaterial)

# material icons
npm install material-icons
import '../node_modules/material-icons/css/material-icons.css'

# datepicker
https://www.npmjs.com/package/vuejs-datepicker

# alert 
npm install sweetalert --save
import VueSweetAlert from 'sweetalert'
import 'sweetalert/dist/sweetalert.css'

# touch 
npm install vue-touchjs --save
import vueTouch from 'vue-touchjs'
Vue.use(vueTouch, {name: 'v-touch'})

```
## Set config after build project
# set path index
```
ลบ '/' ในไฟล์ config/index.js
ตัวอย่าง
========
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '',
    
```
# Set static Fonts in Project
```
เพิ่ม คำสั่ง  publicPath: '../../' ในไฟล์ build/utils.js 
ตัวอย่าง 
========
	if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
        publicPath: '../../'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }

```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
