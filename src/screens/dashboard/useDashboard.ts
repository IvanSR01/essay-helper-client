/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useError } from '@/hooks/useError';
import { queryClient } from '@/providers/QueryProvider';
import authorService from '@/services/author-service/author.service';
import essayService from '@/services/essay-service/essay.service';
import topicService from '@/services/topic-service/topic.service';
import workService from '@/services/work-service/work.service';
import { toast } from 'react-toastify';

export default function useDashboard() {

	const createAuthor = async (fullName: string) => {
		try {
			await authorService.createAuthor(fullName);
			queryClient.refetchQueries({ queryKey: ['authors'] });
			toast.success('Автор успешно создан');
		} catch (error) {
			toast.error(useError(error));
		}
	};

	const createTopic = async (topic: string) => {
		try {
			await topicService.createTopic(topic);
			queryClient.refetchQueries({ queryKey: ['topics'] });
			toast.success('Тема успешно создана');
		} catch (error) {
			toast.error(useError(error));
		}
	};

	const createWork = async (work: { title: string; authorId: number; genres: string[] }) => {
		try {
			await workService.createWork(work);
			queryClient.refetchQueries({ queryKey: ['works'] });
			toast.success('Работа успешно создана');
		} catch (error) {
			toast.error(useError(error));
		}
	};

	const createEssay = async (text: any) => {
		try {
			await essayService.createEssay(text);
			queryClient.refetchQueries({ queryKey: ['essays'] });
			toast.success('Эссе успешно создано');
		} catch (error) {
			toast.error(useError(error));
		}
	};

	return { createAuthor, createTopic, createWork, createEssay };
}
