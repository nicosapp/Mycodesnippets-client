<template>
  <v-container dark>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-form
          ref="form"
          v-model="valid"
          class="mb-4"
          lazy-validation
          @submit.prevent="signin"
        >
          <v-text-field
            v-model="form.email"
            :rules="[rules.required, rules.emailValid]"
            label="E-mail"
            required
            filled
          ></v-text-field>
          <div style="position: relative" class="mb-5">
            <v-text-field
              v-model="form.password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required]"
              :type="show ? 'text' : 'password'"
              name="password"
              label="Password"
              filled
              required
              @click:append="show = !show"
            >
            </v-text-field>
            <div
              class="d-flex justify-end"
              style="position: absolute; bottom: 0; right: 0"
            >
              <nuxt-link to="/password/reset">
                Forgot your password ?
              </nuxt-link>
            </div>
          </div>

          <div class="d-flex justify-center">
            <v-btn
              block
              type="submit"
              :disabled="!valid || loading"
              :loading="loading"
              color="primary"
              height="3rem"
              @click="validate"
            >
              Sign in
            </v-btn>
          </div>
        </v-form>
        <div class="text-center">
          No account ?
          <nuxt-link to="/auth/signup">Create one here</nuxt-link>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      valid: true,
      email: '',
      password: '',
      show: false,
      validation: {},
      rules: {
        required: (value) => !!value || 'Required.',
        emailValid: (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      },
      form: {
        email: '',
        password: '',
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
      this.$refs.form.validate()
    },
    async signin() {
      this.loading = true
      try {
        await this.$axios.$get(`${process.env.appUrl}/sanctum/csrf-cookie`)
        await this.$auth.loginWith('local', { data: this.form })
        this.$router.push({ name: 'dashboard' })
        this.validation = {}
      } catch (e) {
        if (e.response.status === 422) {
          this.validation = e.response.data.errors
          this.$notifier.error({ message: 'There is an error in the form' })
        }
        this.$notifier.error({ message: 'Sorry, login failed :(' })
      }
      this.loading = false
    },
  },
  head() {
    return {
      title: 'Sign in',
    }
  },
}
</script>
