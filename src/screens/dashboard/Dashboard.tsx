/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Layout from '@/components/layout/Layout'
import authorService from '@/services/author-service/author.service'
import topicService from '@/services/topic-service/topic.service'
import workService from '@/services/work-service/work.service'
import Button from '@/shared/ui/button/Button'
import Input from '@/shared/ui/input/Input'
import Select from '@/shared/ui/select/Select'
import { useQueries } from '@tanstack/react-query'
import { FC, useState } from 'react'
import styles from './Dashboard.module.scss'
import useDashboard from './useDashboard'

const Dashboard: FC = () => {
	const [workTitle, setWorkTitle] = useState('')
	const [authorName, setAuthorName] = useState('')
	const [selectedTopic, setSelectedTopic] = useState<any | null>(null)
	const [selectedWork, setSelectedWork] = useState<any | null>(null)
	const [genres, setGenres] = useState<string>('')
	const [essayText, setEssayText] = useState('')
	const [newTopic, setNewTopic] = useState('')
	const [{ data: works }, { data: topics }, { data: authors }] = useQueries({
		queries: [
			{
				queryKey: ['works'],
				queryFn: () => workService.getWorks(),
			},
			{
				queryKey: ['topics'],
				queryFn: () => topicService.getTopics(),
			},
			{
				queryKey: ['author'],
				queryFn: () => authorService.getAuthors(),
			},
		],
	})
	if (!works || !topics || !authors) return null
	const { createAuthor, createTopic, createWork, createEssay } = useDashboard()
	return (
		<Layout>
			<div className={styles.wrapper}>
				<div className={styles.formSection}>
					<h3>Создать автора</h3>
					<Input
						placeholder="Имя автора"
						value={authorName}
						onChange={(e: any) => setAuthorName(e.target.value)}
					/>
					<Button onClick={() => createAuthor(authorName)}>
						Добавить автора
					</Button>
				</div>
				<div className={styles.formSection}>
					<h3>Создать Книгу</h3>
					<Input
						placeholder="Название книги"
						value={workTitle}
						onChange={(e: any) => setWorkTitle(e.target.value)}
					/>
					<Input
						placeholder="Жанры книги"
						value={genres}
						onChange={(e: any) => setGenres(e.target.value)}
					/>
					<Select
						options={authors.map((author: any) => ({
							value: author.id.toString(),
							label: author.fullName,
						}))}
						placeholder="Выберите Автора"
						setData={(data) => setSelectedWork(data[0])}
					/>
					<Button
						onClick={() =>
							createWork({
								title: workTitle,
								authorId: +selectedWork?.value || 0,
								genres: genres.split(','),
							})
						}
					>
						Добавить книгу
					</Button>
				</div>

				{/* Создание новой темы */}
				<div className={styles.formSection}>
					<h3>Создать Тему</h3>
					<Input
						placeholder="Название темы"
						value={newTopic}
						onChange={(e: any) => setNewTopic(e.target.value)}
					/>
					<Button onClick={() => createTopic(newTopic)}>Добавить тему</Button>
				</div>

				{/* Создание нового сочинения */}
				<div className={styles.formSection}>
					<h3>Создать Сочинение</h3>
					<Select
						options={works.map((work: any) => ({
							value: work.id.toString(),
							label: work.title,
						}))}
						multiple
						placeholder="Выберите книгу"
						setData={(data) => setSelectedWork(data)}
					/>
					<Select
						options={topics.map((topic) => ({
							value: topic.id.toString(),
							label: topic.name,
						}))}
						placeholder="Выберите тему"
						setData={(data) => setSelectedTopic(data[0])}
					/>
					<textarea
						placeholder="Текст сочинения"
						value={essayText}
						onChange={(e) => setEssayText(e.target.value)}
						className={styles.textarea}
					/>
					<Button
						onClick={() =>
							createEssay({
								works:  selectedWork.map((w: any) => +w.value),
								topicId: +selectedTopic?.value || 0,
								text: essayText,
								type: 'Допускное',
							})
						}
					>
						Добавить сочинение
					</Button>
				</div>
			</div>
		</Layout>
	)
}

export default Dashboard
