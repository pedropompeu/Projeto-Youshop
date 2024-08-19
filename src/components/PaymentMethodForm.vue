<template>
  <v-card class="form-card" elevation="4">
    <v-card-title class="text-h6 grey--text text--darken-3">Payment Method</v-card-title>
    <v-card-text>
      <v-form v-model="valid" ref="paymentForm">
        <v-select
          v-model="selectedPaymentMethod"
          :items="paymentMethods"
          label="Payment Method"
          :rules="[rules.required]"
          required
        ></v-select>

        <v-text-field
          v-model="cpf"
          v-mask="'###.###.###-##'"
          :rules="[rules.required, rules.validCpf]"
          label="CPF"
          required
        ></v-text-field>

        <div v-if="selectedPaymentMethod === 'Credit Card'">
          <v-text-field
            v-model="creditCardNumber"
            v-mask="'#### #### #### ####'"
            :rules="[rules.required, rules.validCard]"
            label="Card Number"
            required
          ></v-text-field>
          <v-text-field
            v-model="expiryDate"
            v-mask="'##/##'"
            :rules="[rules.required]"
            label="Expiry Date (MM/YY)"
            required
          ></v-text-field>
          <v-text-field
            v-model="cvv"
            v-mask="'###'"
            :rules="[rules.required]"
            label="CVV"
            required
          ></v-text-field>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      selectedPaymentMethod: null,
      paymentMethods: ['Boleto', 'Credit Card', 'Pix'],
      cpf: '',
      creditCardNumber: '',
      expiryDate: '',
      cvv: '',
      rules: {
        required: value => !!value || 'Required.',
        validCpf: value => this.validateCpf(value) || 'CPF must be valid.',
        validCard: value => /^\d{16}$/.test(value.replace(/\s+/g, '')) || 'Card number must be 16 digits.',
      },
    };
  },
  methods: {
    validateCpf(cpf) {
      cpf = cpf.replace(/[^\d]+/g, '');
      if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
      let sum = 0;
      for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
      let mod = sum % 11 < 2 ? 0 : 11 - (sum % 11);
      if (mod !== parseInt(cpf.charAt(9))) return false;
      sum = 0;
      for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
      mod = sum % 11 < 2 ? 0 : 11 - (sum % 11);
      return mod === parseInt(cpf.charAt(10));
    },
    validate() {
      return this.$refs.paymentForm.validate();
    },
  },
};
</script>

<style scoped>
.form-card {
  border-radius: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.37);
}

.text-h6 {
  font-weight: 700;
  color: #333333;
  text-align: center;
}

.grey--text.text--darken-3 {
  color: #666666;
}
</style>
