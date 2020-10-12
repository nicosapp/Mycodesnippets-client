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
            :rules="[rules.size(10, form.phone_number)]"
            name="phone_number"
            label="Phone number"
            type="number"
            counter="10"
            :error-messages="validation.phone_number"
            filled
          ></v-text-field>

          <v-textarea
            id="description"
            v-model="form.description"
            :rules="[rules.max(400, form.description)]"
            name="description"
            counter="400"
            filled
            label="Description"
            :error-messages="validation.description"
          ></v-textarea>
          <div class="d-flex justify-center">
            <v-btn
              type="submit"
              :disabled="!validUserInfos"
              color="primary"
              class="mr-4"
              @click="validateUserInfos"
            >
              Update
            </v-btn>
          </div>
        </v-form>
      </v-col>
      <v-col cols="12" md="6">
        <h3 class="mb-4">Change password</h3>
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
              @click="validatePassword"
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
        description: this.$auth.user.description,
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
    validateUserInfos() {
      this.validation = {}
      this.$refs.formUserInfos.validate()
    },
    validatePassword() {
      this.$refs.formUserPassword.validate()
    },
    async updatePassword() {
      try {
        await this.$axios.$patch(`users/${this.$auth.user.uuid}/password`, {
          password: this.form.password,
          password_confirmation: this.form.password_confirmation,
        })
        this.form.password = ''
        this.form.password_confirmation = ''
      } catch (e) {
        if (e.response && e.response.status === 422) {
          this.validation = e.response.data.errors
        }
      }
    },
    async updateInfos() {
      try {
        await this.$axios.$patch(`users/${this.$auth.user.uuid}`, this.form)
      } catch (e) {
        if (e.response && e.response.status === 422) {
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
