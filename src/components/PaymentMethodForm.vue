<template>
  <v-card class="pa-5 elevation-3">
    <v-card-title class="text-h6 grey--text text--darken-3">Payment Method</v-card-title>
    <v-card-text>
      <v-form v-model="valid" ref="paymentForm">
        <v-select
          v-model="selectedPaymentMethod"
          :items="paymentMethods"
          label="Payment Method"
          required
        ></v-select>

        <v-text-field
          v-model="cpf"
          :rules="[rules.required, rules.validCpf]"
          label="CPF"
          required
        ></v-text-field>

        <div v-if="selectedPaymentMethod === 'Credit Card'">
          <v-text-field
            v-model="creditCardNumber"
            :rules="[rules.required, rules.validCard]"
            label="Card Number"
            required
          ></v-text-field>
          <v-text-field
            v-model="expiryDate"
            :rules="[rules.required]"
            label="Expiry Date (MM/YY)"
            required
          ></v-text-field>
          <v-text-field
            v-model="cvv"
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
        validCard: value => /^\d{16}$/.test(value) || 'Card number must be 16 digits.'
      }
    }
  },
  methods: {
    validateCpf(cpf) {
      cpf = cpf.replace(/[^\d]+/g, '')
      if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false
      let sum = 0
      for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i)
      let mod = sum % 11 < 2 ? 0 : 11 - (sum % 11)
      if (mod !== parseInt(cpf.charAt(9))) return false
      sum = 0
      for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i)
      mod = sum % 11 < 2 ? 0 : 11 - (sum % 11)
      return mod === parseInt(cpf.charAt(10))
    },
    validate() {
      return this.$refs.paymentForm.validate()
    }
  }
}
</script>

<style scoped>
.pa-5 {
  padding: 24px;
}

.elevation-3 {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); 
}

.text-h6 {
  font-weight: 500;
}

.grey--text {
  color: #616161 !important; 
}
</style>
