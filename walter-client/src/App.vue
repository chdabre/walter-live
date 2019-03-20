<template>
  <div id="app">
    <template v-if="clientId !== null">
      <template v-if="playerId === null">
        <ClientOnboarding />
      </template>
      <template v-else-if="room && room.game">
        <Component :is="room.game.clientView"/>
      </template>
    </template>
    <template v-else>
      <mdc-layout-grid class="nocontent">
        <mdc-layout-cell>
          <img class="logo" src="./assets/logo.png" />

          <mdc-headline v-if="error" class="m-top-5">{{ error }}</mdc-headline>
          <div v-else> 
            <mdc-linear-progress class="m-top-5" indeterminate></mdc-linear-progress>
          </div>
        </mdc-layout-cell>
      </mdc-layout-grid>
    </template>
  </div>
</template>

<script>
import ClientOnboarding from './views/ClientOnboarding'

export default {
  components: {
    ClientOnboarding,

    WaitForPlayers: () => import(/* webpackChunkName: "named-views" */ './namedViews/WaitForPlayers.vue'),
    SubmitHandicap: () => import(/* webpackChunkName: "named-views" */ './namedViews/SubmitHandicap.vue'),
    NoContent: () => import(/* webpackChunkName: "named-views" */ './namedViews/NoContent.vue'),
    SubmitAnswers: () => import(/* webpackChunkName: "named-views" */ './namedViews/SubmitAnswers.vue'),
    SubmitVotes: () => import(/* webpackChunkName: "named-views" */ './namedViews/SubmitVotes.vue')
  },
  data () {
    return {
      error: null
    }
  },
  computed: {
    clientId () {
      return this.$store.state.clientId
    },
    playerId () {
      return this.$store.state.playerId
    },
    room () {
      return this.$store.state.room
    }
  },
  sockets: {
    connect () {
      console.log('[init] Sending init packet...')
      this.$socket.emit('init', {
        roomId: this.$store.state.roomId,
        playerId: this.$store.state.roomId,
        role: 'client'
      })
    },
    clientId (msg) {
      this.$store.commit('clientId', msg.clientId)
    },
    roomUpdate (msg) {
      console.log(`[${msg.context}] Room Update`)
      this.$store.commit('roomUpdate', msg.room)
    },
    err (msg) {
      this.error = msg.errorText
    }
  }
}
</script>

<style lang="scss">
@import './styles/variables';
@import './styles/theme';

.content {
  margin: 2rem 1rem;
}

.logo {
  width: 100%;
}

.walter {
  background-color: black;
  color: white;
  font-style: normal;
  font-weight: 600;
  padding: 0 .3em;
  margin: 0 .1em; 
}
</style>
