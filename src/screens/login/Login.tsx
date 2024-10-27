/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { FC, useState } from 'react'
import styles from './Login.module.scss'
import Input from '@/shared/ui/input/Input'
import Button from '@/shared/ui/button/Button'
import { useMutation } from '@tanstack/react-query'
import authService from '@/services/auth-service/auth.service'
import { toast } from 'react-toastify'
import { useError } from '@/hooks/useError'
import { useRouter } from 'next/navigation'

const Login: FC = () => {
	const {push} = useRouter()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { mutate } = useMutation({
		mutationFn: () => authService.login({ email, password }),
		onSuccess: () => push('/'),
		onError: (error) => {
			console.log(error)
			toast.error(useError(error))
		},
	})
	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<h3>Вход</h3>
				<Input
					value={email}
					onChange={(e: any) => setEmail(e.target.value)}
					placeholder="Email"
				/>
				<Input
					value={password}
					onChange={(e: any) => setPassword(e.target.value)}
					placeholder="Пароль"
				/>
				<Button onClick={() => mutate()}>Вход</Button>
			</div>
		</div>
	)
}
export default Login
