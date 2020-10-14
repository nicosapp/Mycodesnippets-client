<template>
  <component :is="component" />
</template>

<script>
import ToastDefault from '@/components/toast/ToastDefault'
import { mapGetters } from 'vuex'
export default {
  components: {
    ToastDefault,
  },
  computed: {
    ...mapGetters({
      component: 'toast/component',
    }),
  },
}
</script>
