<template>
  <div v-html="markdown"></div>
</template>

<script>
import hljs from 'highlight.js'
const md = require('markdown-it')({
  highlight(str, lang) {
    const esc = md.utils.escapeHtml
    if (lang && hljs.getLanguage(lang)) {
      return (
        '<pre class="hljs language-' +
        esc(lang.toLowerCase()) +
        '"><code>' +
        hljs.highlightAuto(str).value +
        '</code></pre>'
      )
    }
    return '<pre class="hljs"><code>' + esc(str) + '</code></pre>'
  },
})

export default {
  props: {
    value: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    markdown() {
      return md.render(this.value || '')
    },
  },
}
</script>
<style>
.v-application code {
  color: unset;
  background: unset;
}
.hljs code {
  padding: 0;
}
</style>
