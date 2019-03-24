/* 
Event Bus inspired by https://alligator.io/vuejs/global-event-bus/

// Emitting Events
import { EventBus } from '@/event-bus'
EventBus.$emit('i-got-clicked', this.clickCount)

// Receiving Events
import { EventBus } from '@/event-bus'

// The event handler function.
const clickHandler = function(clickCount) {
  console.log(`Oh, that's nice. It's gotten ${clickCount} clicks! :)`)
}

// Listen to the event.
EventBus.$on('i-got-clicked', clickHandler);

// Stop listening.
EventBus.$off('i-got-clicked', clickHandler);
*/

import Vue from 'vue'
export const EventBus = new Vue()