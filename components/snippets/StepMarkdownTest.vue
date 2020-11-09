<template>
  <div>
    <VueMarkdown
      toc
      task-lists
      toc-id="toc-step"
      toc-anchor-link
      class="markdown-for-step"
      :source="value"
      :watches="extensions"
    ></VueMarkdown>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
export default {
  components: {
    VueMarkdown,
  },
  props: {
    value: {
      type: String,
      required: false,
      default: '',
    },
    trigger: {
      type: [String, Boolean],
      required: false,
      default: '',
    },
  },
  data() {
    return {
      extensions: ['source', 'toc', 'show', 'emoji', 'linkify', 'typographer'],
    }
  },
}
</script>
<style lang="scss">
.markdown-for-step p {
  margin: 0;
  padding: 0;
}
</style>
