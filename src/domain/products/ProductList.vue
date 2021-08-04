<template>
  <div class="row justify-between q-ma-md">
    <h5 class="q-ma-sm">Products</h5>
    <q-btn label="Add New Product" color="primary" @click="newProductAction" />
  </div>
  <div class="row">
    <div
      v-for="(product, i) in products"
      :key="i"
      class="col col-xs-12 col-sm-4 q-pa-sm"
    >
      <ProductCard
        @delete="deleteAction(product.uid)"
        @update="updateAction(product)"
        :product="product"
      />
    </div>
  </div>
  <AddNewProduct
    ref="productRef"
    @closeModal="productModal = !productModal"
    v-model="productModal"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import useGeneral from "../../composables/useGeneral";
import AddNewProduct from "./AddNewProduct.vue";
import ProductCard from "./ProductCard.vue";
import ProductModel from "./ProductModel";

export default defineComponent({
  components: {
    AddNewProduct,
    ProductCard,
  },
  setup() {
    const { db } = useGeneral();
    const productModal = ref(false);
    const productRef = ref();
    const products = ref<ProductModel[]>([]);

    const newProductAction = () => {
      productRef.value.resetForm();
      productModal.value = !productModal.value;
    };

    const updateAction = (product: ProductModel) => {
      productModal.value = true;
      productRef.value.setToEdit(product);
    };

    const deleteAction = (id: string) => {
      productRef.value.onDelete(id);
    };

    onMounted(async () => {
      const data = db.ref("products/");
      await data.on("value", (snapshot: any) => {
        products.value = snapshot.val();
        console.log(products.value);
      });
    });

    return {
      productModal,
      products,
      productRef,
      updateAction,
      deleteAction,
      newProductAction,
    };
  },
});
</script>
