<template>
  <div class="step-toc">
    <h2><v-icon class="mr-2">mdi-table-of-contents</v-icon>Table of content</h2>
    <div id="toc-step"></div>
  </div>
</template>

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
