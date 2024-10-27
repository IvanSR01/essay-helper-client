/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client'
import { FC, useState } from 'react'
import styles from './Select.module.scss'
import ContentModal from '../content-modal/ContentModal'

interface Option {
	value: string
	label: string
}

interface SelectProps {
	options: Option[]
	multiple?: boolean
	placeholder?: string
	setData?: (data: any) => void
}

const Select: FC<SelectProps> = ({
	options,
	multiple = false,
	placeholder = 'Выберите...',
	setData,
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedOptions, setSelectedOptions] = useState<Option[]>([])
	const [searchTerm, setSearchTerm] = useState('')

	const toggleOpen = () => setIsOpen(!isOpen)

	const handleSelectOption = (option: Option) => {
		if (multiple) {
			// Обновление для множественного выбора
			const isSelected = selectedOptions.some(
				(selected) => selected.value === option.value
			)
			setSelectedOptions((prev) =>
				isSelected
					? prev.filter((selected) => selected.value !== option.value)
					: [...prev, option]
			)
			setData &&
				setData(
					isSelected
						? selectedOptions.filter(
								(selected) => selected.value !== option.value
						  )
						: [...selectedOptions, option]
				)
		} else {
			// Обновление для одиночного выбора
			setSelectedOptions([option])
			setIsOpen(false)
			setData && setData([option])
		}
	}

	const filteredOptions = options.filter((option) =>
		option.label.toLowerCase().includes(searchTerm.toLowerCase())
	)

	return (
		<div className={styles.selectContainer}>
			<div className={styles.select} onClick={toggleOpen}>
				{selectedOptions.length > 0
					? selectedOptions.map((option) => option.label).join(', ')
					: placeholder}
			</div>
			<ContentModal showModal={isOpen} setShowModal={setIsOpen}>
				<div className={styles.dropdown}>
					<input
						type="text"
						placeholder="Поиск..."
						className={styles.search}
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<div className={styles.options}>
						{filteredOptions.map((option) => (
							<div
								key={option.value}
								className={`${styles.option} ${
									selectedOptions.some(
										(selected) => selected.value === option.value
									)
										? styles.selected
										: ''
								}`}
								onClick={() => handleSelectOption(option)}
							>
								{option.label}
							</div>
						))}
					</div>
				</div>
			</ContentModal>
		</div>
	)
}

export default Select
