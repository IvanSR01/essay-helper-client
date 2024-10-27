import { Essay } from "./essay.interface"
import { Work } from "./work.interface"

export interface Topic {
	id: number
	name: string
	works: Work[]
	essays: Essay[]
}

