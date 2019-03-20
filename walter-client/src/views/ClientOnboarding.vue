<template>
  <mdc-layout-grid class="content client-wrapper">
    <mdc-layout-cell>
      <!-- LOGO -->
      <img class="logo" src="../assets/logo.png" />

      <template v-if="!game.playersReady">
        <mdc-title type="headline6">Hallo! Trag bitte deinen Namen ein.</mdc-title>  
        <mdc-textfield @keydown.enter="submitName" v-model="userForm.name" label="Name" helptext-persistent helptext-validation :valid="!error" :helptext="errorText" box/>
        <mdc-button raised class="mt-2" @click="submitName">Beitreten</mdc-button>
      </template>
      <template v-else>
        <mdc-title type="headline6">Das Spiel hat bereits gestartet! Warte auf die nächste Runde.</mdc-title>  
      </template>
    </mdc-layout-cell>
  </mdc-layout-grid>
</template>

<script>
export default {
  data () {
    return {
      userForm: {
        name: ""
      },
      error: false,
      errorText: ""
    }
  },
  computed: {
    game () {
      return this.$store.state.room.game
    }
  },
  methods: {
    submitName () {
      if (this.userForm.name.length > 0) {
        this.$socket.emit('createPlayer', {
          roomId: this.$store.state.roomId,
          name: this.userForm.name
        })
      } else {
        this.error = true
        this.errorText = 'Dein Name darf nicht leer sein.'
      }
    },
    startGame () {
      this.$socket.emit('startGame', {
        roomId: this.$store.state.roomId
      })
    }
  },
  sockets: {
    playerId (msg) {
      this.$store.commit('playerId', msg.playerId)
    },
    err (msg) {
      this.error = true,
      this.errorText = msg.errorText
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 100%;
}

.mdc-button, .mdc-textfield-wrapper {
  width: 100%;
}
</style>
