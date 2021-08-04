<template>
  <q-card>
    <q-card-section>
      <div class="row">
        <div class="col col-xs-12">
          <h5 class="q-my-sm">Sku: {{ product.sku }}</h5>
          <h5 class="q-my-sm">Name: {{ product.name }}</h5>
          <h5 class="q-my-sm">Brand: {{ product.brand }}</h5>
          <h5 class="q-my-sm">Price: {{ product.price }}</h5>
          <h5 class="q-my-sm">Discount: {{ product.discount }}</h5>
        </div>
      </div>
    </q-card-section>
    <div class="row justify-between">
      <div class="col col-xs-12 col-sm-6 q-pa-sm">
        <q-btn
          @click="$emit('update')"
          label="Edit"
          color="secondary"
          class="full-width"
        />
      </div>
      <div class="col col-xs-12 col-sm-6 q-pa-sm">
        <q-btn
          @click="$emit('delete')"
          label="Delete"
          color="red"
          class="full-width"
        />
      </div>
    </div>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ProductModel from "./ProductModel";
export default defineComponent({
  props: {
    product: {
      type: Object as PropType<ProductModel>,
    },
  },
});
</script>

<style></style>
