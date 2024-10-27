import { accessApi, defaultApi } from '@/$api/axios.api'
import { Topic } from '@/shared/intreface/topic.interface'

class TopicService {
	async getTopics(): Promise<Topic[]> {
		return (await defaultApi.get('/topic')).data
	}

	async getTopic(id: number): Promise<Topic> {
		return (await defaultApi.get(`/topic/${id}`)).data
	}

	async createTopic(topic: string): Promise<Topic> {
		return (
			await accessApi({
				method: 'POST',
				url: '/topic/create',
				data: {
					name: topic,
				},
			})
		).data
	}
}

export default new TopicService()
