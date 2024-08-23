import { Spinner, Trash } from "@medusajs/icons"
import { clx } from "@medusajs/ui"
import { useState } from "react"

import { deleteLineItem } from "@modules/cart/actions"

const DeleteButton = ({
  id,
  children,
  className,
}: {
  id: string
  children?: React.ReactNode
  className?: string
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (id: string) => {
    setIsDeleting(true)
    await deleteLineItem(id).catch((err) => {
      setIsDeleting(false)
    })
  }

  return (
    <div
      className={clx(
        "flex items-center justify-between text-small-regular",
        className
      )}
    >
      <button
        className="flex gap-x-1 text-pastel-pink hover:text-primary-green cursor-pointer" // Text pastel-pink, hover effect primary-green
        onClick={() => handleDelete(id)}
      >
        {isDeleting ? (
          <Spinner className="animate-spin text-pastel-pink" /> // Spinner pastel-pink
        ) : (
          <Trash className="text-pastel-pink" /> // Trash icon pastel-pink
        )}
        <span>{children}</span>
      </button>
    </div>
  )
}

export default DeleteButton
