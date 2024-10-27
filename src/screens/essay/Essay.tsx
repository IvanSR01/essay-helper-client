import { FC } from 'react'
import styles from './Essay.module.scss'
import { Essay } from '@/shared/intreface/essay.interface'
import Layout from '@/components/layout/Layout'
import parse from 'html-react-parser'
interface Props {
	essay: Essay
}

const EssayPage: FC<Props> = ({ essay }) => {
	return (
		<Layout>
			<div className={styles.wrapper}>
				<div className={styles.essay}>
					{/* Тема эссе */}
					<div className={styles.topic}>{essay.topic.name}</div>

					{/* Список произведений */}
					<div className={styles.works}>
						{essay.works.map((work) => (
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

					<div className={styles.type}>{essay.type}</div>

						<div className={styles.text}>{parse(essay.text)}</div>
				</div>
			</div>
		</Layout>
	)
}
export default EssayPage
