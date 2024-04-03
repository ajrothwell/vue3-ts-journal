// vscode did it this way: import Emoji from "./Emoji";
import type Emoji from "./Emoji";

export default interface Entry {
  id: number;
  body: string;
  emoji: Emoji | null;
  createdAt: Date;
  userId: number;
}