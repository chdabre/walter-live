<template>
  <transition-group name="fade" mode="out-in">
    <mdc-layout-grid v-if="room.players.length" class="content home-wrapper grid-padding" key=1>
      <!-- LOGO -->
      <mdc-layout-cell class="logo-column" key=1>
        <img class="logo" src="../assets/logo.png" />
        
        <BwipCode class="qrcode" :scale="5" bcid="qrcode" :text="codeUrl" />
        <span class="m-top-1 roomid">/client/{{ roomId }}</span>
      </mdc-layout-cell>

      <!-- PLAYERS -->
      <mdc-layout-cell desktop=8>
        <mdc-display typo="headline2">Spieler</mdc-display>

        <div class="players-list">
          <div class="players-list-item" v-for="(player, id) in room.players" :key="'player-' + id">
            <div class="number-circle">
              <mdc-display>{{ id + 1 }}</mdc-display>
            </div>

            <mdc-display>{{ player.name }}</mdc-display>
          </div>
          <div v-for="i in 8 - room.players.length" :key="'placeholder-' + i" class="players-list-item players-list-item--placeholder">
            <div class="number-circle"></div>
          </div>
        </div>

        <!-- QR CODE -->
        <div class="qrcode-entry m-top-2">
          <mdc-text typo="headline5" class="d-inline-block m-left-2">QR-Code scannen, um dem Spiel beizutreten.</mdc-text>
        </div>
      </mdc-layout-cell>
    </mdc-layout-grid>

    <div class="startscreen" v-else key=2>
      <img class="logo-sm" src="../assets/logo.png" />
      <BwipCode class="qrcode-big" :scale="5" bcid="qrcode" :text="codeUrl" />
      <p class="text m-top-1 roomid">/client/{{ roomId }}</p>
      <mdc-text typo="headline5" class="text">QR-Code scannen, um dem Spiel beizutreten.</mdc-text>
    </div>
  </transition-group>
</template>

<script>
import BwipCode from '@/components/BwipCode'

export default {
  components: {
    BwipCode
  },
  computed: {
    room () {
      return this.$store.state.room
    },
    roomId () {
      return this.$store.state.roomId
    },
    codeUrl () {
      if (typeof webpackHotUpdate === 'undefined') {
        console.log(`${window.location.href}client/${this.roomId}`)
      } else {
        console.log(`http://localhost:8081/client/${this.roomId}`)
      }
      return `${window.location.href}client/${this.roomId}`
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
.qrcode {
  width: 50%;
  margin-top: auto;
}

.startscreen {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;

  .text {
    text-align: center;
  }
  .logo-sm {
    align-self: center;
    width: 20%;
    margin-top: 2rem;
  }
  .qrcode-big {
    align-self: center;
    width: 40vh;
    margin-top: 4rem;
  }

}

.players-list-item {
  height: 3.5em;

  display: flex;
  align-items: center;

  h1 {
    margin-left: 2rem;
  }

  &--placeholder{
    .number-circle {
      border-color: rgba(0,0,0,.2);
    }
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

.qrcode-entry {
  margin-top: auto;
  p {
    margin: 0;
  }
}

.roomid {
  font-family: 'Roboto Mono', monospace;
  font-size: 1rem;
}
</style>
