<template>
  <v-card class="product-card" elevation="4">
    <v-img :src="product.imageUrl" class="product-image" contain></v-img>
    <v-card-title class="product-title">{{ product.name }}</v-card-title>
    <v-card-text class="product-description">{{ product.description }}</v-card-text>
    <v-card-subtitle class="product-specifications">Especificações: {{ product.specifications }}</v-card-subtitle>
    <v-card-subtitle class="product-materials">Material: {{ product.materials }}</v-card-subtitle>
    <v-card-subtitle class="product-price">{{ formattedPrice }}</v-card-subtitle>
    <v-card-actions v-if="showBuyNowButton" class="d-flex justify-center">
      <v-btn @click="buyNow" class="buy-now-btn" large>Buy Now</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    },
    showBuyNowButton: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    formattedPrice() {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(this.product.price); 
    },
  },
  methods: {
    buyNow() {
      this.$emit('buy-now', this.product);
    },
  },
};
</script>


<style scoped>
.product-card {
  border-radius: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #2a2a2a 0%, #f8f8f8 100%);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.37);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  transform: translateY(-6px);
}

.product-image {
  object-fit: cover;
  width: 100%;
  height: auto;
  max-height: 250px;
  border-radius: 12px;
  margin-bottom: 16px;
}

.product-title {
  font-size: 1.7rem;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  margin-bottom: 10px;
}

.product-description {
  font-size: 1.1rem;
  color: #424040;
  margin-bottom: 10px;
  text-align: center;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #292828;
  text-align: center;
  margin: 15px 0;
}


.buy-now-btn {
  width: 100%;
  border-radius: 50px;
  font-size: 1.3rem;
  padding: 15px 0;
  background-color: #007bff;
  color: white; 
  text-transform: uppercase;
  text-align: center;
  display: inline-flex; 
  justify-content: center; 
  align-items: center; 
  line-height: 1; 
}

.buy-now-btn:hover {
  background-color: #1a2ebb;
  transition: background-color 0.3s ease;
}
</style>