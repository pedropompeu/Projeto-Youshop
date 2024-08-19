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
            <v-row>
              <v-col cols="12" md="6">
                <v-list dense>
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
                      <v-icon>mdi-card-account-details-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title><strong>CPF:</strong> {{ userData.cpf }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>

              <v-col cols="12" md="6">
                <v-list dense>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-email-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title><strong>Email:</strong> {{ userData.email }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-phone</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title><strong>Phone:</strong> {{ userData.phone }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>

            <v-row class="my-4">
              <v-col cols="12">
                <v-list dense>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-home-city-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title><strong>Address:</strong> {{ userData.address }}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-title><strong>CEP: </strong> {{ userData.cep }}</v-list-item-title>
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
              </v-col>
            </v-row>

            <v-divider class="my-4"></v-divider>

            <v-row class="justify-center">
              <v-col cols="12" class="d-flex justify-center">
                <v-alert
                  v-if="paymentMethod === 'Boleto'"
                  type="info mx-auto"
                  class="mb-5"
                >
                  <v-icon>mdi-printer</v-icon>
                  <p>Payment Method: Boleto</p>
                  <a :href="require('@/assets/images/BoletoFaturaGR.png')"
                  download="BoletoFaturaGR.png"
                  target="_blank"
                  >
                
                  <v-img
                    src="@/assets/images/BoletoFaturaGR.png"
                    alt="Boleto"
                    class="mt-2 mx-8"
                    max-width="250"
                    contain
                  ></v-img>
                  </a>
                </v-alert>

                <v-alert
                v-if="paymentMethod === 'Pix'"
                type="info mx-auto" 
                class="mb-5"
              >
                <p><v-icon>mdi-qrcode</v-icon>Payment Method: Pix</p>
                <v-img
                  src="@/assets/images/QRCode_Facil.png"
                alt="QR Code"
                class="mt-2 mx-8" 
                max-width="250px"
                contain
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
              </v-col>
            </v-row>
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
      paymentMethod: this.$route.query.paymentMethod,
      userData: {
        name: this.$route.query.name,
        phone: this.$route.query.phone,
        email: this.$route.query.email,
        address: this.$route.query.address,
        cep: this.$route.query.cep,
        cpf: this.$route.query.cpf
      },
    };
  },
};
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
}

.v-list-item {
  border-bottom: 1px solid #ddd;
}

.v-list-item:last-child {
  border-bottom: none;
}
</style>
