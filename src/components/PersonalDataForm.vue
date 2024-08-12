<template>
    <v-form v-model="valid" ref="personalForm">
      <v-text-field
        v-model="name"
        :rules="[rules.required]"
        label="Full Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="phone"
        :rules="[rules.required, rules.validPhone]"
        label="Phone"
        required
      ></v-text-field>
      <v-text-field
        v-model="email"
        :rules="[rules.optionalEmail]"
        label="Email (optional)"
      ></v-text-field>
    </v-form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        valid: false,
        name: '',
        phone: '',
        email: '',
        rules: {
          required: value => !!value || 'Required.',
          validPhone: value => /^\d{10,11}$/.test(value) || 'Phone must be 10-11 digits.',
          optionalEmail: value => !value || /.+@.+\..+/.test(value) || 'E-mail must be valid.'
        }
      }
    },
    methods: {
      validate() {
        return this.$refs.personalForm.validate()
      }
    }
  }
  </script>
  