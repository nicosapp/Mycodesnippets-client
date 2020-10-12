export default {
  data() {
    return {
      rules: {
        required: (v) => !!v || 'Required.',
        emailValid: (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        numeric: (v) => !v || /^\d+$/.test(v) || 'Should just contain numbers',
        min: (minnum, v) =>
          !v || (v || '').length >= minnum || 'Min characters exceeded',
        max: (maxnum, v) =>
          !v || (v || '').length <= maxnum || 'Max characters exceeded',
        size: (size, v) =>
          !v || (v || '').length === size || 'Size is not correct',
        passwordLength: (v) => v.length >= 8 || 'Min 8 characters',
        passwordSpecials: (v) =>
          /^(?=.*[!@#$%^&*])/.test(v) ||
          'Password must contain special characters',
        passwordLowerCase: (v) =>
          /^(?=.*[a-z])/.test(v) ||
          'Password must contain lowercase characters',
        passwordUpperCase: (v) =>
          /^(?=.*[A-Z])/.test(v) ||
          'Password must contain uppercase characters',
        passwordNumbers: (v) =>
          /^(?=.*[0-9])/.test(v) || 'Password must contain numbers',

        passwordMatch: (v) =>
          v === this.form.password || 'Password does not match',
      },
    }
  },
}
