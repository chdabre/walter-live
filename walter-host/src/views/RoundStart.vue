<template>
  <div class="content scoreboard">
    <mdc-layout-grid class="grid-padding">
      <!-- LOGO -->
      <mdc-layout-cell class="logo-column">
        <img class="logo" src="../assets/logo.png" />
      </mdc-layout-cell>

      <!-- SCOREBOARD -->
      <mdc-layout-cell desktop=6 v-if="game.currentRound >= 0">
        <mdc-display typo="headline1">Runde {{ game.currentRound + 1 }}</mdc-display>
        <mdc-display typo="headline2"><b>{{ players[game.currentRound].name }}</b> ist die Sphinx.</mdc-display>
      </mdc-layout-cell>
    </mdc-layout-grid>
    <mdc-linear-progress class="progress" :progress="timeElapsed"></mdc-linear-progress>
  </div>
</template>

<script>
export default {
  data () {
    return {
      startDate: null,
      showDuration: 5000,
      timeElapsed: 0
    }
  },
  computed: {
    game () {
      return this.$store.state.room.game
    },
    players () {
      return this.$store.state.room.players
    }
  },
  mounted () {
    if (this.game.currentRound === -1) this.$socket.emit('nextCard', { roomId: this.$store.state.roomId })

    this.startDate = new Date()
    setTimeout(() => {
      this.$socket.emit('showCues', { roomId: this.$store.state.roomId })
    }, this.showDuration)

    let tInterval = setInterval(tInterval => {
      let millisElapsed = ((new Date()).getTime() - this.startDate.getTime())
      if (millisElapsed > this.showDuration) {
        this.timeElapsed = 1
        clearInterval(tInterval)
      } else {
        this.timeElapsed = millisElapsed / this.showDuration 
      }
    }, 1000)
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
</style>