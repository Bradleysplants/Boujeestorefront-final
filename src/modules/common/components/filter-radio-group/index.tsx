import { EllipseMiniSolid } from "@medusajs/icons";
import { Label, RadioGroup, Text, clx } from "@medusajs/ui";
import { ChangeEvent } from "react";

type FilterRadioGroupProps = {
  title: string;
  titleClassName: string;  // Ensure titleClassName is a direct prop of the component
  items: {
    value: string;
    label: string;
    className?: string; // Optional className for custom styles
  }[];
  value: any;
  handleChange: (...args: any[]) => void;
  'data-testid'?: string;
}

const FilterRadioGroup = ({
  title,
  titleClassName, // Now a direct prop of the component
  items,
  value,
  handleChange,
  'data-testid': dataTestId
}: FilterRadioGroupProps) => {
  return (
    <div className="flex gap-x-3 flex-col gap-y-3">
      <Text className={titleClassName}>{title}</Text>
      <RadioGroup data-testid={dataTestId}>
        {items?.map((item) => (
          <div
            key={item.value}
            className={clx("flex gap-x-2 items-center", {
              "ml-[-1.75rem]": item.value === value,
            })}
          >
            {item.value === value && <EllipseMiniSolid />}
            <RadioGroup.Item
              checked={item.value === value}
              onClick={(e) =>
                handleChange(
                  e as unknown as ChangeEvent<HTMLInputElement>,  // Corrected to HTMLInputElement
                  item.value
                )
              }
              className="hidden peer"
              id={item.value}
              value={item.value}
            />
            <Label
              htmlFor={item.value}
              className={clx(
                "txt-compact-small !transform-none text-ui-fg-subtle hover:cursor-pointer",
                item.className, // Apply custom classes for styling
                {
                  "text-ui-fg-base": item.value === value,
                }
              )}
              data-testid="radio-label"
              data-active={item.value === value}
            >
              {item.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterRadioGroup;