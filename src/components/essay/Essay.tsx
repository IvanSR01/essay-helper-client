import { FC } from 'react'
import styles from './Essay.module.scss'
import { Essay as PropsEssay } from '@/shared/intreface/essay.interface'
import parse from 'html-react-parser'
import Link from 'next/link'

const Essay: FC<PropsEssay> = ({ topic, works, type, text, id }) => {
	return (
		<div className={styles.essay}>
			{/* Тема эссе */}
			<div className={styles.topic}>{topic.name}</div>

			{/* Список произведений */}
			<div className={styles.works}>
				{works.map((work) => (
					<div key={work.id} className={styles.work}>
						<div className={styles.title}>{work.title}</div>
						<div className={styles.info}>
							<div>Автор: {work.author.fullName}</div>
							<div className={styles.genres}>
								Жанры: {work.genres.join(', ')}
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Тип эссе */}
			<div className={styles.type}>{type}</div>

			{/* Основной текст эссе */}
			<Link href={`/essay/${id}`}>
				<div className={styles.text}>{parse(text)}</div>
			</Link>
		</div>
	)
}

export default Essay
