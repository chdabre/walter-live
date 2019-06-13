<template>
  <div class="content scoreboard">
    <mdc-layout-grid class="grid-padding">
      <!-- LOGO -->
      <mdc-layout-cell class="logo-column">
        <img class="logo" src="../assets/logo.png" />
      </mdc-layout-cell>

      <!-- SCOREBOARD -->
      <mdc-layout-cell desktop=6>
        <mdc-display typo="headline2"><i v-if="room.game.ended">Spielende -</i> Punkte</mdc-display>

        <div class="players-list">
          <div class="players-list-item" v-for="(player, id) in playersSorted" :key="'player-' + id">
            <div class="number-circle">
              <mdc-display>{{ id + 1 }}</mdc-display>
            </div>

            <mdc-display>{{ player.name }}</mdc-display>
            <div class="dotted"></div>
            <mdc-display class="points">{{ player.points + player.handicap }}</mdc-display>
          </div>
        </div>
      </mdc-layout-cell>
    </mdc-layout-grid>
    <mdc-linear-progress class="progress" :progress="timeElapsed"></mdc-linear-progress>
  </div>
</template>

<script>
/* global ga */
export default {
  data () {
    return {
      startDate: null,
      showDuration: 8000,
      timeElapsed: 0,
      tInterval: null
    }
  },
  computed: {
    room () {
      return this.$store.state.room
    },
    playersSorted () {
      let playersCopy = JSON.parse(JSON.stringify(this.room.players))
      let sortedPlayers = playersCopy.sort((a, b) => {
        let playerPointsA = a.points + a.handicap
        let playerPointsB = b.points + b.handicap

        return playerPointsB - playerPointsA
      })

      return sortedPlayers
    }
  },
  mounted () {
    this.startDate = new Date()

    if (!this.room.game.ended) {
      if (this.room.game.currentRound === -1) {
        console.log("Send startGame event")
        gtag('event', 'start', {
          event_category: 'Game',
          event_label: 'Game started',
          value: this.room.players.length
        })
      }

      setTimeout(() => {
        this.$socket.emit('nextCard', { roomId: this.$store.state.roomId })
      }, this.showDuration)

      this.tInterval = setInterval(tInterval => {
        let millisElapsed = ((new Date()).getTime() - this.startDate.getTime())
        if (millisElapsed > this.showDuration) {
          this.timeElapsed = 1
          clearInterval(this.tInterval)
        } else {
          this.timeElapsed = millisElapsed / this.showDuration
        }
      }, 1000)
    } else {
      console.log("Send gameFinished event")
      gtag('send', 'end', {
        event_category: 'Game',
        event_label: 'Game finished'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/variables";

.logo-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  width: 67%;
}

.players-list-item {
  height: 3.5em;

  display: flex;
  align-items: center;

  h1 {
    margin-left: 2rem;
  }

  .dotted {
    border-bottom: 2px dotted black;
    height: 1.5rem;
    flex-grow: 1;
    margin-left: 1rem;
  }
  .points {
    text-align: right
  }
}

.number-circle {
  width: 2.5rem;
  height: 2.5rem;

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
</style>
