"use client";

import { ChangeEvent } from "react";
import FilterRadioGroup from "@modules/common/components/filter-radio-group";

export type SortOptions = "price_asc" | "price_desc" | "created_at";

type SortProductsProps = {
  sortBy: SortOptions;
  setQueryParams: (name: string, value: SortOptions) => void;
  'data-testid'?: string;
}

const sortOptions = [
  {
    value: "created_at",
    label: "Latest Arrivals",
    className: "text-pastel-pink hover:text-primary-green text-2xl", // Custom class for styling with larger text
    ariaLabel: "Sort by latest arrivals"  // ARIA label for better accessibility
  },
  {
    value: "price_asc",
    label: "Price: Low -> High",
    className: "text-pastel-pink hover:text-primary-green text-2xl",
    ariaLabel: "Sort by price, low to high"
  },
  {
    value: "price_desc",
    label: "Price: High -> Low",
    className: "text-pastel-pink hover:text-primary-green text-2xl",
    ariaLabel: "Sort by price, high to low"
  },
]

const SortProducts = ({ 'data-testid': dataTestId, sortBy, setQueryParams }: SortProductsProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSortBy = e.target.value as SortOptions;
    setQueryParams("sortBy", newSortBy);
  }

  return (
    <FilterRadioGroup
      title="Sort by"
      items={sortOptions}
      value={sortBy}
      handleChange={handleChange}
      data-testid={dataTestId}
      aria-label="Sort products"  // Adding ARIA label for accessibility
      titleClassName="text-5xl" // Larger text for the title
    />
  )
}

export default SortProducts;