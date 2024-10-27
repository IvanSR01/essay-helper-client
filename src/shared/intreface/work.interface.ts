
import { Author } from "./author.interface";
import { Essay } from "./essay.interface";
import { Topic } from "./topic.interface";

export interface Work {
  id: number;
  title: string;
  genres: string[];
  topics: Topic[];
  essays: Essay[];
  author: Author;
}
