<template>
  <mdc-layout-grid class="content client-wrapper">
    <mdc-layout-cell>
      <template v-if="!sphinx && done !== currentVotingStep && currentVotingStep < currentRound.sentences.length">
        <mdc-text typo="headline5" tag="h2">Runde {{ game.currentRound + 1 }} - <b>{{ players[game.currentRound].name }}</b> ist die Sphinx.</mdc-text>
        <mdc-text typo="headline5" tag="h2"><b>Welche Antwort ist DER WAHRE WALTER?</b></mdc-text>

        <Cue
        :number="currentVotingStep + 1"
        :template="currentTemplate"
        :key="currentTemplate"
        />

        <div class="vote-prompt" v-for="(val, index) in answers" :key="'vp-' + index">
          <mdc-button class="m-top-1" outlined @click="submitVote(val.playerId)">{{ val.answer | formatAnswer }}</mdc-button>
        </div>
      </template>
      <template v-else-if="done >= currentVotingStep">
        <mdc-text typo="headline5" tag="h2">Runde {{ game.currentRound + 1 }}</mdc-text>
        <mdc-text typo="headline5" tag="h2">Danke für deine Antwort.</mdc-text>
      </template>
      <template v-else-if="currentVotingStep >= currentRound.sentences.length">
        <mdc-text typo="headline5" tag="h2">Runde {{ game.currentRound + 1 }}</mdc-text>
        <mdc-text typo="headline5" tag="h2">Danke für deine Antworten.</mdc-text>
      </template>
      <template v-else>
        <mdc-text typo="headline5" tag="h2">Runde {{ game.currentRound + 1 }}</mdc-text>
        <mdc-text typo="headline5" tag="h2"><b>Du bist ist die Sphinx.</b> Lehn dich für ein paar Sekunden zurück.</mdc-text>
      </template>
    </mdc-layout-cell>
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
      done: -1
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
    answers () {
      return this.currentRound.shuffledAnswers[this.currentVotingStep]
        .filter(answer => answer.playerId !== this.$store.state.playerId)
    },
    currentTemplate () {
      if (this.currentRound.sentences[this.currentVotingStep]) {
        return this.currentRound.sentences[this.currentVotingStep].template
      }
      return ''
    },
    currentVotingStep () {
      return this.currentRound.currentVoteStep
    }
  },
  methods: {
    submitVote (playerId) {
      this.done = this.currentVotingStep
      this.$socket.emit('submitVote', {
        roomId: this.$store.state.roomId,
        playerId: this.$store.state.playerId,
        vote: playerId
      })
    }
  },
  filters: {
    formatAnswer (value, currentSentence) {
      return value.join(', ')
    }
  }
}

function getAnswerPromptCount (template) {
  return (template.match(/\_/g)||[]).length / 2
}
</script>

<style lang="scss" scoped>
.mdc-textfield-wrapper{
  width: 100%;
}
</style>