<template>
  <v-container dark>
    <v-row justify-sm="center" justify-md="start">
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
          <StepMarkdown :value="currentStep.body" />
        </div>
      </v-col>
      <v-col v-if="!$vuetify.breakpoint.mobile" cols="12" md="4">
        <StepsList />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import browseSnippet from '@/mixins/snippets/snippet'
import drawerRight from '@/mixins/navigation/drawerRight'
import StepsList from './edit/components/StepsList'
import StepNavigationButton from './edit/components/StepNavigationButton'

export default {
  components: {
    StepsList,
    StepNavigationButton,
  },
  layout: 'snippetView',
  mixins: [browseSnippet, drawerRight],
  data() {
    return {}
  },
  mounted() {
    this.$store.dispatch('bottomBar/setActive', 'create')
    this.getSnippet(this.$route.params.id)
  },
  head() {
    return {
      title: `${this.snippet.title || 'Untitled snippet'}`,
    }
  },
}
</script>
