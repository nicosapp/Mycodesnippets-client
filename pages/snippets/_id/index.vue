<template>
  <v-container dark>
    <LoadingCircular v-if="!snippet.title" />
    <v-row v-else justify-sm="center" justify-md="start">
      <v-col cols="12" md="8">
        <div class="mb-3">
          <v-btn
            v-if="$vuetify.breakpoint.mobile"
            style="float: right"
            icon
            @click.prevent="toggleDrawerRight"
            ><v-icon>mdi-format-list-text</v-icon>
          </v-btn>
          <h2 class="primary--text flex-grow">
            {{ snippet.title || 'Untitled snippet' }}
          </h2>
        </div>
        <div class="mb-3">
          Created by
          <nuxt-link :to="{ name: 'users-id', params: { id: author.uuid } }">
            {{ author.name }}
          </nuxt-link>
          <v-spacer></v-spacer>
        </div>
        <div class="mb-3 d-flex justify-space-between align-center">
          <StepNavigationButton :step="previousStep" class="mr-2">
            <v-icon dark>mdi-code-less-than</v-icon>
          </StepNavigationButton>
          <div class="font-weight-bold mr-3">
            {{ currentStepIndex + 1 }}/{{ steps.length }}.
          </div>
          <h3 class="flex-grow-1">{{ currentStep.title }}</h3>
          <StepNavigationButton :step="nextStep" class="ml-2">
            <v-icon dark>mdi-code-greater-than</v-icon>
          </StepNavigationButton>
        </div>
        <div>
          <LoadingCircular v-if="!source" />
          <StepMarkdownPrism v-else :value="source" />
        </div>
      </v-col>
      <v-col v-if="!$vuetify.breakpoint.mobile" cols="12" md="4">
        <StepsList class="mb-4" />
        <StepTableOfContent />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import browseSnippet from '@/mixins/snippets/snippet'
import drawerRight from '@/mixins/navigation/drawerRight'

export default {
  layout: 'snippetView',
  mixins: [browseSnippet, drawerRight],
  data() {
    return {
      source: null,
    }
  },
  async mounted() {
    this.$store.dispatch('bottomBar/setActive', 'create')
    await this.getSnippet(this.$route.params.id)
    this.source = this.currentStep.body
  },
  head() {
    return {
      title: `${this.snippet.title || 'Untitled snippet'}`,
    }
  },
}
</script>
