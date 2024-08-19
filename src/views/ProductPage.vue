<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <ProductCard :product="product" @buy-now="handleBuyNow" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      product: {
        name: '',
        description: '',
        specifications: '',
        materials: '',
        imageUrl: '',
        price: 0,
      },
    };
  },
  async created() {
    try {
      const response = await axios.get('/offers/enterprise');
      this.product = response.data;
    } catch (error) {
      console.error('Erro ao buscar o produto:', error);
    }
  },
  methods: {
    ...mapActions(['addToCart']),
    handleBuyNow(product) {
      this.addToCart(product);
      this.$router.push({
        name: 'CheckoutPage',
        params: {
          OFFER_CODE: 'enterprise',
        },
      });
    },
  },
};
</script>
