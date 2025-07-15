<script lang="ts" setup>
import UseEmojis from "@/composables/UseEmojis";

import { inject } from "vue";
import { userInjectionKey } from "@/injectionKeys";

const { emojis } = UseEmojis();

const injectedUser = inject(userInjectionKey);

defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="emoji-container">
    <!-- {{ injectedUser?.username }} -->
    <component
      v-for="emoji in emojis"
      :is="emoji.component"
      :key="emoji.name"
      :class="{ selected: modelValue === emoji.name }"
      @click="
        $emit(
          'update:modelValue',
          emoji.name === modelValue ? null : emoji.name
        )
      "
    ></component>
  </div>
</template>
