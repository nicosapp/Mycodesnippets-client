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
import SnippetPublishing from '@/pages/snippets/_id/edit/components/SnippetPublishing'
export default {
  components: {
    SnippetPublishing,
  },
  mixins: [drawerLeft],
  data() {
    return {}
  },
}
</script>
