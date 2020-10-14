<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" lg="3"><StatisticsCard /> </v-col>
      <v-col cols="12" sm="6" lg="3">
        <SnippetsListCard
          title="Last updated Snippets"
          url="dashboard/lastUpdated"
        />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <SnippetsListCard
          title="Last created Snippets"
          url="dashboard/lastCreated"
        />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <SnippetsListCard
          title="Most viewed Snippets"
          url="dashboard/mostViewed"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import SnippetsListCard from './components/SnippetsListCard'
import StatisticsCard from './components/StatisticsCard'
export default {
  components: {
    SnippetsListCard,
    StatisticsCard,
  },
  mounted() {
    this.$store.dispatch('bottomBar/setActive', 'dashboard')
  },
}
</script>
