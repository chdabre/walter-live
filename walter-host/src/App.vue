<template>
  <div id="app">
    <template v-if="room">
      <template v-if="room.game">
        <transition name="component-slide" mode="out-in">
          <Component :is="room.game.hostView"/>
        </transition>
        <audio ref="bgAudio" src="/audio/bg-music.mp3" autoplay loop/>
        <audio ref="stingAudio"/>
      </template>
    </template>
    <template v-else>
      <div v-if="!error">
        <mdc-linear-progress class="m-top-5" indeterminate></mdc-linear-progress>
      </div>
      <mdc-layout-grid class="nocontent grid-padding">
        <mdc-layout-cell>
          <img class="logo" src="./assets/logo.png" />
          <mdc-headline v-if="error" class="m-top-5">{{ error }}</mdc-headline>
        </mdc-layout-cell>
      </mdc-layout-grid>
    </template>
  </div>
</template>

<script>
import { EventBus } from '@/event-bus'

import Home from './views/Home.vue'

export default {
  data () {
    return {
      error: false,
      stingSource: ''
    }
  },
  components: {
    Home,

    ScoreBoard: () => import(/* webpackChunkName: "named-views" */ './views/ScoreBoard.vue'),
    RoundStart: () => import(/* webpackChunkName: "named-views" */ './views/RoundStart.vue'),
    ShowCues: () => import(/* webpackChunkName: "named-views" */ './views/ShowCues.vue'),
    ShowAnswers: () => import(/* webpackChunkName: "named-views" */ './views/ShowAnswers.vue'),
    ShowResults: () => import(/* webpackChunkName: "named-views" */ './views/ShowResults.vue')
  },
  computed: {
    room () {
      return this.$store.state.room
    }
  },
  sockets: {
    connect () {
      console.log('[init] Sending init packet...')
      this.$socket.emit('init', {
        createRoom: true,
        role: 'host'
      })
    },
    roomUpdate (msg) {
      console.log(`[${msg.context}] Room Update`)
      this.$store.commit('roomUpdate', msg.room)
    },
    roomId (msg) {
      console.log(`[${msg.context}] Room ID Received`)
      this.$store.commit('roomId', msg.roomId)
    }
  },
  created () {
    EventBus.$on('play-sting', this.playSting)
  },
  methods: {
    playSting (name) {
      this.$refs.bgAudio.muted = true
      this.$refs.stingAudio.src = `/audio/${name}.mp3`
      this.$refs.stingAudio.play()
      this.$refs.stingAudio.addEventListener('ended', () => {
        this.$refs.bgAudio.muted = false
      })
    }
  }
}
</script>

<style lang="scss">
// eslint-disable-next-line
@import './styles/theme';

body {
  overflow: hidden;
}
b {
  font-weight: bold;
}

#app {
  position: fixed;
  top: 0;
  bottom: 0;
}

.content {
  display: flex;
  height: 100%;
}

.mdc-layout-grid {
  margin: 0;
  padding: 0;

  &--100 {
    height: 100%;
  }

  &__inner {
    height: 100%;
  }

  &__cell{
    display: flex;
    flex-direction: column;
  }
}

.grid-padding {
  padding: 16px 64px 128px 64px;
}

.logo {
  width: 100%;
  margin-top: 4rem;
}

.progress {
  width: 100%;
  position: absolute;
  bottom: 0;
}

.component-slide-enter-active, .component-slide-leave-active {
  transition: transform .5s ease;
}
.component-slide-enter {
  transform: translateX(100vw)
}

.component-slide-enter-to, .component-slide-leave  {
  transform: translateX(0)
}

.component-slide-leave-to {
  transform: translateX(-100vw)
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
