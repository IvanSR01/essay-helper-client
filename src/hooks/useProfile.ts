import userService from '@/services/user-service/user.service'
import { User } from '@/shared/intreface/user.interface'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export const useProfile = (): {
	user: User
} => {
	const { data: user } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.profile(),
	})

	return useMemo(
		() => ({ user: user as User }),
		[user]
	)
}
