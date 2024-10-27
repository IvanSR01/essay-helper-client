'use client'

import { FC, useState } from 'react'
import styles from './Search.module.scss'
import Input from '@/shared/ui/input/Input'
import Select from '@/shared/ui/select/Select'
import { IoIosArrowDown } from 'react-icons/io'
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { Work } from '@/shared/intreface/work.interface'
import { Author } from '@/shared/intreface/author.interface'
import { Filters } from '@/screens/home/Home'

interface Props {
	authors: Author[]
	works: Work[]
	genres: string[]
	setFilters: (data: Filters) => void
	filters: Filters
}

const Search: FC<Props> = ({ authors, works, setFilters, filters }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	console.log(filters)
	return (
		<div className={styles.search}>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
						className={styles.selects}
					>
						<motion.div className={styles.selectContainer}>
							<Select
								options={authors.map((author, i) => ({
									value: `${i + 1}`,
									label: author.fullName,
								}))}
								placeholder="Выберите Автора"
								setData={(data) =>
									setFilters({ ...filters, author: data[0]?.label || '' })
								}
							/>
							<Select
								options={works.map((work, i) => ({
									value: `${i + 1}`,
									label: work.title,
								}))}
								placeholder="Выберите Произведение"
								setData={(data) =>
									setFilters({ ...filters, work: data[0]?.label || '' })
								}
							/>
						</motion.div>
						<Input
							value={filters.search || ''}  // Ensure default empty string value
							onChange={(e: { target: { value: any } }) => setFilters({ ...filters, search: e.target.value })}
							placeholder="Поиск по темам..."
						/>
					</motion.div>
				)}
			</AnimatePresence>
			<button onClick={() => setIsOpen(!isOpen)} className={styles.button}>
				<p>фильтры</p>
				<IoIosArrowDown
					className={clsx({
						[styles.rotate]: isOpen,
					})}
				/>
			</button>
		</div>
	)
}

export default Search
