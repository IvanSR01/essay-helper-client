import { accessApi, defaultApi } from '@/$api/axios.api'

class AuthorService {
	async getAuthors() {
		return (await defaultApi.get('/author')).data
	}
	async createAuthor(fullName: string) {
		return (
			await accessApi({
				method: 'POST',
				url: '/author/create',
				data: {
					fullName,
				},
			})
		).data
	}
}

export default new AuthorService()
