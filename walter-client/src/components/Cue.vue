<template>
  <mdc-layout-grid class="cue">
    <mdc-layout-cell desktop=1 tablet=12 phone=4>
      <div class="number-circle">
        <mdc-text typo="headline5" tag="h1">{{ number }}</mdc-text>
      </div>
    </mdc-layout-cell>

    <mdc-layout-cell desktop=10 tablet=12 phone=4>
      <mdc-text typo="headline6" class="cue-text"><vue-markdown>{{ template }}</vue-markdown></mdc-text>
    </mdc-layout-cell>
  </mdc-layout-grid>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  components: {
    VueMarkdown
  },
  props: {
    number: {
      type: Number,
      required: true
    },
    template: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>

.cue {
  padding: 0;
}

.number-circle {
  width: 1.5rem;
  height: 1.5rem;

  border: 2px solid black;
  border-radius: 50%;

  display: flex;
  align-items: center;

  h1 {
    width: 100%;
    margin: 0;
    text-align: center;
  }
}

.cue-text {
  margin-top: 0;
  line-height: 1.5em;

  & >>> p {
    margin: 0;
  }

  & >>> em {
    background-color: black;
    color: white;
    font-style: normal;
    font-weight: 600;
    padding: 0 .3em;
    margin: 0 .1em;
  }
}
</style>
