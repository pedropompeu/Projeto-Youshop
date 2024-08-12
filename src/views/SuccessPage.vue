<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="mx-auto pa-4" max-width="500">
          <v-card-title>
            <h2>Order Successful!</h2>
          </v-card-title>
          <v-card-subtitle class="mb-3">
            <p>Your order ID: <strong>{{ orderId }}</strong></p>
          </v-card-subtitle>
          <v-card-text>
            <v-alert
              v-if="paymentMethod === 'Boleto'"
              type="info"
              class="mb-4"
            >
              <p>Payment Method: Boleto</p>
              <v-img
                src="https://via.placeholder.com/150"
                alt="Barcode"
                class="mb-2"
              ></v-img>
            </v-alert>
            <v-alert
              v-if="paymentMethod === 'Pix'"
              type="info"
              class="mb-4"
            >
              <p>Payment Method: Pix</p>
              <v-img
                src="https://via.placeholder.com/150"
                alt="QR Code"
                class="mb-2"
              ></v-img>
            </v-alert>
            <v-alert
              v-if="paymentMethod === 'Credit Card'"
              type="success"
              class="mb-4"
            >
              Payment successful!
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      orderId: this.$route.query.orderId,
      paymentMethod: '' // Será preenchido após recuperar os dados do pedido
    }
  },
  created() {
    // Mock API call para obter detalhes do pedido
    fetch(`https://api.deepspacestore.com/orders/${this.orderId}`)
      .then(res => res.json())
      .then(data => {
        this.paymentMethod = data.paymentMethod
      })
      .catch(err => {
        console.error("Error fetching order details:", err);
      });
  }
}
</script>

<style scoped>
.v-card {
  background: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.v-alert {
  border-radius: 5px;
}
.v-img {
  max-width: 100%;
}
</style>
