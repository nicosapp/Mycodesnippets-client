<template>
  <component :is="component" />
</template>

<script>
import DialogDefault from '@/components/layout/dialog/DialogDefault'
import { mapGetters } from 'vuex'
export default {
  components: {
    DialogDefault,
  },
  computed: {
    ...mapGetters({
      component: 'dialog/component',
    }),
  },
}
</script>
