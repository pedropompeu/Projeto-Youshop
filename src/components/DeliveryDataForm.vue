<template>
  <v-card class="form-card" elevation="4">
    <v-card-title class="text-h6 grey--text text--darken-3">Address Information</v-card-title>
    <v-card-text>
      <v-form v-model="valid" ref="deliveryForm">
        <v-text-field
          v-model="cep"
          :rules="[rules.required, rules.validCep]"
          label="CEP"
          @blur="fetchAddress"
          required
        ></v-text-field>
        <v-text-field
          v-model="address"
          :rules="[rules.required]"
          label="Address"
          readonly
          required
        ></v-text-field>
        <v-text-field
          v-model="number"
          :rules="[rules.required]"
          label="Number"
          required
        ></v-text-field>
        <v-text-field
          v-model="city"
          :rules="[rules.required]"
          label="City"
          readonly
          required
        ></v-text-field>
        <v-text-field
          v-model="state"
          :rules="[rules.required]"
          label="State"
          readonly
          required
        ></v-text-field>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      cep: '',
      address: '',
      number: '',
      city: '',
      state: '',
      rules: {
        required: value => !!value || 'Required.',
        validCep: value => /^\d{5}-?\d{3}$/.test(value) || 'CEP must be valid.',
      },
    };
  },
  methods: {
    async fetchAddress() {
      if (this.rules.validCep(this.cep) === true) {
        const response = await fetch(`https://viacep.com.br/ws/${this.cep}/json/`);
        const data = await response.json();
        this.address = data.logradouro;
        this.city = data.localidade;
        this.state = data.uf;
      }
    },
    validate() {
      return this.$refs.deliveryForm.validate();
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
