<template>
    <v-container>
      <v-row>
        <v-col>
          <h2>Order Successful!</h2>
          <p>Your order ID: {{ orderId }}</p>
          <v-alert v-if="paymentMethod === 'Boleto'" type="info">
            <p>Payment Method: Boleto</p>
            <p><img src="https://via.placeholder.com/150" alt="Barcode"></p>
          </v-alert>
          <v-alert v-if="paymentMethod === 'Pix'" type="info">
            <p>Payment Method: Pix</p>
            <p><img src="https://via.placeholder.com/150" alt="QR Code"></p>
          </v-alert>
          <v-alert v-if="paymentMethod === 'Credit Card'" type="success">
            Payment successful!
          </v-alert>
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
    }
  }
  </script>
  <style>

  </style>  