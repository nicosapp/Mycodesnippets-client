<template>
  <v-container dark>
    <v-row justify-sm="center" justify-md="start">
      <v-col cols="12" md="8">
        <div class="mb-3 d-flex justify-space-between align-center">
          <h2 class="primary--text flex-grow">Snippet title</h2>
          <v-btn
            class="mx-2"
            icon
            nuxt
            :to="{
              name: 'snippets-id-edit',
              params: { id: snippet.uuid },
            }"
          >
            <v-icon dark> mdi-square-edit-outline </v-icon>
          </v-btn>
        </div>
        <div class="mb-3">
          Created by <nuxt-link to="{}">Nicolas Izac</nuxt-link>
        </div>
        <div class="mb-3 d-flex justify-space-between align-center">
          <StepNavigationButton :step="previousStep">
            <v-icon dark>mdi-code-less-than</v-icon>
          </StepNavigationButton>
          <div class="font-weight-bold mr-3">
            {{ currentStepIndex + 1 }}/{{ steps.length }}.
          </div>
          <h3 class="flex-grow-1">Step title</h3>
          <StepNavigationButton :step="nextStep">
            <v-icon dark>mdi-code-greater-than</v-icon>
          </StepNavigationButton>
        </div>
        <div>
          <StepMarkdown :value="currentStep.body" />
        </div>
      </v-col>
      <v-col cols="12" md="4">
        <StepsList :steps="orderedStepsAsc" :current-step="currentStep" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import browseSnippet from '@/mixins/snippets/browseSnippet'
import StepsList from './edit/components/StepsList'
import StepNavigationButton from './edit/components/StepNavigationButton'

export default {
  components: {
    StepsList,
    StepNavigationButton,
  },
  mixins: [browseSnippet],
  async asyncData({ app, params }) {
    const snippet = await app.$axios.$get(`snippets/${params.id}`)

    return {
      snippet: snippet.data,
      steps: snippet.data.steps.data,
    }
  },
  data() {
    return {
      snippet: null,
      steps: [],
    }
  },
  head() {
    return {
      title: `${this.snippet.title || 'Untitled snippet'}`,
    }
  },
}
</script>
