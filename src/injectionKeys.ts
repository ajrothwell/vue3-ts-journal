// an injection key interface, that is a generic type that extends Symbol
// this can be used to sink an injected value across the provider and the consumer
import type { InjectionKey } from "vue";

// import the User interface
import type User from "@/types/User";


// the first step is to create a Symbol to ensure the injection key is unique
// then we can use type assertion to cast it as an injection key with the argument of our user interface
export const userInjectionKey = Symbol() as InjectionKey<User>;