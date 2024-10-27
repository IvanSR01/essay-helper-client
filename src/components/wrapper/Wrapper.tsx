import { FC, PropsWithChildren } from 'react'
import styles from './Wrapper.module.scss'

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>{children}</div>
		</div>
	)
}
export default Wrapper
