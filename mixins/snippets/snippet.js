import { mapGetters, mapActions } from 'vuex'
import { orderBy as _orderBy } from 'lodash'
import hotkeys from 'hotkeys-js'

export default {
  computed: {
    ...mapGetters({
      snippet: 'snippet/snippet',
      steps: 'snippet/steps',
      orderedStepsAsc: 'snippet/orderedStepsAsc',
      orderedStepsDesc: 'snippet/orderedStepsDesc',
      firstStep: 'snippet/firstStep',
    }),
    currentStep() {
      return (
        this.orderedStepsAsc.find((s) => s.uuid === this.$route.query.step) ||
        this.firstStep
      )
    },
    orderedStepsAsc() {
      return _orderBy(this.steps, 'order', 'asc')
    },
    orderedStepsDesc() {
      return _orderBy(this.steps, 'order', 'desc')
    },
    firstStep() {
      return this.orderedStepsAsc.length ? this.orderedStepsAsc[0] : {}
    },
    nextStep() {
      return (
        this.orderedStepsAsc.find((s) => s.order > this.currentStep.order) ||
        null
      )
    },
    previousStep() {
      return (
        this.orderedStepsDesc.find((s) => s.order < this.currentStep.order) ||
        null
      )
    },
    currentStepIndex() {
      return this.orderedStepsAsc
        .map((s) => s.uuid)
        .indexOf(this.currentStep.uuid)
    },
    author() {
      return this.snippet.author || {}
    },
  },
  methods: {
    ...mapActions({
      getSnippet: 'snippet/getSnippet',
      updateSnippetProperty: 'snippet/updateSnippetProperty',
      updateStep: 'snippet/updateStep',
      updateStepProperty: 'snippet/updateStepProperty',
      addStep: 'snippet/addStep',
      deleteStep: 'snippet/deleteStep',
    }),

    changeSnippetProperty(key, value) {
      this.updateSnippetProperty({ key, value })
    },

    changeStepProperty(key, value) {
      this.updateStepProperty({ step: this.currentStep, key, value })
    },

    registerKeyboardShortcuts() {
      hotkeys('ctrl+shift+left, ctrl+shift+right', (event, handler) => {
        switch (handler.key) {
          case 'ctrl+shift+left':
            if (this.previousStep) {
              this.goToStep(this.previousStep)
            }
            break
          case 'ctrl+shift+right':
            if (this.nextStep) {
              this.goToStep(this.nextStep)
            }
            break
        }
      })
    },
    goToStep(step) {
      this.$router.push({
        query: {
          step: step.uuid,
        },
      })
    },
  },
}
