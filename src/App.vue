<template>
  <!-- <div v-if="!isLoggedIn" class="row">
    <Login />
  </div> -->
  <div class="row">
    <q-layout view="hHh lpR fFf">
      <Header />
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, ref } from "vue";
import useGeneral from "./composables/useGeneral";
import Header from "./components/Layout/Header.vue";
// import Login from "./domain/user/login.vue";

export default defineComponent({
  components: {
    Header,
    // Login,
  },
  setup() {
    const isLoggedIn = ref(false);
    const { firebase, router, route } = useGeneral();

    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          router.replace("/login");
        } else if (route.path == "/login") {
          isLoggedIn.value = true;
          router.replace("/");
        }
      });
    });

    return {
      isLoggedIn,
    };
  },
});
</script>

<style lang="scss"></style>
