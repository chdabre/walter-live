<template>
  <div class="cues">
    <mdc-layout-grid class="content grid-padding">
      <!-- ANSWERS -->
      <mdc-layout-cell desktop=12>
        <div class="header">
          <mdc-display typo="headline1">Runde {{ game.currentRound + 1 }}</mdc-display>
          <mdc-display typo="headline2"><b>{{ players[game.currentRound].name }}</b> ist die Sphinx.</mdc-display>
        </div>
        
        <transition class="cue" tag="div" appear name="component-slide" mode="out-in">
          <div :key="'page-' + currentCue">
            <Cue class="cue"
              :key="'cue-' + currentCue"
              :number="currentCue + 1" 
              :template="currentSentence.template"
            />

            <mdc-layout-grid class="answers-wrapper">
              <mdc-layout-cell desktop=1></mdc-layout-cell>
              <mdc-layout-cell desktop=10>
                <transition-group class="answers" tag="div" appear name="component-slide">
                  <div class="answer" v-for="(answer, index) in currentSentence.answers" :key="'answer-' + index">
                      <mdc-text typo="headline3" tag="span">{{ answer | formatAnswer(currentSentence) }}</mdc-text>
                  </div>
                </transition-group>
              </mdc-layout-cell>
            </mdc-layout-grid>
          </div>
        </transition>
      </mdc-layout-cell>
    </mdc-layout-grid>
    <mdc-text typo="body1" tag="div" class="answer-count">{{ answerCount }} / {{ answersNeeded}}</mdc-text>
    <mdc-linear-progress class="progress" :progress="answerCount / answersNeeded"></mdc-linear-progress>
  </div>
</template>

<script>
import Cue from '../components/Cue.vue'

export default {
  data () {
    return {
    }
  },
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
    currentSentence () {
      return this.game.rounds[this.game.currentRound].sentences[this.currentCue]
    },
    answerCount () {
      let currentRound = this.game.rounds[this.game.currentRound]
      return currentRound.sentences[currentRound.currentVoteStep].votes.length
    },
    answersNeeded () {
      return this.players.length
    },
    currentCue () {
      return this.game.rounds[this.game.currentRound].currentVoteStep
    }
  },
  filters: {
    formatAnswer (value, currentSentence) {
      return value.join(', ')
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

.answers {
  display: flex;
  flex-wrap: wrap;

  .answer {
    border: 3px solid black;
    padding: 1rem 2rem;
    margin-right: 1rem;
  }
}

.answer-count {
  text-align: right;
  padding-right: 2rem;
} 
</style>