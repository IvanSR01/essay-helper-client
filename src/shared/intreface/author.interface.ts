import { Work } from './work.interface'

export interface Author {
	id: number
	fullName: string
	works: Work[]
}
