<script lang="ts" setup>
import DateDisplay from "./DateDisplay.vue";
import UseEmojis from "@/composables/UseEmojis";

import type Entry from "@/types/Entry";
import { userInjectionKey } from "@/injectionKeys";
import { inject } from "vue";

const user = inject(userInjectionKey);

const { findEmoji } = UseEmojis();

// this is an attempt to use a runtime decalaration
// the typescript language Entry is not a runtime concept
// using a typescript interface with a runtime declaration isn't going to work
// const props = defineProps({
//   entry: { type: Entry },
//   randomProp: { type: String }
// })

// we also could have defined the props as a separate interface
// interface Props{
//   entry: Entry;
//   randomProp: string;
// }
// const props = defineProps<Props>();
// note, if you do that, the definition of the interface must be
// in the same file as the defineProps call

// instead, use the type based declaration for props
// defineProps<{
//   entry: Entry;
//   randomProp?: string;
// }>();

// THIS PART IS OUTDATED
// you lose ability to assign defaults, but there is a workaround
// const { entry, randomProp = "default value" } = defineProps<{
//   entry: Entry;
//   randomProp: string;
// }>();

// THIS PART IS THE UPDATE
const props = withDefaults(defineProps<{
  entry: Entry;
  randomProp?: string;
}>(), {
  randomProp: 'default value'
});


</script>



<template>
  <div class="entry-card">
    <div class="entry-card-body">
      <component width="75" :is="findEmoji(entry.emoji)"></component>
      <div class="entry-text">{{ entry.body }}</div>
    </div>
    <div class="entry-footer">
      <DateDisplay :date="entry.createdAt" class="mr-2" />
      |
      <span class="ml-2">{{ user?.username || 'anonymous' }}</span>
    </div>
  </div>
</template>
