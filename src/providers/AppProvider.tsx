import { FC, PropsWithChildren } from 'react'
import QueryProvider from './QueryProvider'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<QueryProvider>{children}</QueryProvider>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme={'light'}
			/>
		</>
	)
}
export default AppProvider
