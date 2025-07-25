<script lang="ts" setup>
import EmojiField from "@/components/EmojiField.vue";
import ArrowCircleRight from "@/assets/icons/arrow-circle-right.svg";

import type Emoji from "@/types/Emoji";

import { ref, computed, onMounted, inject } from "vue";
// import capital R Ref from vue
import type { Ref } from "vue";

import type Entry from "@/types/Entry";

import { userInjectionKey } from "@/injectionKeys";


// data
const body = ref("");

// these 2 do the same thing
const emoji1: Ref<Emoji | null> = ref(null);
const emoji = ref<Emoji | null>(null);

// emoji.value = "something else";

// the < > mean that we're using type assertion
const charCount = computed(() => body.value.length);
// const charCount = computed<number>(() => text.value.length);
const maxChars = 280;

const user = inject(userInjectionKey);

// template refs
// to correctly "type" the textarea variable, we use an explicit
// generic type argument - HTMLTextAreaElement
const textarea = ref<HTMLTextAreaElement | null>(null);
// the null is necessary as the TextAreaElement won't exist until
// the component is mounted to the DOM
onMounted(() => {
  textarea.value?.focus();
});


// events
// defineEmits is a macro (or a runtime declaration)
// it doesn't run in the browser
// it is tranformed by the compiler at build time to code that does run in the browser
// defineEmits(["@create"]);
// it compiles to the emits option that we'd use if we weren't using script setup:

// what does defining it really do for us?  See in App.vue

// export default {
//  emits: ["create"], 
// }


//instead of using a runtime declaration, we can use a type-based one
// the < > mean that we're using type assertion
// the { } mean we're passing a type literal as the type argument
// within the literal we're passing a call signature to define the event name called "e"
// and then the event payload which we can give an arbitrary name like "entry"
// defineEmits<{
//   (e: "@create", entry: { text: string; emoji: Emoji | null }): void;
//   // (e: "@someOtherEvent", payload: string): void;
// }>();

// defineEmits<{
//   (e: "@create", entry: Entry): void;
// }>();
const emit = defineEmits<{
  (e: "@create", entry: Entry): void;
}>();


// methods - this method is an event handler
const handleTextInput = (e: Event) => {
  // cast DOM event target to a specific element type
  const textarea = e.target as HTMLTextAreaElement;
  // console.log('e:', e, 'textarea:', textarea.value);
  if(textarea.value.length <= maxChars) {
    body.value = textarea.value;
  } else {
    body.value = textarea.value = textarea.value.substring(0, maxChars);
  }
}

const handleSubmit = () => {
  emit('@create', {
    body: body.value,
    emoji: emoji.value,
    createdAt: new Date(),
    userId: 1,
    id: Math.random(),
  });

  body.value = "";
  emoji.value = null;
};

</script>
<template>
  <form
    class="entry-form"
    @submit.prevent="handleSubmit"
  >
  <!-- @submit.prevent="$emit('@create', {
    body,
    emoji,
    createdAt: new Date(),
    userId: 1,
    id: Math.random(),
  })" -->
    <textarea
      :value="body"
      ref="textarea"
      @keyup="handleTextInput"
      :placeholder="`New Journal Entry for ${user.username || 'anonymous'}`"
    ></textarea>
    <EmojiField v-model="emoji" />
    <div class="entry-form-footer">
      <span>{{ charCount }} / {{ maxChars }}</span>
      <button>Remember <ArrowCircleRight width="20" /></button>
    </div>
  </form>
</template>
