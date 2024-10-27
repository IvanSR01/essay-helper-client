'use client'
import { FC } from 'react'
import styles from './Header.module.scss'
import Wrapper from '../wrapper/Wrapper'
import Link from 'next/link'
import { useProfile } from '@/hooks/useProfile'
const Header: FC = () => {
	const { user } = useProfile()
	return (
		<div className={styles.header__layout}>
			<Wrapper>
				<div className={styles.header}>
					<Link href={'/'}>
						<div className={styles.logo}>
							<p>Essay</p>
							<span>helper</span>
						</div>
					</Link>
					{user ? (
						<Link href={'/dashboard'}>Дашбоард</Link>
					) : (
						<Link href={'/auth/login'}>Войти</Link>
					)}
				</div>
			</Wrapper>
		</div>
	)
}
export default Header
