import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import router from './router'
import store from './store'
import firebaseConfig from "@/Firebase"
import firebase from "firebase"

firebase.initializeApp(firebaseConfig);

createApp(App).use(store).use(router).use(Quasar, quasarUserOptions).mount('#app')
