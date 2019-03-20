<template>
  <div class="content cues">
    <mdc-layout-grid class="grid-padding">
      <!-- CUES -->
      <mdc-layout-cell desktop=12>
        <div class="header">
          <mdc-display typo="headline2"><b>Runde {{ game.currentRound + 1 }}</b></mdc-display>
          <mdc-display typo="headline2"><b>{{ players[game.currentRound].name }}</b> ist die Sphinx.</mdc-display>
        </div>
        
        <Cue class="cue"
          v-for="(cue, index) in game.rounds[game.currentRound].sentences"
          :key="'cue-' + index"
          :number="index + 1" 
          :template="cue.template"
        />

      </mdc-layout-cell>
    </mdc-layout-grid>
    <div class="progress">
      <mdc-text typo="headline5" tag="div" class="answer-count">{{ answerCount }} / {{ answersNeeded}} Antworten</mdc-text>
      <mdc-linear-progress class="progress" :progress="answerCount / answersNeeded"></mdc-linear-progress>
    </div>
  </div>
</template>

<script>
import Cue from '../components/Cue.vue'

export default {
  components: {
    Cue
  },
  computed: {
    game () {
      return this.$store.state.room.game
    },
    players () {
      return this.$store.state.room.players
    },
    answerCount () {
      return this.game.rounds[this.game.currentRound].answerCount
    },
    answersNeeded () {
      return (this.players.length * this.game.rounds[this.game.currentRound].sentences.length)
    }
  }
    
}
</script>

<style lang="scss" scoped>
.cues {
  height: 100%;
}

.header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;

  h1 {
    margin: 4rem 0; 
  }
}

.answer-count {
  text-align: right;
  padding-right: 2rem;
  padding-bottom: 1.5rem;
} 
</style>