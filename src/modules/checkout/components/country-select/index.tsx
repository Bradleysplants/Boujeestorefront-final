import { forwardRef, useImperativeHandle, useMemo, useRef } from "react"
import NativeSelect, {
  NativeSelectProps,
} from "@modules/common/components/native-select"
import { Region } from "@medusajs/medusa"

const CountrySelect = forwardRef<
  HTMLSelectElement,
  NativeSelectProps & {
    region?: Region
    inputClassName?: string // Add the inputClassName prop
  }
>(({ placeholder = "Country", region, defaultValue, inputClassName, ...props }, ref) => {
  const innerRef = useRef<HTMLSelectElement>(null)

  useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
    ref,
    () => innerRef.current
  )

  const countryOptions = useMemo(() => {
    if (!region) {
      return []
    }

    return region.countries.map((country) => ({
      value: country.iso_2,
      label: country.display_name,
    }))
  }, [region])

  return (
    <NativeSelect
      ref={innerRef}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className={`bg-black text-pastel-pink font-bold border-pastel-pink ${inputClassName}`} // Apply black background, pastel-pink bold text, and pastel-pink border
      {...props}
    >
      {countryOptions.map(({ value, label }, index) => (
        <option key={index} value={value} className="bg-black text-pastel-pink font-bold"> {/* Ensure options also follow the style */}
          {label}
        </option>
      ))}
    </NativeSelect>
  )
})

CountrySelect.displayName = "CountrySelect"

export default CountrySelect
