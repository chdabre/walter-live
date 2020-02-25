<template>
  <mdc-layout-grid class="content client-wrapper">
    <mdc-layout-cell desktop=5 tablet=12 phone=4>
      <!-- LOGO -->
      <img class="logo" src="../assets/logo.png" />

      <mdc-title v-if="!gameEnded" type="headline6" class="look">Schau nach vorne!</mdc-title>
      <mdc-title v-else type="headline6" class="look">Spielende!</mdc-title>

      <mdc-button v-if="gameEnded && isGameLeader" raised class="m-top-5" @click="newGame">Neues Spiel Starten</mdc-button>
    </mdc-layout-cell>
  </mdc-layout-grid>
</template>

<script>
export default {
  computed: {
    gameEnded () {
      return this.$store.state.room.game.ended
    },
    isGameLeader () {
      const playerId = this.$store.state.playerId
      const players = this.$store.state.room.players

      if (players[playerId]) {
        return players[playerId].isGameLeader
      }
      return false
    }
  },
  methods: {
    newGame () {
      this.$socket.emit('newGame', {
        roomId: this.$store.state.roomId
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.look {
  margin-top: 5rem;
  text-align: center;
}
</style>
