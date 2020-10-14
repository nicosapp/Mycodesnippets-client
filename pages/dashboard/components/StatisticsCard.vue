<template>
  <v-card>
    <v-card-title>Statistics</v-card-title>
    <v-card-text>
      <div
        v-if="statistics.length === 0"
        class="d-flex justify-center align-center"
        style="min-height: 150px"
      >
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
      <v-list v-else dense class="pt-0">
        <v-list-item-group v-model="item" color="primary">
          <!-- TODAY -->
          <v-list-item v-for="(it, index) in items" :key="`stat-${index}`">
            <v-list-item-icon>
              <v-icon>{{ it.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="d-flex">
              <v-list-item-title>{{ it.title }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ statistics[it.key] }} Snippets
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      statistics: [],
      items: [
        {
          icon: 'mdi-calendar-today',
          title: 'Snippets today',
          key: 'today_count',
        },
        {
          icon: 'mdi-calendar-week',
          title: 'Snippets this week',
          key: 'last_week_count',
        },
        {
          icon: 'mdi-calendar-month',
          title: 'Snippets this month',
          key: 'last_month_count',
        },
        {
          icon: 'mdi-history',
          title: 'Snippets today',
          key: 'count',
        },
      ],
      item: null,
    }
  },
  async mounted() {
    const response = await this.$axios.get('dashboard/statistics')
    this.statistics = response.data.data
  },
}
</script>
