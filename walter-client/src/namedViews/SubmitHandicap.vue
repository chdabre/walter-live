<template>
  <mdc-layout-grid class="content client-wrapper">
    <mdc-layout-cell desktop=5 tablet=12 phone=4>
      <!-- LOGO -->
      <img class="logo" src="../assets/logo.png" />

      <template v-if="!submitted">
        <mdc-title typo="headline6">Wie gut kennst du deine Mitspieler?</mdc-title>

        <mdc-list>
          <mdc-list-item v-for="(player, index) in players" :key="player.name">
              <span>{{ player.name }}</span>

              <mdc-chip-set choice>
                <mdc-chip @click.native="setHandicapChoice(index,0)">😍</mdc-chip>
                <mdc-chip @click.native="setHandicapChoice(index,1)">😎</mdc-chip>
                <mdc-chip @click.native="setHandicapChoice(index,2)">😨</mdc-chip>
              </mdc-chip-set>
          </mdc-list-item>
        </mdc-list>
        <mdc-text typo="body1">Total Handicap-Punkte: {{ handicapPoints }}</mdc-text>
        <mdc-button raised class="mt-2" @click="submitHandicap">OK</mdc-button>
      </template>
      <template v-else>
        <mdc-title typo="headline6">Vielen Dank! Warte, bis deine anderen Mitspieler geantwortet haben.</mdc-title>
      </template>
    </mdc-layout-cell>
  </mdc-layout-grid>
</template>

<script>
export default {
  data () {
    return {
      handicapChoices: [],
      handicapPoints: 0,
      submitted: false
    }
  },
  computed: {
    players () {
      let players = this.$store.state.room.players
      let thisPlayer = players[this.$store.state.playerId]

      return players.filter(player => player !== thisPlayer) // Filter out current Player
    }
  },
  methods: {
    submitHandicap () {
      this.$socket.emit('submitHandicap', {
        roomId: this.$store.state.roomId,
        playerId: this.$store.state.playerId,
        handicapPoints: this.handicapPoints
      })

      this.submitted = true
    },
    setHandicapChoice(index, value) {
      this.handicapChoices[index] = value
      this.handicapPoints = this.handicapChoices.reduce((a,b) => a + b, 0)
    }
  }
}
</script>

<style lang="scss">
.mdc-button {
  width: 100%;
}

.mdc-list-item {
  padding: 0;
}

.mdc-chip-set {
  flex-grow: 1;
  justify-content: flex-end;
}

.mdc-chip__text {
  font-size: 1.5rem;
}
</style>

