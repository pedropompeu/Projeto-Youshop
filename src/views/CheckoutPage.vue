<template>
  <v-container>
    <v-row v-if="loading">
      <v-col cols="12" class="d-flex justify-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12" md="6" class="d-flex justify-center">
        <ProductCard :product="offer" :showBuyNowButton="false" class="product-card" />
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="form-card" v-if="currentStep === 'personal'">
          <v-card-title><span class="text-h5">Personal Information</span></v-card-title>
          <v-card-text><PersonalDataForm v-model="personalData" ref="personalForm" /></v-card-text>
          <v-card-actions>
            <v-btn @click="redirectToHome" color="grey" class="return-btn">Return</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="nextToDelivery">Next</v-btn>
          </v-card-actions>
        </v-card>

        <v-card class="form-card" v-if="currentStep === 'delivery'">
          <v-card-title><span class="text-h5">Delivery Information</span></v-card-title>
          <v-card-text><DeliveryDataForm v-model="deliveryData" ref="deliveryForm" /></v-card-text>
          <v-card-actions>
            <v-btn @click="goBackToPersonal" color="grey" class="return-btn">Return</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="nextToPayment">Next</v-btn>
          </v-card-actions>
        </v-card>

        <v-card class="form-card" v-if="currentStep === 'payment'">
          <v-card-title><span class="text-h5">Payment Information</span></v-card-title>
          <v-card-text><PaymentMethodForm v-model="paymentData" ref="paymentForm" /></v-card-text>
          <v-card-actions>
            <v-btn @click="goBackToDelivery" color="grey" class="return-btn">Return</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" :loading="loading" @click="finalizeOrder">Finalize Order</v-btn>
          </v-card-actions>
        </v-card>

        <v-col v-if="errorMessage" cols="12">
          <v-alert type="error" dismissible color="red lighten-5" border="top" dark>
            {{ errorMessage }}
          </v-alert>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
import PersonalDataForm from '@/components/PersonalDataForm.vue';
import DeliveryDataForm from '@/components/DeliveryDataForm.vue';
import PaymentMethodForm from '@/components/PaymentMethodForm.vue';
import axios from 'axios';

export default {
  components: {
    ProductCard,
    PersonalDataForm,
    DeliveryDataForm,
    PaymentMethodForm,
  },
  data() {
    return {
      offer: null,
      errorMessage: '',
      loading: false,
      currentStep: 'personal', 
      personalData: {},
      deliveryData: {},
      paymentData: {},
    };
  },
  async created() {
    this.loading = true;
    try {
      const response = await axios.get(`https://api.deepspacestore.com/offers/${this.$route.params.OFFER_CODE || 'enterprise'}`);
      this.offer = response.data;
    } catch (error) {
      this.errorMessage = 'Failed to load offer details. Please try again later.';
    } finally {
      this.loading = false;
    }
  },
  methods: {
    redirectToHome() {
      this.$router.push('/');
    },

    goBackToPersonal() {
      this.currentStep = 'personal';
    },

    goBackToDelivery() {
      this.currentStep = 'delivery';
    },

    async nextToDelivery() {
    await this.$nextTick();
    const personalForm = this.$refs.personalForm;
    if (personalForm && this.currentStep === 'personal') {
      const isPersonalValid = await personalForm.validate();
      if (isPersonalValid) {
        this.currentStep = 'delivery';
        this.errorMessage = '';
      } else {
        this.errorMessage = 'Please fill out all required fields in the Personal Information form.';
      }
    } else {
      this.errorMessage = 'Personal form is not available. Please ensure all steps are complete.';
    }
  },

  async nextToPayment() {
    await this.$nextTick();
    const deliveryForm = this.$refs.deliveryForm;
    if (deliveryForm && this.currentStep === 'delivery') {
      const isDeliveryValid = await deliveryForm.validate();
      if (isDeliveryValid) {
        this.currentStep = 'payment';
        this.errorMessage = '';
      } else {
        this.errorMessage = 'Please fill out all required fields in the Delivery Information form.';
      }
    } else {
      this.errorMessage = 'Delivery form is not available. Please ensure all steps are complete.';
    }
  },

  async finalizeOrder() {
    await this.$nextTick();

    const personalForm = this.$refs.personalForm;
    const deliveryForm = this.$refs.deliveryForm;
    const paymentForm = this.$refs.paymentForm;

    if (this.currentStep !== 'payment') {
      this.errorMessage = 'Invalid step. Please complete all previous steps.';
      return;
    }

    if (personalForm && deliveryForm && paymentForm) {
      const isPersonalValid = await personalForm.validate();
      const isDeliveryValid = await deliveryForm.validate();
      const isPaymentValid = await paymentForm.validate();

      if (isPersonalValid && isDeliveryValid && isPaymentValid) {
        try {
          const orderData = {
            ...this.personalData,
            ...this.deliveryData,
            ...this.paymentData,
          };

          const response = await axios.post(`https://api.deepspacestore.com/offers/${this.$route.params.OFFER_CODE}/create_order`, orderData);
          if (response.status === 200) {
            this.$router.push({
              name: 'SuccessPage',
              query: {
                orderId: response.data.orderId,
                ...orderData,
              },
            });
          } else {
            this.errorMessage = response.data.error || 'Failed to process your order. Please try again.';
          }
        } catch (error) {
          this.errorMessage = 'Failed to place order. Please try again later.';
        } finally {
          this.loading = false;
        }
      } else {
        this.errorMessage = 'Please fill in all required fields in the forms.';
      }
    } else {
      this.errorMessage = 'Form references are not available. Please ensure all steps are complete.';
    }
  },
}
};
</script>

<style scoped>
.product-card {
  border-radius: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #2a2a2a 0%, #f8f8f8 100%);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.37);
  max-width: 400px;
  max-height: 550px;
}

.product-image {
  object-fit: cover;
  width: 100%;
  max-height: 100px;
  border-radius: 12px;
  margin-bottom: 16px;
}

.text-h5 {
  font-weight: 700;
  color: #333333;
}

.form-card {
  border-radius: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.37);
  margin-bottom: 20px;
}

.finalize-btn {
  border-radius: 50px;
  font-size: 1.3rem;
  padding: 15px 0;
  background-color: #007bff;
  color: white;
  text-transform: uppercase;
  text-align: center;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.finalize-btn:hover {
  background-color: #1a2ebb;
  transform: translateY(-2px);
}
</style>
