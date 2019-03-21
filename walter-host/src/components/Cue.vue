<template>
  <mdc-layout-grid class="cue">
    <mdc-layout-cell desktop=1>
      <div class="number-circle">
        <mdc-display typo="headline3">{{ number }}</mdc-display>
      </div>
    </mdc-layout-cell>

    <mdc-layout-cell desktop=10>
      <mdc-display typo="headline3" class="cue-text" :class="bigger ? 'bigger':''">
        <vue-markdown>{{ template | insertAnswer(answer) }}</vue-markdown>
      </mdc-display>
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
    },
    answer: {
      type: Array,
      required: false
    },
    bigger: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  filters: {
    insertAnswer (template, answer) {
      if (answer) {
        answer.forEach(answer => {
          template = template.replace(/_[A-Za-z]*_/, `~${answer}~`)
        })
        template = template.replace(/~/g, '_')
        return template
      } else {
        return template
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.number-circle {
  margin-top: 1rem;
  width: 3rem;
  height: 3rem;

  border: 2px solid black;
  border-radius: 50%;

  display: flex;
  align-items: center;

  h1 {
    width: 100%;
    margin: 0;
    text-align: center;
    font-size: 2.25rem;
  }
}

.cue-text {
  margin-top: 0;
  line-height: 1.5em;
  font-size: 2.25rem;

  &.bigger {
    font-size: 3rem;
  }

  & /deep/ p {
    margin: 0;
  }

  & /deep/ em {
    background-color: black;
    color: white;
    font-style: normal;
    font-weight: 600;
    padding: 0 .3em;
    margin: 0 .1em;
  }
}
</style>
