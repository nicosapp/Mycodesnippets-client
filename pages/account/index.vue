<template>
  <v-container>
    <h2 class="text-center">Hello {{ $auth.user.name }}</h2>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <h3 class="mb-4">User informations</h3>
        <v-form
          ref="formUserInfos"
          v-model="validUserInfos"
          class="mb-4"
          lazy-validation
          @submit.prevent="updateInfos"
        >
          <v-alert v-if="isError" dense dismissible border="left" type="error">
            There is an error in the form!
          </v-alert>
          <v-text-field
            id="email"
            v-model="form.email"
            name="email"
            :rules="[rules.required, rules.emailValid]"
            label="E-mail"
            :error-messages="validation.email"
            required
            filled
          ></v-text-field>

          <v-text-field
            id="name"
            v-model="form.name"
            name="name"
            :rules="[rules.required, nameLength]"
            label="Username"
            :error-messages="validation.name"
            required
            filled
          ></v-text-field>

          <v-text-field
            id="firstname"
            v-model="form.firstname"
            name="firstname"
            label="First name"
            :error-messages="validation.firstname"
            filled
          ></v-text-field>

          <v-text-field
            id="lastname"
            v-model="form.lastname"
            name="lastname"
            label="Lastname name"
            :error-messages="validation.lastname"
            filled
          ></v-text-field>

          <v-text-field
            id="phone_number"
            v-model="form.phone_number"
            name="phone_number"
            label="Phone number"
            :rules="[rules.onlyNumbers]"
            counter="10"
            :error-messages="validation.phone_number"
            filled
          ></v-text-field>

          <div class="d-flex justify-center">
            <v-btn
              type="submit"
              :disabled="!validUserInfos"
              color="primary"
              class="mr-4"
              @click="validate"
            >
              Update
            </v-btn>
          </div>
        </v-form>
      </v-col>
      <v-col cols="12" md="6">
        <h3 class="mb-4">Password administration</h3>
        <v-form
          ref="formUserPassword"
          v-model="validUserPassword"
          class="mb-4"
          lazy-validation
          @submit.prevent="updatePassword"
        >
          <v-text-field
            v-model="form.password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[
              rules.required,
              rules.passwordLength,
              rules.passwordLowerCase,
              rules.passwordUpperCase,
              rules.passwordSpecials,
              rules.passwordNumbers,
            ]"
            :type="show ? 'text' : 'password'"
            name="password"
            label="Password"
            filled
            required
            :error-messages="validation.password"
            @click:append="show = !show"
          ></v-text-field>

          <v-text-field
            v-model="form.password_confirmation"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.passwordMatch]"
            :type="show ? 'text' : 'password'"
            name="password_confirmation"
            label="Password confirmation"
            filled
            required
            :error-messages="validation.password_confirmation"
            @click:append="show = !show"
          ></v-text-field>

          <div class="d-flex justify-center">
            <v-btn
              type="submit"
              :disabled="!validUserPassword"
              color="primary"
              class="mr-4"
              @click="validate"
            >
              Modify
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import validationRules from '@/mixins/form/validationRules'
export default {
  mixins: [validationRules],
  layout: 'account',
  data() {
    return {
      validUserPassword: true,
      validUserInfos: true,
      show: false,
      nameLength: (v) => v.length >= 4 || 'Min 4 characters',
      validation: {},
      form: {
        name: this.$auth.user.name,
        email: this.$auth.user.email,
        firstname: this.$auth.user.firstname,
        lastname: this.$auth.user.lastname,
        phone_number: this.$auth.user.phone_number,
        password: '',
        password_confirmation: '',
      },
    }
  },
  computed: {
    isError() {
      return Object.keys(this.validation).length
    },
  },
  methods: {
    validate() {
      this.validation = {}
      this.$refs.formUserInfos.validate()
      this.$refs.formUserPassword.validate()
    },
    updatePassword() {},
    async updateInfos() {
      try {
        await this.$axios.$post('api/auth/signup', this.form)
        this.$router.push({
          name: 'auth-email',
        })
      } catch (e) {
        if (e.response.status === 422) {
          this.validation = e.response.data.errors
        }
      }
    },
  },
  middleware: ['verified'],
  head() {
    return {
      title: 'Account',
    }
  },
}
</script>
