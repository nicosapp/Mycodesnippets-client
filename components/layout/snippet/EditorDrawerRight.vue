<template>
  <v-navigation-drawer v-model="drawerRightOpen" :right="true" temporary fixed>
    <div class="pa-4">
      <StepsList class="mb-3" />
      <StepTableOfContent />
    </div>
  </v-navigation-drawer>
</template>

<script>
import drawerRight from '@/mixins/navigation/drawerRight'

export default {
  mixins: [drawerRight],
  data() {
    return {}
  },
}
</script>
