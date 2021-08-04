import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex"
import { useQuasar } from "quasar"
import firebase from "firebase"

export default function () {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const $q = useQuasar()
    const auth = firebase.auth()
    const db = firebase.database()

    return {
        router, route, store, $q, firebase, auth, db
    }
}