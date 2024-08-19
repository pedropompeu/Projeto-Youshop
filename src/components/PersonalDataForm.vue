<template>
  <v-card class="form-card" elevation="4">
    <v-card-title class="text-h6 grey--text text--darken-3">Personal Data</v-card-title>
    <v-card-text>
      <v-form ref="personalForm">
        <v-text-field
          v-model="name"
          :rules="[rules.required]"
          label="Full Name"
          required
        ></v-text-field>
        <v-text-field
          :value="formattedPhone"
          @input="onPhoneInput"
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
        optionalEmail: value => !value || /.+@.+\..+/.test(value) || 'E-mail must be valid.',
      },
    };
  },
  computed: {
    formattedPhone() {
      const cleaned = ('' + this.phone).replace(/\D/g, '');
      const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
      if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
      }
      return this.phone;
    }
  },
  methods: {
    onPhoneInput(event) {
      const cleaned = ('' + event.target.value).replace(/\D/g, '');
      this.phone = cleaned.slice(0, 11);
      event.target.value = this.formattedPhone;
    },
    validate() {
      const form = this.$refs.personalForm;
      if (form) {
        return form.validate();
      }
      console.error('Personal form reference not found');
      return false;
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
