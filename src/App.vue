<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue";
import EntryEditor from "./components/EntryEditor.vue";
import EntryCard from "@/components/EntryCard.vue";

import { reactive } from "vue";

// we include the word type after the import keyword
// it helps the compiler to be as aggressive as possible and never emit import into js
import type User from "@/types/User";
// vscode did it this way: import Emoji from "./types/Emoji";
// import type Emoji from "@/types/Emoji";
import type Entry from "@/types/Entry";

const user: User = reactive({
  id: 1,
  username: "John Doe",
  settings: []
});

console.log('user:', user);

// we know that our entry is going to be an object literal with text and emoji
// but the object literal is getting annoying and messy - perfect time to create a new interface for a journal entry
// const handleCreateEntry = (entry: { text: string; emoji: Emoji | null }) => {
//   console.log('entry:', entry);
// }

const handleCreateEntry = (entry: Entry) => {
  console.log(entry);
}

</script>

<template>
  <main class="container m-auto p-10">
    <TheHeader />
    <!-- in the handler, we can access the event with the $event keyword -->
    <!-- <EntryEditor @@create="$event."/> -->
    <EntryEditor @@create="handleCreateEntry"/>
    <ul>
      <li>
        <EntryCard />
      </li>
    </ul>
  </main>
</template>
