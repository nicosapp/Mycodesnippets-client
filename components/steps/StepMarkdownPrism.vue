<template>
  <div>
    <VueMarkdown
      toc
      task-lists
      toc-id="toc-step"
      show
      toc-anchor-link
      class="markdown-for-step"
      :source="source"
      :watches="extensions"
      :toc-first-level="2"
      :toc-last-level="5"
      @rendered="prismHighlight"
    ></VueMarkdown>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import Prism from 'prismjs'
import { debounce as _debounce, delay as _delay } from 'lodash'

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
  },
  data() {
    return {
      source: this.value,
      extensions: ['source', 'toc', 'show'],
    }
  },
  watch: {
    value: {
      handler: _debounce(function (newValue) {
        this.source = newValue || ''
      }, 1000),
    },
  },
  mounted() {
    this.prismHighlight()
  },
  methods: {
    prismHighlight() {
      _delay(function () {
        Prism.highlightAll()
      }, 500)
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
@import '@/node_modules/prismjs/themes/prism-tomorrow.css';
.markdown-for-step {
  pre[class*='language-'] {
    border-radius: 0.3rem;
    font-size: 0.8rem;
    line-height: 1.2;
  }
  code:not([class*='language-']) {
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
</style>
