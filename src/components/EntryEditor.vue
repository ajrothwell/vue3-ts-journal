<script lang="ts" setup>
import EmojiField from "@/components/EmojiField.vue";
import ArrowCircleRight from "@/assets/icons/arrow-circle-right.svg";

import type Emoji from "@/types/Emoji";

import { ref, computed } from "vue";
// import type { Ref } from "vue";

const text = ref("");
const emoji = ref<Emoji | null>(null);

const charCount = computed(() => text.value.length);

</script>
<template>
  <form class="entry-form" @submit.prevent>
    <textarea
      v-model="text"
      placeholder="New Journal Entry for danielkelly_io"
    ></textarea>
    <EmojiField v-model="emoji" />
    <div class="entry-form-footer">
      <span>{{ charCount }} / 280</span>
      <button>Remember <ArrowCircleRight width="20" /></button>
    </div>
  </form>
</template>
