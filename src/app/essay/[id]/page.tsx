import EssayPage from '@/screens/essay/Essay';
import essayService from '@/services/essay-service/essay.service';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params; // получаем id напрямую
	const data = await essayService.getById(+id); // получаем данные по id
	return <EssayPage essay={data} />;
};

export default page;
