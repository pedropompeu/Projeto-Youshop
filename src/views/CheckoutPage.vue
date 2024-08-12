<template>
  <v-container>
    <v-row justify="center" class="my-5">
      <v-col cols="12" md="8">
        <h1 class="text-center mb-5">Complete Your Purchase</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <PersonalDataForm ref="personalForm" />
      </v-col>
      <v-col cols="12" md="6">
        <DeliveryDataForm ref="deliveryForm" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <PaymentMethodForm ref="paymentForm" />
      </v-col>
      <v-col cols="12" md="6" class="d-flex justify-center align-center">
        <v-btn color="primary" @click="finalizeOrder" class="mt-5">Finalize Order</v-btn>
      </v-col>
    </v-row>

    <v-row v-if="errorMessage">
      <v-col cols="12">
        <v-alert type="error" dismissible>{{ errorMessage }}</v-alert>
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
      errorMessage: ''
    }
  },
  methods: {
    async finalizeOrder() {
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
        }
      } else {
        this.errorMessage = 'Please fill out all required fields before proceeding.';
      }
    }
  }
}
</script>

<style scoped>
.text-center {
  text-align: center;
}

.mt-5 {
  margin-top: 32px;
}

.mb-5 {
  margin-bottom: 32px;
}
</style>
