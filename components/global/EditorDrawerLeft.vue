<template>
  <v-navigation-drawer v-model="drawerLeftOpen" temporary fixed>
    Drawer lEFT
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
