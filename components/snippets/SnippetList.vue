<template>
  <div>
    <v-row>
      <v-col
        v-for="snippet in snippets"
        :key="snippet.uuid"
        cols="12"
        sm="6"
        lg="4"
      >
        <SnippetListItem :snippet="snippet" />
      </v-col>
    </v-row>
    <div class="text-center">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    snippets: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
}
</script>
