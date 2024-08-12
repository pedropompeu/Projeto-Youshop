<template>
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
  </template>
  
  <script>
  export default {
    data() {
      return {
        valid: false,
        cep: '',
        address: '',
        city: '',
        state: '',
        rules: {
          required: value => !!value || 'Required.',
          validCep: value => /^\d{5}-?\d{3}$/.test(value) || 'CEP must be valid.'
        }
      }
    },
    methods: {
      async fetchAddress() {
        if (this.rules.validCep(this.cep) === true) {
          const response = await fetch(`https://viacep.com.br/ws/${this.cep}/json/`)
          const data = await response.json()
          this.address = data.logradouro
          this.city = data.localidade
          this.state = data.uf
        }
      },
      validate() {
        return this.$refs.deliveryForm.validate()
      }
    }
  }
  </script>
  