<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue";
import EntryEditor from "./components/EntryEditor.vue";
import EntryCard from "@/components/EntryCard.vue";

import { reactive, provide, inject } from "vue";

// an injection key interface, that is a generic type that extends Symbol
// this can be used to sink an injected value across the provider and the consumer
// import type { InjectionKey } from "vue";
// this got moved to injectionKey.ts

// we include the word type after the import keyword
// it helps the compiler to be as aggressive as possible and never emit import into js
import type User from "@/types/User";
// vscode did it this way: import Emoji from "./types/Emoji";
// import type Emoji from "@/types/Emoji";
import type Entry from "@/types/Entry";

import { userInjectionKey } from "./injectionKeys";


const entries: Entry[] = reactive([]);

// the first step is to create a Symbol to ensure the injection key is unique
// then we can use type assertion to cast it as an injection key with the argument of our user interface
// const userInjectionKey = Symbol() as InjectionKey<User>;
// this got moved to injectionKey.ts

const user: User = reactive({
  id: 1,
  username: "John Doe",
  settings: []
});

// lastly we'll use the provide function to expose our user to all the child components
// of App.vue under the userInjectionKey
provide(userInjectionKey, user)


// in child component
// now from absolutely any child component of App.vue
// we could call inject along with the key and access our user
// const injectedUser = inject(userInjectionKey);
// lets move this line to any child component of App.vue



console.log('user:', user);

// we know that our entry is going to be an object literal with text and emoji
// but the object literal is getting annoying and messy - perfect time to create a new interface for a journal entry
// const handleCreateEntry = (entry: { text: string; emoji: Emoji | null }) => {
//   console.log('entry:', entry);
// }

const handleCreateEntry = (entry: Entry) => {
  entries.unshift(entry);
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
      <li v-for="entry in entries" :key="entry.id">
        <EntryCard :entry="entry"/>
      </li>
    </ul>
  </main>
</template>
