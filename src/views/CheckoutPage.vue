<template>
  <v-container>
    <v-row justify="center" class="my-1">
      <v-col cols="10" md="4">
        <h1 class="text-center">Complete Your Purchase</h1>
      </v-col>
    </v-row>

    <v-row class="mb-5">
      <v-col cols="12" md="6" lg="4">
        <v-card class="pa-4 elevation-4 rounded-card">
          <PersonalDataForm ref="personalForm" />
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-card class="pa-4 elevation-4 rounded-card">
          <DeliveryDataForm ref="deliveryForm" />
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="4">
        <v-card class="pa-4 elevation-4 rounded-card">
          <PaymentMethodForm ref="paymentForm" />
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mb-5">
      <v-col cols="12" class="d-flex justify-center">
        <v-btn
          prepend-icon="mdi-cart"
          :disabled="loading"
          :loading="loading"
          class="finalize-btn"
          color="primary"
          size="large"
          block
          @click="finalizeOrder"
        >
          Finalize Order
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="errorMessage" class="mt-5">
      <v-col cols="12">
        <v-alert type="error" dismissible color="red lighten-3" border="top" dark>
          {{ errorMessage }}
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PersonalDataForm from '@/components/PersonalDataForm.vue'
import DeliveryDataForm from '@/components/DeliveryDataForm.vue'
import PaymentMethodForm from '@/components/PaymentMethodForm.vue'

export default {
  components: {
    PersonalDataForm,
    DeliveryDataForm,
    PaymentMethodForm
  },
  data() {
    return {
      errorMessage: '',
      loading: false
    }
  },
  methods: {
    async finalizeOrder() {
      this.loading = true; // Ativa o estado de carregamento
      console.log('Validating forms...');
      const isPersonalValid = this.$refs.personalForm.validate();
      const isDeliveryValid = this.$refs.deliveryForm.validate();
      const isPaymentValid = this.$refs.paymentForm.validate();

      if (isPersonalValid && isDeliveryValid && isPaymentValid) {
        const orderData = {
          name: this.$refs.personalForm.name,
          phone: this.$refs.personalForm.phone,
          email: this.$refs.personalForm.email,
          cep: this.$refs.deliveryForm.cep,
          address: this.$refs.deliveryForm.address,
          city: this.$refs.deliveryForm.city,
          state: this.$refs.deliveryForm.state,
          paymentMethod: this.$refs.paymentForm.selectedPaymentMethod,
          cpf: this.$refs.paymentForm.cpf,
          cardNumber: this.$refs.paymentForm.creditCardNumber
        };
        console.log('Order data:', orderData);
        try {
          const response = await fetch(`https://api.deepspacestore.com/offers/${this.$route.params.offer_code}/create_order`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
          });
          const result = await response.json();
          console.log('Response:', result);

          if (response.ok) {
            this.$router.push({ name: 'SuccessPage', query: { orderId: result.orderId } });
          } else {
            this.errorMessage = result.error || 'Failed to process your order. Please try again.';
          }
        } catch (error) {
          console.error('Fetch error:', error);
          this.errorMessage = 'Failed to place order. Please try again later.';
        } finally {
          this.loading = false;
        }
      } else {
        this.errorMessage = 'Please fill out all required fields before proceeding.';
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.text-center {
  text-align: center;
  color: #2c3e50;
}

.mb-4 {
  margin-bottom: 24px;
}

.mb-5 {
  margin-bottom: 32px;
}

.pa-4 {
  padding: 24px;
  background-color: #acb4c4;
  border-radius: 8px;
}

.rounded-card {
  border-radius: 12px;
}

.elevation-4 {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.finalize-btn {
  background-color: #007bff;
  color: white;
  border-radius: 50px;
}

.v-alert {
  font-weight: 500;
  border-left: 5px solid #e74c3c;
}
</style>
