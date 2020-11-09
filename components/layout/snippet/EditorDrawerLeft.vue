<template>
  <!-- width="100%"  -->
  <v-navigation-drawer v-model="drawerLeftOpen" temporary fixed>
    <div class="pa-4">
      <SnippetPublishing />
    </div>
  </v-navigation-drawer>
</template>

<script>
import drawerLeft from '@/mixins/navigation/drawerLeft'
export default {
  mixins: [drawerLeft],
  data() {
    return {}
  },
}
</script>
