<template>
  <v-container dark class="pt-0">
    <v-row class="pt-0" justify-sm="center" justify-md="start">
      <v-col class="pt-0" cols="12" md="8">
        <v-form>
          <div
            class="mb-4 d-flex justify-space-between align-center grey--text --text-lighten 400"
          >
            <div>Created by Nicolas</div>
            <div v-if="lastSaved">Last saved at {{ lastSaved }}</div>
            <div v-else>Not saved yet</div>
          </div>
          <div class="d-flex align-center mb-4">
            <div class="font-weight-bold mr-3">
              {{ currentStepIndex + 1 }}/{{ steps.length }}.
            </div>
            <v-text-field
              v-model="currentStep.title"
              placeholder="Step title"
              hide-details="auto"
              height="3"
              filled
              clearable
              clear-icon="mdi-close-circle"
            ></v-text-field>
          </div>
          <div class="d-flex justify-space-between">
            <v-btn icon @click.prevent="toggleDrawerLeft"
              ><v-icon>mdi-cog</v-icon></v-btn
            >
            <AddStepButton
              :snippet="snippet"
              :current-step="currentStep"
              @added="handleStepAdded"
            />
            <DeleteStepButton
              v-if="steps.length > 1"
              :snippet="snippet"
              :current-step="currentStep"
              @deleted="handleStepDeleted"
            />
            <v-btn icon @click.prevent="toggleDrawerRight"
              ><v-icon>mdi-format-list-text</v-icon></v-btn
            >
          </div>

          <v-tabs v-model="editorTab" centered>
            <v-tabs-slider></v-tabs-slider>
            <v-tab class="ma-0 pa-0" style="min-width: 10px">
              <div
                class="pa-1"
                style="width: 100%; height: 100%"
                @click.prevent.stop="() => {}"
              >
                <StepNavigationButton :step="previousStep">
                  <v-icon>mdi-code-less-than</v-icon>
                </StepNavigationButton>
              </div>
            </v-tab>
            <v-tab href="#tab-editor">editor</v-tab>
            <v-tab href="#tab-preview">preview</v-tab>
            <v-tab class="ma-0 pa-0" style="min-width: 10px">
              <div
                class="pa-1"
                style="width: 100%; height: 100%"
                @click.prevent.stop="() => {}"
              >
                <StepNavigationButton :step="nextStep">
                  <v-icon dark>mdi-code-greater-than</v-icon>
                </StepNavigationButton>
              </div>
            </v-tab>
            <v-tabs-items v-model="editorTab" class="pt-2">
              <v-tab-item value="tab-editor">
                <StepEditor v-model="currentStep.body" :step="currentStep" />
              </v-tab-item>
              <v-tab-item value="tab-preview">
                <StepMarkdown :value="currentStep.body" />
              </v-tab-item>
            </v-tabs-items>
          </v-tabs>
        </v-form>
      </v-col>
      <v-col cols="12" md="4">
        <div class="ml-4">
          <StepsList :steps="orderedStepsAsc" :current-step="currentStep" />
          <h2 class="mb-4">Publishing</h2>
          <div class="mb-4">
            <input
              id="public"
              v-model="snippet.is_public"
              type="checkbox"
              name="public"
              class="mr-2"
            />
            <label for="public">Make this snippet public</label>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import StepMarkdown from '@/components/snippets/StepMarkdown'
import { debounce as _debounce } from 'lodash'
import moment from 'moment'

import browseSnippet from '@/mixins/snippets/browseSnippet'
import drawerRight from '@/mixins/navigation/drawerRight'
import drawerLeft from '@/mixins/navigation/drawerLeft'
import StepsList from './components/StepsList'
import StepNavigationButton from './components/StepNavigationButton'
import AddStepButton from './components/AddStepButton'
import DeleteStepButton from './components/DeleteStepButton'

export default {
  components: {
    StepsList,
    StepNavigationButton,
    AddStepButton,
    DeleteStepButton,
  },
  layout: 'editor',

  mixins: [browseSnippet, drawerRight, drawerLeft],
  async asyncData({ app, params }) {
    const snippet = await app.$axios.$get(`snippets/${params.id}`)

    return {
      snippet: snippet.data,
      steps: snippet.data.steps.data,
    }
  },
  data() {
    return {
      steps: [],
      snippet: null,
      editorTab: 'tab-editor',
      lastSaved: null,
    }
  },

  watch: {
    snippet: {
      deep: true,
      handler: _debounce(async function (snippet) {
        await this.$axios.$patch(`snippets/${this.snippet.uuid}`, {
          title: snippet.title,
          is_public: snippet.is_public,
        })
        this.touchLastSaved()
      }, 500),
    },
    currentStep: {
      deep: true,

      handler: _debounce(async function (step) {
        await this.$axios.$patch(`steps/${this.currentStep.uuid}`, {
          title: step.title,
          body: step.body,
        })
        this.touchLastSaved()
      }, 500),
    },
  },
  methods: {
    test() {
      console.log('test')
    },
    touchLastSaved() {
      this.lastSaved = moment(moment.now()).format('HH:mm:ss')
    },

    handleStepAdded(step) {
      this.orderedStepsAsc.map((s) => {
        if (s.order >= step.order) s.order++
      })
      this.steps.push(step)
      this.goToStep(step)
    },

    handleStepDeleted(step) {
      const previousStep = this.previousStep
      this.steps = this.steps.filter((s) => {
        return s.uuid !== step.uuid
      })

      this.goToStep(previousStep || this.firstStep)
    },
  },
  middleware: ['verified'],
  head() {
    return {
      title: `Editing ${this.snippet.title}` || 'Untitled Snippet',
    }
  },
}
</script>
