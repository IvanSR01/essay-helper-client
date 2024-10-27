import { accessApi, defaultApi } from '@/$api/axios.api'
import { Essay } from '@/shared/intreface/essay.interface'

export type GetEssaysProps = {
	authorName?: string
	workName?: string
	type?: string
	search?: string
}

class EssayService {
	async getEssays(params?: GetEssaysProps): Promise<Essay[]> {
		const query = new URLSearchParams({
			...(params?.authorName && { author: params.authorName }),
			...(params?.workName && { work: params.workName }),
			...(params?.type && { type: params.type }),
			...(params?.search && { search: params.search }),
		}).toString()

		return (await defaultApi.get<Essay[]>(`/essay?${query}`)).data
	}
	async getById(id: number): Promise<Essay> {
		return (await defaultApi.get<Essay>(`/essay/by-id/${id}`)).data
	}

	async createEssay(essay: {
		type: string
		text: string
		topicId: number
		works: number[]
	}): Promise<Essay> {
		return (
			await accessApi({
				method: 'POST',
				url: '/essay/create',
				data: { ...essay },
			})
		).data
	}
}

export default new EssayService()
