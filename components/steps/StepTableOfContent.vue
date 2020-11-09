<template>
  <div class="step-toc">
    <h2>
      <v-btn icon @click="open = !open">
        <v-icon class="mr-2">mdi-table-of-contents</v-icon>
      </v-btn>
      Table of content
    </h2>
    <v-slide-x-transition>
      <div v-show="open" id="toc-step"></div>
    </v-slide-x-transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: true,
    }
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/palette';
.step-toc {
  ul {
    list-style: none;
    counter-reset: my-counter;
    padding-left: 1rem;
    li {
      counter-increment: my-counter;
      font-size: 1rem;
      a {
        color: rgb(0, 0, 0, 0.8);
      }
    }
    li::before {
      content: '#' counters(my-counter, '.');
      color: $color-primary;
      font-weight: bold;
      font-size: 1.2rem;
      margin-right: 0.5rem;
      line-height: 1;
    }
  }
}
</style>
