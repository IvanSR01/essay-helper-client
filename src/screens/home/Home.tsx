'use client'
import { FC, useState, useMemo } from 'react'
import styles from './Home.module.scss'
import Layout from '@/components/layout/Layout'
import Search from '@/components/search/Search'
import Essay from '@/components/essay/Essay'
import { Essay as EssayType } from '@/shared/intreface/essay.interface'
import { useQuery } from '@tanstack/react-query'
import essayService from '@/services/essay-service/essay.service'
import { Work } from '@/shared/intreface/work.interface'
import { Author } from '@/shared/intreface/author.interface'

interface Props {
	essays: EssayType[]
	authors: Author[]
	works: Work[]
	genres: string[]
}

export type Filters = {
	author?: string
	work?: string
	genres?: string[]
	search?: string
}

const Home: FC<Props> = ({ essays, authors, works, genres }) => {
	const [filters, setFilters] = useState<Filters>({})

	const { data: fetchedEssays } = useQuery({
		queryKey: ['essays', filters.author, filters.work],
		queryFn: () =>
			essayService.getEssays({
				authorName: filters.author,
				workName: filters.work,
				type: filters.genres?.join(','),
			}),
		initialData: essays,
	})

	const filteredEssays = useMemo(() => {
		return (
			fetchedEssays?.filter((item) =>
				item.topic.name
					.toLowerCase()
					.includes(filters.search?.toLowerCase() || '')
			) || []
		)
	}, [fetchedEssays, filters.search])

	return (
		<Layout>
			<div className={styles.wrapper}>
				<Search
					authors={authors}
					works={works}
					genres={genres}
					filters={filters}
					setFilters={setFilters}
				/>
				<div className={styles.items}>
					{filteredEssays.length ? (
						filteredEssays.map((item) => <Essay {...item} key={item.id} />)
					) : (
						<>Сочинений нет</>
					)}
				</div>
			</div>
		</Layout>
	)
}

export default Home
