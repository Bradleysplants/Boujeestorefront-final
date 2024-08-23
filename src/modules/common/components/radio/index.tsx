const Radio = ({
  checked,
  'data-testid': dataTestId,
  className, // Add the className prop
}: {
  checked: boolean,
  'data-testid'?: string,
  className?: string, // Define the className prop
}) => {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked ? "true" : "false"}
      data-state={checked ? "checked" : "unchecked"}
      className={`group relative flex h-5 w-5 items-center justify-center outline-none bg-black border-2 border-pastel-pink ${className}`} // Apply black background, pastel-pink border, and allow additional classes
      data-testid={dataTestId || 'radio-button'}
    >
      <div
        className={`shadow-borders-base group-hover:shadow-borders-strong-with-shadow bg-ui-bg-base group-data-[state=checked]:bg-pastel-pink group-data-[state=checked]:shadow-borders-interactive group-focus:!shadow-borders-interactive-with-focus group-disabled:!bg-ui-bg-disabled group-disabled:!shadow-borders-base flex h-[14px] w-[14px] items-center justify-center rounded-full transition-all ${className}`} // Use className here as well for customization
      >
        {checked && (
          <span
            data-state={checked ? "checked" : "unchecked"}
            className="group flex items-center justify-center"
          >
            <div className="bg-black shadow-details-contrast-on-bg-interactive group-disabled:bg-ui-fg-disabled rounded-full group-disabled:shadow-none h-1.5 w-1.5"></div> {/* Inner dot */}
          </span>
        )}
      </div>
    </button>
  )
}

export default Radio
