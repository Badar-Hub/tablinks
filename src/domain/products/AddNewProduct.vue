<template>
  <Modal :title="isEditing ? 'Update Product' : 'Add New Product'">
    <q-form @submit="isEditing ? onUpdate() : onSubmit()" class="q-gutter-md">
      <div class="row">
        <div class="col col-xs-12 col-sm-6 q-px-sm">
          <Input
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
            label="Sku"
            v-model="product.sku"
            class="full-width"
          />
        </div>
        <div class="col col-xs-12 col-sm-6 q-px-sm">
          <Input
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
            label="Name"
            v-model="product.name"
            class="full-width"
          />
        </div>
        <div class="col col-xs-12 col-sm-6 q-px-sm">
          <Input
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
            label="Brand"
            v-model="product.brand"
            class="full-width"
          />
        </div>
        <div class="col col-xs-12 col-sm-6 q-px-sm">
          <Input
            type="number"
            label="Price"
            v-model="product.price"
            class="full-width"
            lazy-rules
            :rules="[(val) => (val = 0 || 'Please enter a valid value')]"
          />
        </div>
        <div class="col col-xs-12 col-sm-6 q-px-sm">
          <Input
            type="number"
            label="Discount"
            v-model="product.discount"
            class="full-width"
            lazy-rules
            :rules="[(val) => val >= 0 || 'Please enter a valid value']"
          />
        </div>
      </div>
    </q-form>
    <div class="row q-mt-lg">
      <div class="col col-xs-12 col-sm-6 q-px-sm">
        <q-btn
          type="submit"
          class="full-width"
          :label="isEditing ? 'Update' : 'Submit'"
          color="primary"
        />
      </div>
      <div class="col col-xs-12 col-sm-6 q-px-sm">
        <q-btn class="full-width" label="Close" v-close-popup color="primary" />
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Input from "../../components/General/Input.vue";
import Modal from "../../components/General/Modal.vue";
import useGeneral from "../../composables/useGeneral";
import ProductModel from "./ProductModel";

export default defineComponent({
  components: {
    Input,
    Modal,
  },
  emits: ["closeModal"],
  setup(_, context) {
    const { db } = useGeneral();
    const product = ref<ProductModel>({
      uid: "",
      sku: "",
      name: "",
      brand: "",
      price: 0,
      discount: 0,
    });
    const isEditing = ref(false);

    const setToEdit = (productRes: ProductModel) => {
      isEditing.value = true;
      product.value.uid = productRes.uid;
      product.value.sku = productRes.sku;
      product.value.name = productRes.name;
      product.value.brand = productRes.brand;
      product.value.price = productRes.price;
      product.value.discount = productRes.discount;
    };

    const resetForm = () => {
      product.value.uid = "";
      product.value.sku = "";
      product.value.name = "";
      product.value.brand = "";
      product.value.price = 0;
      product.value.discount = 0;
      isEditing.value = false;
    };

    const onUpdate = async () => {
      try {
        console.log("om", product.value);
        await db
          .ref()
          .child("products/" + product.value.uid!)
          .update(product.value);
        resetForm();
        context.emit("closeModal");
      } catch (error) {
        console.log(error);
      }
    };

    const onDelete = async (uid: string) => {
      if (window.confirm("Do you really want to delete?")) {
        const productRef = await db.ref().child("products/" + uid);
        await productRef.remove();
      }
    };

    const onSubmit = async () => {
      try {
        // Get a key for a new Post.
        let updates: any = {};
        const newPostKey = db
          .ref()
          .child("products")
          .push().key;
        if (newPostKey) {
          product.value.uid = newPostKey;
        }

        // Write the new post's data simultaneously in the posts list and the user's post list.
        updates["/products/" + newPostKey] = product.value;
        db.ref().update(updates);
        resetForm();
        context.emit("closeModal");
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(async () => {});

    return {
      product,
      onSubmit,
      onDelete,
      onUpdate,
      setToEdit,
      isEditing,
      resetForm,
    };
  },
});
</script>

<style></style>
