<template>
  <div class="markdown-viewer" v-html="markdown"></div>
</template>

<script>
import hljs from 'highlight.js'
import { debounce as _debounce } from 'lodash'
const md = require('markdown-it')({
  linkify: true,
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
    trigger: {
      type: [String, Boolean],
      required: false,
      default: '',
    },
  },
  data() {
    return {
      markdownValue: md.render(this.value || ''),
    }
  },
  computed: {
    markdown() {
      return this.markdownValue
    },
  },
  watch: {
    value: {
      handler: _debounce(function (newValue) {
        this.markdownValue = md.render(newValue || '')
      }, 1000),
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
  $color: var(--v-primary-base);
  blockquote {
    padding: 0.4em 0.6em;
    margin: 0.5em 1em;
    border-left: solid 0.4em var(--v-primary-base);
    background-color: rgba(var(--color-primary-rgb), 0.5);
    color: white;
    border-radius: 0.3em;
    p {
      margin: 0;
    }
  }
}
.hljs code {
  padding: 0;
}
</style>
