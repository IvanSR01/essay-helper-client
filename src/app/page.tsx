import Home from '@/screens/home/Home'
import authorService from '@/services/author-service/author.service'
import essayService from '@/services/essay-service/essay.service'
import workService from '@/services/work-service/work.service'

export default async function page() {
	try {
		const [essays, authors, works, genres] = await Promise.all([
			essayService.getEssays(),
			authorService.getAuthors(),
			workService.getWorks(),
			workService.getGenres(),
		])

		return (
			<Home essays={essays} authors={authors} works={works} genres={genres} />
		)
	} catch (error) {
		console.error(error)
		return <Home essays={[]} authors={[]} works={[]} genres={[]} />
	}
}
