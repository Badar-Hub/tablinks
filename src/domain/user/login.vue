<template>
  <div
    class="column justify-center items-center"
    :style="{ height: 100 + 'vh', backgroundColor: '#f3f3f3' }"
  >
    <q-card class="my-card">
      <q-card-section>
        <q-form @submit="onSubmit">
          <div class="row">
            <div class="col-xs-12 q-my-sm">
              <q-input label="Email" type="email" v-model="user.email" />
            </div>
            <div class="col-xs-12 q-my-sm">
              <q-input
                label="Password"
                type="password"
                v-model="user.password"
              />
            </div>
            <div class="col-xs-12 q-my-sm">
              <q-btn
                color="primary"
                type="submit"
                label="Submit"
                class="full-width"
              />
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import useGeneral from "../../composables/useGeneral";
import { ref, defineComponent } from "vue";

export default defineComponent({
  setup() {
    const { auth } = useGeneral();

    const user = ref({
      email: "",
      password: "",
    });

    const onSubmit = async () => {
      // we also renamed this method
      const res = await auth.signInWithEmailAndPassword(
        user.value.email,
        user.value.password
      ); // THIS LINE CHANGED

      console.log(res);

      //  store.dispatch("setUser", res.data.userData);
    };

    return {
      user,
      onSubmit,
    };
  },
});
</script>

<style></style>
