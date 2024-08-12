<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="mx-auto pa-4" max-width="500">
          <v-card-title class="text-center">
            <v-icon x-large>mdi-check-circle-outline</v-icon>
            <h2 class="mt-2">Order Successful!</h2>
          </v-card-title>
          <v-card-subtitle class="text-center mb-4">
            <v-chip color="green" text-color="white">Order ID: {{ orderId }}</v-chip>
          </v-card-subtitle>
          <v-card-text>
            <v-divider class="mb-4"></v-divider>
            <v-list>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title><strong>Name:</strong> {{ userData.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-home-city-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title><strong>Address:</strong> {{ userData.address }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-credit-card-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title><strong>Payment Method:</strong> {{ paymentMethod }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider class="my-4"></v-divider>
            <v-alert
              v-if="paymentMethod === 'Boleto'"
              type="info"
              class="mb-4"
            >
              <v-icon>mdi-printer</v-icon>
              <p>Payment Method: Boleto</p>
              <v-img
                src="https://via.placeholder.com/150"
                alt="Barcode"
                class="mt-2"
              ></v-img>
            </v-alert>
            <v-alert
              v-if="paymentMethod === 'Pix'"
              type="info"
              class="mb-4"
            >
              <v-icon>mdi-qrcode</v-icon>
              <p>Payment Method: Pix</p>
              <v-img
                src="https://via.placeholder.com/150"
                alt="QR Code"
                class="mt-2"
              ></v-img>
            </v-alert>
            <v-alert
              v-if="paymentMethod === 'Credit Card'"
              type="success"
              class="mb-4"
            >
              <v-icon>mdi-check-circle-outline</v-icon>
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
      paymentMethod: '',
      userData: {
        name: '',
        address: '',
      },
      rules: {
        required: value => !!value || 'Required.',
        validCep: value => {
          const validCep = /^\d{5}-?\d{3}$/.test(value);
          return validCep || 'Invalid CEP';
        }
      }
    }
  },
  created() {
  
    fetch(`https://api.deepspacestore.com/orders/${this.orderId}`)
      .then(res => res.json())
      .then(data => {
        this.paymentMethod = data.paymentMethod;
        this.userData = {
          name: data.name,
          address: data.address
        };
      })
      .catch(err => {
        console.error("Error fetching order details:", err);
      });
  }
}
</script>

<style scoped>
.v-card {
  background: #f3eeee;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}
.v-divider {
  border-color: #000000;
}
.v-list-item-title {
  color: #474242;
}
.v-alert {
  border-radius: 8px;
}
.v-img {
  border-radius: 8px;
  max-width: 100%;
}
</style>
