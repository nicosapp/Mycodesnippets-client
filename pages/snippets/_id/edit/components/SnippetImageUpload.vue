<template>
  <div class="d-flex justify-center">
    <label for="cover" class="flex-grow-1">
      <template v-if="url">
        <v-hover v-slot:default="{ hover }">
          <v-img
            class="rounded"
            :aspect-ratio="16 / 9"
            min-width="100px"
            width="100%"
            :src="url"
            contain
          >
            <v-expand-transition>
              <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out grey darken-2 d-flex justify-center align-items-center"
                style="
                  height: 100%;
                  opacity: 0.5;
                  bottom: 0;
                  position: absolute;
                  width: 100%;
                "
              >
                <v-icon large color="white">mdi-image</v-icon>
              </div>
            </v-expand-transition>
          </v-img>
        </v-hover>
      </template>
      <template v-else>
        <v-chip
          class="ma-2 px-6"
          outlined
          label
          large
          style="cursor: pointer"
          text-color="grey"
        >
          <v-icon left>mdi-image</v-icon>Cover
        </v-chip>
      </template>
    </label>
    <input
      id="cover"
      type="file"
      class="d-none"
      @change="handleMedia($event.target.files)"
    />
  </div>
</template>

<script>
import mediaHelper from '@/mixins/helper/mediaHelper'
import { mapActions, mapGetters } from 'vuex'
export default {
  mixins: [mediaHelper],

  computed: {
    ...mapGetters({
      snippet: 'snippet/snippet',
    }),
    cover: {
      get() {
        return this.snippet.cover || {}
      },
      set(newCover) {
        this.updateSnippetProperty({ key: 'cover', value: newCover })
      },
    },
    url() {
      return this.cover ? this.cover.url : null
    },
  },
  methods: {
    ...mapActions({
      updateSnippetProperty: 'snippet/updateSnippetProperty',
    }),
    async handleMedia(files) {
      this.handleMediaSelected(files)
      try {
        const response = await this.upload(
          `snippets/${this.snippet.uuid}/cover`
        )
        this.cover = response.data.data
      } catch (e) {}
    },
  },
}
</script>
