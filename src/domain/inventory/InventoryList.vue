<template>
  <div class="row">
    <div class="col col-xs-12 col-sm-6 q-pa-md">
      <h5 class="q-my-sm">Inventory Management</h5>
    </div>
  </div>
  <div class="row q-pa-md">
    <div
      v-for="(product, i) in products"
      :key="i"
      class="col col-xs-12 col-sm-4"
    >
      <InventoryCard :product="product" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import InventoryCard from "./InventoryCard.vue";
import ProductModel from "../products/ProductModel";
import useGeneral from "../../composables/useGeneral";

export default defineComponent({
  components: {
    InventoryCard,
  },
  setup() {
    const products = ref<ProductModel[]>([]);
    const { db } = useGeneral();
    onMounted(async () => {
      try {
        const data = db.ref("products/");
        await data.on("value", (snapshot: any) => {
          products.value = snapshot.val();
          console.log(products.value);
        });
      } catch (error) {
        console.log(error);
      }
    });

    return {
      products,
    };
  },
});
</script>

<style></style>
