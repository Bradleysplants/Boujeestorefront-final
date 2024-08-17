"use client";

import { clx } from "@medusajs/ui";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function Pagination({
  page,
  totalPages,
  'data-testid': dataTestid,
  className, // Continue to accept className for external styling
}: {
  page: number;
  totalPages: number;
  'data-testid'?: string;
  className?: string; // Specify that className is an optional prop
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Helper function to generate an array of numbers within a range
  const arrayRange = (start: number, stop: number) =>
    Array.from({ length: stop - start + 1 }, (_, index) => start + index);

  // Function to handle page changes
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  // Function to render a page button
  const renderPageButton = (
    p: number,
    label: string | number,
    isCurrent: boolean
  ) => (
    <button
      key={p}
      className={clx(
        "txt-large sm:txt-xlarge-plus text-ui-fg-muted px-2 py-1 rounded-md", // Added padding and rounded corners for touch devices
        {
          "text-ui-fg-base hover:text-ui-fg-subtle font-bold": isCurrent,
          "hover:text-ui-fg-subtle": !isCurrent,
        }
      )}
      disabled={isCurrent}
      onClick={() => handlePageChange(p)}
    >
      {label}
    </button>
  );

  // Function to render ellipsis
  const renderEllipsis = (key: string) => (
    <span
      key={key}
      className="txt-large sm:txt-xlarge-plus text-ui-fg-muted items-center cursor-default px-2"
    >
      ...
    </span>
  );

  // Function to render page buttons based on the current page and total pages
  const renderPageButtons = () => {
    const buttons = [];

    if (totalPages <= 7) {
      buttons.push(
        ...arrayRange(1, totalPages).map((p) =>
          renderPageButton(p, p, p === page)
        )
      );
    } else {
      if (page <= 4) {
        buttons.push(
          ...arrayRange(1, 5).map((p) => renderPageButton(p, p, p === page))
        );
        buttons.push(renderEllipsis("ellipsis1"));
        buttons.push(renderPageButton(totalPages, totalPages, totalPages === page));
      } else if (page >= totalPages - 3) {
        buttons.push(renderPageButton(1, 1, 1 === page));
        buttons.push(renderEllipsis("ellipsis2"));
        buttons.push(
          ...arrayRange(totalPages - 4, totalPages).map((p) =>
            renderPageButton(p, p, p === page)
          )
        );
      } else {
        buttons.push(renderPageButton(1, 1, 1 === page));
        buttons.push(renderEllipsis("ellipsis3"));
        buttons.push(
          ...arrayRange(page - 1, page + 1).map((p) =>
            renderPageButton(p, p, p === page)
          )
        );
        buttons.push(renderEllipsis("ellipsis4"));
        buttons.push(renderPageButton(totalPages, totalPages, totalPages === page));
      }
    }

    return buttons;
  };

  // Render the component
  return (
    <div
      className={clx(
        "flex justify-center w-full mt-12",
        className
      )}
    >
      <div
        className="flex gap-2 sm:gap-3 items-end"
        data-testid={dataTestid}
      >
        {renderPageButtons()}
      </div>
    </div>
  );
}
