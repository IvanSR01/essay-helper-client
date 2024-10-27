import { FC, PropsWithChildren } from 'react'
import styles from './Layout.module.scss'
import Header from '../header/Header'
import Wrapper from '../wrapper/Wrapper'
const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className={styles.layout}>
			<Header />
			<Wrapper>
				{children}
			</Wrapper>
		</div>
	)
}
export default Layout
