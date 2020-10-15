<template>
  <div class="d-flex justify-center">
    <label for="cover" class="flex-grow-1">
      <template v-if="url">
        <v-hover v-slot:default="{ hover }">
          <v-img
            :aspect-ratio="1"
            width="160px"
            class="mx-auto my-2 rounded"
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
          class="my-2 mx-auto px-6"
          outlined
          label
          large
          style="cursor: pointer"
          text-color="grey"
        >
          <v-icon left>mdi-image</v-icon>Avatar
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
import userHelper from '@/mixins/user/user'
export default {
  mixins: [mediaHelper, userHelper],

  computed: {
    avatar: {
      get() {
        return this.$auth.user.avatar || null
      },
      set(newAvatar) {
        this.updateUserProperty('avatar', newAvatar)
      },
    },
    url() {
      return this.avatar ? this.avatar.url : this.defaultUrl
    },
    defaultUrl() {
      return 'http://www.gravatar.com/avatar/?d=mp'
    },
  },
  methods: {
    async handleMedia(files) {
      this.handleMediaSelected(files)
      try {
        const response = await this.upload(
          `users/${this.$auth.user.uuid}/avatar`
        )
        this.avatar = response.data.data
      } catch (e) {}
    },
  },
}
</script>
