<template>
  <mdc-layout-grid class="content client-wrapper">
    <mdc-layout-cell>
      <mdc-text typo="headline5" tag="h2">Runde {{ game.currentRound + 1 }}</mdc-text>
      
      <template v-if="!done">
        <mdc-text v-if="!sphinx" typo="headline5" tag="h2"><b>{{ players[game.currentRound].name }}</b> ist die Sphinx.</mdc-text>
        <mdc-text v-else typo="headline5" tag="h2"><b>Du bist ist die Sphinx.</b></mdc-text>

        <Cue
        :number="currentAnswerStep + 1"
        :template="currentTemplate"
        :key="currentTemplate"
        />

        <div class="answer-prompt" v-for="(val, index) in answerPrompts" :key="'ap-' + index">
          <span class="walter">WALTER</span><sup>{{ index + 1 }}</sup><br>
          <mdc-textfield
            @keydown.enter="submitAnswer"
            v-model="answers[currentAnswerStep][index]"
            label="WALTER"
            minlength=1
            maxlength=50          
            box/>
        </div>

        <mdc-button raised class="mt-2" @click="submitAnswer">
          <template v-if="currentAnswerStep < 2">Weiter</template>
          <template v-else>Fertig</template>
        </mdc-button>
      </template>
      <template v-else>
        <mdc-text typo="headline6" tag="h2">Danke für deine Antworten.</mdc-text>
      </template>
    </mdc-layout-cell>
    
    <mdc-snackbar ref="snackbar"/>
  </mdc-layout-grid>
</template>

<script>
import Cue from '../components/Cue.vue'

export default {
  components: {
    Cue
  },
  data () {
    return {
      currentAnswerStep: 0,
      answers: [],
      done: false
    }
  },
  computed: {
    game () {
      return this.$store.state.room.game
    },
    players () {
      return this.$store.state.room.players
    },
    sphinx () {
      return this.players[this.game.currentRound] === this.players[this.$store.state.playerId]
    },
    currentRound () {
      return this.game.rounds[this.game.currentRound]
    },
    answerPrompts () {
      return getAnswerPromptCount(this.currentTemplate)
    },
    currentTemplate () {
      if (this.currentRound.sentences[this.currentAnswerStep]) {
        return this.currentRound.sentences[this.currentAnswerStep].template
      }
      return ''
    }
  },
  created () {
    this.currentRound.sentences.forEach(sentence => {
      let answerFormat = Array(getAnswerPromptCount(sentence.template)).fill('')
      this.answers.push(answerFormat)
    })
  },
  methods: {
    submitAnswer () {
      if (answerStepValid(this.answers[this.currentAnswerStep])) {
        this.currentAnswerStep++
        if (this.currentAnswerStep >= this.currentRound.sentences.length) {
          this.done = true
          this.$socket.emit('submitAnswers', {
            roomId: this.$store.state.roomId,
            playerId: this.$store.state.playerId,
            answers: this.answers
          })
        }
      } else {
        this.$root.$emit('show-snackbar', {
          message: 'You need to fill an answer for all fields',
          actionText: 'OK',
          actionHandler() {},
        })
      }
    }
  }
}

function getAnswerPromptCount (template) {
  return (template.match(/\_/g)||[]).length / 2
}

function answerStepValid (answers) {
  let valid = true
  answers.forEach(answer => {
    if (!answer) {
      valid = false
    }
  })

  return valid
}
</script>

<style lang="scss" scoped>
.mdc-textfield-wrapper{
  width: 100%;
}
</style>