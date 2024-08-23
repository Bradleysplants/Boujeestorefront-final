import React from "react"

type ErrorMessageProps = {
  error?: string | null
  "data-testid"?: string
  className?: string // Added className prop
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  "data-testid": dataTestid,
  className, // Destructure the className prop
}) => {
  if (!error) {
    return null
  }

  return (
    <div
      className={`pt-2 text-rose-500 text-small-regular ${className}`}
      data-testid={dataTestid}
    >
      <span>{error}</span>
    </div>
  )
}

export default ErrorMessage
