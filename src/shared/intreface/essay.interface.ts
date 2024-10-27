import { Topic } from "./topic.interface"
import { Work } from "./work.interface"

export interface Essay {
	id: number
	type: string
	text: string
	topic: Topic
	works: Work[]
}


