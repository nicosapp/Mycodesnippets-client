<template>
  <div>
    <v-bottom-navigation
      v-model="active"
      grow
      app
      class="bottomBar"
      color="primary"
      :min-width="0"
    >
      <v-btn value="home" @click="pushRoute('home', 'index')">
        <div>Home</div>
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn value="search" @click="pushRoute('search', 'search')">
        <div>Search</div>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn value="create" @click="createSnippet">
        <div>Create</div>
        <v-icon>mdi-plus-circle-outline</v-icon>
      </v-btn>

      <v-btn value="dashboard" @click="pushRoute('dashboard', 'dashboard')">
        <div>Dashboard</div>
        <v-icon>mdi-view-dashboard-variant-outline</v-icon>
      </v-btn>

      <v-btn value="account" @click="pushRoute('account', 'account')">
        <div>Account</div>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      value: 'home',
    }
  },
  computed: {
    ...mapGetters({
      activeValue: 'bottomBar/active',
    }),
    active: {
      get() {
        return this.activeValue
      },
      set(activeValue) {
        this.setActive(activeValue)
      },
    },
  },

  methods: {
    ...mapActions({
      setActive: 'bottomBar/setActive',
    }),

    pushRoute(active, route) {
      this.setActive(active)
      this.$router.push({
        name: route,
      })
    },

    async createSnippet() {
      const snippet = await this.$axios.$post('snippets')
      this.setActive('create')
      this.$router.push({
        name: 'snippets-id-edit',
        params: { id: snippet.data.uuid },
      })
    },
  },
}
</script>

<style scoped lang="scss">
.v-btn {
  min-width: 10px !important;
  padding: 0 !important;
}
</style>
