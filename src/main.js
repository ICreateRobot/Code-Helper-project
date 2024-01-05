import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
// import VueClipboard from 'vue-clipboard2'
import VueSmoothScroll from "vue2-smooth-scroll";


// createApp(App).mount('#app')
const app = createApp(App);
// app.use(VueSmoothScroll)
// app.use(VueClipboard)
app.mount('#app')
