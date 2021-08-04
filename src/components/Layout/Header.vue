<template>
  <q-header elevated class="bg-primary text-white" height-hint="98">
    <q-toolbar>
      <q-toolbar-title>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
        </q-avatar>
        Title
      </q-toolbar-title>
    </q-toolbar>

    <q-tabs align="left">
      <q-route-tab
        v-for="(route, i) in routes"
        :key="i"
        :to="route.path"
        :label="route.name"
      />
      <q-route-tab @click="logout" :label="name" />
    </q-tabs>
  </q-header>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from "vue";
import useGeneral from "../../composables/useGeneral";

export default defineComponent({
  setup() {
    const { router, auth } = useGeneral();
    const name = ref("");

    const routes = computed(() => {
      return router.options.routes;
    });

    onBeforeMount(async () => {
      const user = await auth.currentUser;
      if (user && user.email) {
        name.value = user.email.split("@")[0];
        console.log(user.email);
      }
    });

    const logout = async () => {
      const res = await auth.signOut();
      console.log("Signed Out", res);
    };

    return {
      routes,
      logout,
      name,
    };
  },
});
</script>

<style></style>
