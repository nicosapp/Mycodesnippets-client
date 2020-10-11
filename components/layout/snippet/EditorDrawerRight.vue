<template>
  <v-navigation-drawer v-model="drawerRightOpen" :right="true" temporary fixed>
    <div class="pa-4">
      <StepsList />
    </div>
  </v-navigation-drawer>
</template>

<script>
import drawerRight from '@/mixins/navigation/drawerRight'
import StepsList from '@/pages/snippets/_id/edit/components/StepsList'
export default {
  components: {
    StepsList,
  },
  mixins: [drawerRight],
  data() {
    return {}
  },
}
</script>
