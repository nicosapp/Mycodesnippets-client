<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="mx-auto mb-6" max-width="700">
          <div class="fill-height d-flex align-center flex-wrap flex-md-nowrap">
            <div class="mx-auto">
              <v-img
                rounded
                :src="avatarUrl"
                :aspect-ratio="1"
                width="128px"
                height="128px"
                alt="avatar"
                class="ma-5"
              ></v-img>
            </div>
            <div class="flex-grow-1 d-flex flex-column" style="width: 100%">
              <v-card-title>{{ user.name }}</v-card-title>
              <v-card-text class="flex-grow-1">
                {{ user.description }}
              </v-card-text>

              <v-card-actions class="flex-wrap flex-md-nowrap">
                <v-spacer class="d-none d-md-block"></v-spacer>
                <v-btn text>
                  <v-icon class="mr-2">mdi-calendar-range</v-icon>
                  {{ registeredDate }}
                </v-btn>
                <v-btn text class="mx-0">
                  <v-icon class="mr-2">mdi-code-json</v-icon>
                  {{ user.snippets_count }} Snippets
                </v-btn>
              </v-card-actions>
            </div>
          </div>
        </v-card>
        <SnippetList :snippets="snippets">
          <LoadMoreButton :visible="canLoadMore" @click="loadMore" />
        </SnippetList>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import loadMoreHelper from '@/mixins/snippets/loadMore'
import moment from 'moment'

export default {
  mixins: [loadMoreHelper],
  async asyncData({ app, params }) {
    const user = await app.$axios.$get(`users/${params.id}`)
    const snippets = await app.$axios.$get(`users/${params.id}/snippets`)
    // eslint-disable-next-line camelcase
    const { total, current_page, last_page } = snippets.meta
    return {
      user: user.data,
      snippets: snippets.data,
      total,
      current_page,
      last_page,
    }
  },
  data() {
    return {
      user: null,
      snippets: [],
    }
  },
  computed: {
    registeredDate() {
      return moment(this.user.created_at).format('LL')
    },
    avatarUrl() {
      return this.$auth.user.avatar
        ? this.$auth.user.avatar.url
        : 'http://www.gravatar.com/avatar/?d=mp'
    },
  },
  methods: {
    async loadMore() {
      const snippets = await this._loadMore(
        `users/${this.$route.params.id}/snippets`
      )
      this.snippets = [...this.snippets, ...snippets.data.data]
    },
  },
}
</script>
