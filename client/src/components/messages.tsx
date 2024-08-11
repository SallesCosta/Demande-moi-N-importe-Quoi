import { useParams } from "react-router-dom"
import { RotateCcw } from "lucide-react"
import { Message } from "./message"

import { useGetMessages } from "../hooks/useGetMessages.ts"
import { useMessagesWebSockets } from "../hooks/use-messages-web-sockets"

export function Messages() {
  const { roomId } = useParams()

  if (!roomId) {
    throw new Error('Messages components must be used within room page')
  }

 const { data,  isError, isEmpty, retry } = useGetMessages()

  useMessagesWebSockets({ roomId })

  const sortedMessages = data && data.sort((a, b) => {
    return b.amountOfReactions - a.amountOfReactions
  })

  if (isError) {
    return <div>
      <span>
        Oops, il y a eu un problème.
      </span>
      <button
        type="submit"
        onClick={retry}
        className="ml-auto bg-zinc-800 text-zinc-300 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm transition-colors hover:bg-zinc-700"
      >
        Reéssayer
        <RotateCcw className="size-4"/>
      </button>
    </div>
  }

  if (isEmpty) {
    return <p>Vide composant...</p>
  }

  return (
    <ol className="list-decimal list-outside px-3 space-y-8">
      {sortedMessages?.map(message => {
        return (
          <Message
            key={message.id}
            id={message.id}
            text={message.text}
            amountOfReactions={message.amountOfReactions}
            answered={message.answered}
          />
        )
      })}
    </ol>
  )
}
