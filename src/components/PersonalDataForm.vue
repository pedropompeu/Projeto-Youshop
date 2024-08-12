<template>
  <v-card class="pa-5 elevation-3">
    <v-card-title class="text-h6 grey--text text--darken-2">Personal Data</v-card-title>
    <v-card-text>
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
    </v-card-text>
  </v-card>
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
