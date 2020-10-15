<template>
  <div class="markdown-viewer" v-html="markdown"></div>
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
<style lang="scss">
.v-application code {
  color: unset;
  background: unset;
  font-weight: 500;
}
.markdown-viewer {
  padding-top: 0.5em;
  blockquote {
    padding: 0.4em 0.2em;
    margin: 0.5em 0;
    background: lightgrey;
  }
  code {
    color: #a9b7c6;
    background: #2d3748;
    padding: 0.3em;
  }
  ul,
  p,
  pre,
  h2,
  h3,
  h4,
  h5 {
    margin-bottom: 0.5em;
  }
}
.hljs code {
  padding: 0;
}
</style>
