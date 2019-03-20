<template>
  <div class="cues">
    <mdc-layout-grid class="content grid-padding">
      <!-- RESULTS -->
      <mdc-layout-cell desktop=12>
        <div class="header">
          <mdc-display typo="headline1">Runde {{ game.currentRound + 1 }} - Resultate</mdc-display>
        </div>
        
        <transition v-if="currentSentence" class="cue" tag="div" appear name="component-slide" mode="out-in">
          <div :key="'page-' + currentResult">
            <Cue class="cue"
              :key="'cue-' + currentResult"
              :number="currentResult + 1" 
              :template="currentSentence.template"
            />

            <transition appear name="component-slide" mode="out-in">
              <mdc-layout-grid class="votes-wrapper" :key="currentAnswer">
                <mdc-layout-cell desktop=1></mdc-layout-cell>
                <mdc-layout-cell desktop=10>
                      <div class="vote-set">
                        <div class="answer-set">
                          <div class="answer"><mdc-text typo="headline3" tag="span">{{ currentSentence.answers[currentAnswer] | formatAnswer }}</mdc-text></div>
                          <mdc-text class="m-left-2 player" typo="headline3" tag="span">- <i :class="currentAnswer === game.currentRound ? 'mdc-theme--primary':''">{{ players[currentAnswer].name }}</i>, {{ new Date().getFullYear() }}</mdc-text>
                        </div>

                        <div class="votes">
                          <mdc-chip-set>
                            <mdc-chip v-for="vote in currentVotes" :key="vote.playerId">{{ players[vote.playerId].name }}</mdc-chip>
                          </mdc-chip-set>
                        </div>
                      </div>
                </mdc-layout-cell>
              </mdc-layout-grid>
            </transition>
          </div>
        </transition>
      </mdc-layout-cell>
    </mdc-layout-grid>
  </div>
</template>

<script>
import Cue from '../components/Cue.vue'
import { setInterval } from 'timers';

// <mdc-chip v-for="(vote, index) in currentSentence.votes" :key="'v-' + index">{{ currentSentence.answers[vote.vote] | formatAnswer }} - {{ players[vote.playerId].name }}</mdc-chip>

export default {
  data () {
    return {
        currentResult: 0,
        currentAnswer: 0
    }
  },
  components: {
    Cue
  },
  computed: {
    game () {
      return this.$store.state.room.game
    },
    currentRound () {
      return this.game.rounds[this.game.currentRound]
    },
    players () {
      return this.$store.state.room.players
    },
    currentSentence () {
      return this.currentRound.sentences[this.currentResult]
    },
    currentVotes () {
      if (typeof this.currentSentence !== 'undefined') {
        return this.currentSentence.votes.filter(vote => {
          return vote.vote === this.currentAnswer
        })
      }
      return []
    }
  },
  filters: {
    formatAnswer (value, currentSentence) {
      if (value )return value.join(', ')
      return ''
    }
  },
  created () {
    setInterval(() => {
      this.currentAnswer++
      if (this.currentVotes.length === 0) this.currentAnswer++

      if (this.currentSentence && this.currentAnswer > this.currentSentence.answers.length - 1) {
        this.currentAnswer = 0
        this.currentResult++

        if (this.currentResult >= this.currentRound.sentences.length) {
          this.$socket.emit('finishRound', { roomId: this.$store.state.roomId })
        }
      }
    }, 5000)
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

.votes-wrapper {
  height: 100%;
}

.answer-set {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  
  .player {
    font-style: italic;
    font-weight: bold;
  }

  .answer {
    border: 3px solid black;
    padding: 1rem 2rem;
    margin-right: 1rem;
  }
}

.vote-set {
  .votes {
    margin-top: 2rem;
    
    .mdc-chip {
      font-size: 3rem;
      padding: 2rem;
    }
  }
}

.answer-count {
  text-align: right;
  padding-right: 2rem;
} 
</style>