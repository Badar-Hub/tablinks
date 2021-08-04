<template>
  <q-card>
    <q-card-section>
      <div class="row">
        <div class="col col-xs-12">
          <h6 class="q-my-sm">Sku: {{ product.sku }}</h6>
          <h6 class="q-my-sm">Name: {{ product.name }}</h6>
          <h6 class="q-my-sm">Price: {{ product.price }}</h6>
          <h6 class="q-my-sm">Discount Price: {{ product.discount }}</h6>
          <h6 v-if="!addQty" @click="addQty = !addQty" class="q-my-sm">
            Qty: {{ product.qty }} Click here to change quantity
          </h6>
          <div v-else class="row">
            <div class="col-xs-6">
              <Input
                label="Quantity"
                type="number"
                v-model.number="inventory.qty"
                class="q-my-sm"
                >Qty: {{ product.qty }}</Input
              >
            </div>
            <div class="col-xs-6 q-my-auto text-right">
              <q-btn color="primary" label="Submit" @click="onSubmit" />
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import Input from "../../components/General/Input.vue";
import useGeneral from "../../composables/useGeneral";
import ProductModel from "../products/ProductModel";

export default defineComponent({
  components: {
    Input,
  },
  props: {
    product: {
      type: Object as PropType<ProductModel>,
    },
  },
  setup(props) {
    const addQty = ref(false);
    const { db } = useGeneral();
    const inventory = ref({
      uid: "",
      productId: "",
      qty: 0,
    });

    // const submit = async () => {
    //   try {
    //     console.log(qty.value);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    const resetForm = () => {
      inventory.value.uid = "";
      inventory.value.productId = "";
      inventory.value.qty = 0;
    };

    const onSubmit = async () => {
      if (props.product?.uid) {
        inventory.value.productId = props.product.uid;
      }
      try {
        // Get a key for a new Post.
        let updates: any = {};
        const newPostKey = db
          .ref()
          .child("inventory")
          .push().key;
        if (newPostKey) {
          inventory.value.uid = newPostKey;
        }

        // Write the new post's data simultaneously in the posts list and the user's post list.
        updates["/inventory/" + newPostKey] = inventory.value;
        db.ref().update(updates);
        resetForm();
      } catch (error) {
        console.log(error);
      }
    };

    return {
      inventory,
      addQty,
      onSubmit,
    };
  },
});
</script>

<style></style>
