<template>
  <textarea ref="textarea" class="grey lighten-2"> </textarea>
</template>

<script>
export default {
  props: {
    step: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      codemirror: null,
    }
  },
  computed: {
    document() {
      return this.codemirror.getDoc()
    },
  },

  watch: {
    'step.uuid'() {
      this.document.setValue(this.step.body || '')
    },
  },

  mounted() {
    const CodeMirror = require('codemirror')
    this.codemirror = CodeMirror.fromTextArea(this.$refs.textarea, {
      indentUnit: 2,
      indentWithTabs: false,
      smartIndent: true,
      lineWrapping: true,
      lineNumbers: false,
      scrollbarStyle: null,
      extraKeys: {
        Tab: (codemirror) => codemirror.execCommand('indentMore'),
        'Shit-Tab': (codemirror) => codemirror.execCommand('indentLess'),
      },
    })

    this.document.setValue(this.step.body || '')
    this.document.on('change', (codemirror) => {
      this.$emit('input', this.document.getValue())
    })
  },
}
</script>

<style lang="scss">
.CodeMirror {
  width: 100%;
  border: dashed 2px lightgrey;
  border-radius: 0.3rem;
  padding: 0.5rem;
  background-color: #eee;
}
</style>
