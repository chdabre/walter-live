<template>
  <mdc-layout-grid class="content client-wrapper">
    <mdc-layout-cell v-if="player" desktop=5 tablet=12 phone=4>
      <!-- LOGO -->
      <img class="logo" src="../assets/logo.png" />

      <mdc-title type="headline6">Freut mich, {{ player.name }}!</mdc-title>  

      <template v-if="player.isGameLeader">
        <mdc-title type="headline6">Sind alle Spieler bereit?</mdc-title>
        <mdc-button raised class="mt-2" @click="startGame">Ja, los!</mdc-button>
      </template>
      <template v-else>
        <mdc-title type="headline6">Bitte warte auf die anderen Spieler.</mdc-title> 
      </template>
    </mdc-layout-cell>

    <mdc-snackbar ref="snackbar"/>
  </mdc-layout-grid>
</template>

<script>
export default {
  computed: {
    player () {
      let room = this.$store.state.room
      let playerId = this.$store.state.playerId
      
      return room.players[playerId]
    }
  },
  methods: {
    startGame () {
      this.$socket.emit('startGame', { roomId: this.$store.state.roomId})
    }
  },
  sockets: {
    err (msg) {
      this.$root.$emit('show-snackbar', {
        message: msg.errorText,
        actionText: 'close',
        actionHandler() {},
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mdc-button{
  width: 100%;
}
</style>
