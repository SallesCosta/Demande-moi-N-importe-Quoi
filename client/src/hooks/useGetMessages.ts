import { useCallback } from "react"
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from "react-router-dom"
import {getRoomMessages} from "../http/get-room-messages.ts"

export const useGetMessages = () => {

  const { roomId:  id } = useParams()

  const roomId = (id as string) || ''

  const { data, isLoading, isError, refetch } = useSuspenseQuery({
    queryKey: ['messages', roomId],
    queryFn: () => getRoomMessages({ roomId }),
    select: (data) => data.messages
  })
  const isEmpty = !isLoading && !isError && data?.length === 0

  const retry = useCallback(() => {
    if (isError) refetch()
  }, [isError, refetch])

  return { data, isLoading, isError, isEmpty, retry }
}
