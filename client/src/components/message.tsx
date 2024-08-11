import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { createMessageReaction } from "../http/create-message-reaction";
import { toast } from "sonner";
import { removeMessageReaction } from "../http/remove-message-reaction";

interface MessageProps {
  id: string
  text: string
  amountOfReactions: number
  answered?: boolean
}

export function Message({ 
  id: messageId, 
  text, 
  amountOfReactions, 
  answered = false,
}: MessageProps) {
  const { roomId } = useParams()
  const [hasReacted, setHasReacted] = useState(false)

  if (!roomId) {
    throw new Error('Messages components must be used within room page')
  }

  async function createMessageReactionAction() {
    if (!roomId) {
      return
    }

    try {
      await createMessageReaction({ messageId, roomId })
    } catch {
      toast.error('Échec de la reaction au message, veuillez réessayer!')
    }

    setHasReacted(true)
  }

  async function removeMessageReactionAction() {
    if (!roomId) {
      return
    }

    try {
      await removeMessageReaction({ messageId, roomId })
    } catch {
      toast.error('Échec de la suppression de la reaction au message, veuillez réessayer!')
    }

    setHasReacted(false)
  }

  const reactionFuncion = hasReacted ? createMessageReactionAction  : removeMessageReactionAction

  return (
    <li data-answered={answered} className="ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none">
      {text}

        <button 
          data-hasReacted={hasReacted}
          type="button" 
          onClick={reactionFuncion} 
          className="
            mt-3
            flex 
            items-center 
            gap-2 
            text-sm 
            font-medium 
            data-[hasReacted=true]:text-orange-400
            data-[hasReacted=true]:hover:text-orange-500

            data-[hasReacted=false]:text-zinc-400
            data-[hasReacted=false]:hover:text-zinc-500
         "
        >
          <ArrowUp className="size-4" />
          Aimer ({amountOfReactions})
        </button>
   </li>
  )
}
