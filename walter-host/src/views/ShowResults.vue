<template>
  <div class="cues">
    <mdc-layout-grid class="content grid-padding">
      <!-- RESULTS -->
      <mdc-layout-cell desktop=12>
        <div class="header">
          <mdc-display typo="headline1">Runde {{ game.currentRound + 1 }} </mdc-display>
        </div>
        
        <transition class="cue" tag="div" appear name="component-slide" mode="out-in">
          <div :key="'page-' + currentResult">
            <Cue class="cue"
              :key="'cue-' + currentResult"
              :number="currentResult + 1" 
              :template="currentSentence.template"
            />

            <mdc-display v-for="(vote, index) in currentSentence.votes" :key="'v-' + index">
                {{ currentSentence.answers[vote.vote] | formatAnswer }} - {{ players[vote.playerId].name }}
            </mdc-display>
          </div>
        </transition>
      </mdc-layout-cell>
    </mdc-layout-grid>
  </div>
</template>

<script>
import Cue from '../components/Cue.vue'

export default {
  data () {
    return {
        currentResult: 0
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
      return this.game.rounds[this.game.currentRound].sentences[this.currentResult]
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