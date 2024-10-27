import { accessApi, defaultApi } from '@/$api/axios.api'

class WorkService {
	async getGenres() {
		return (await defaultApi.get('/work/genres')).data
	}

	async getWorks() {
		return (await defaultApi.get('/work')).data
	}

	async createWork(work: {
		title: string
		authorId: number
		genres: string[]
	}) {
		console.log(work)
		return (
			await accessApi({
				method: 'POST',
				url: '/work/create',
				data: { ...work },
			})
		).data
	}

}

export default new WorkService()
