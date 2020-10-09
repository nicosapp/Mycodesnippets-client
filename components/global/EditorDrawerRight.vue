<template>
  <v-navigation-drawer v-model="drawerRightOpen" :right="true" temporary fixed>
    Drawer right
  </v-navigation-drawer>
</template>

<script>
import drawerRight from '@/mixins/navigation/drawerRight'
export default {
  mixins: [drawerRight],
  data() {
    return {}
  },
  computed: {},
}
</script>
