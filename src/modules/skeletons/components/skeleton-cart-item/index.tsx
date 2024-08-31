import { Table } from "@medusajs/ui"

const SkeletonCartItem = () => {
  return (
    <Table.Row className="w-full m-4">
      <Table.Cell className="!pl-0 p-4 w-24">
        <div
          className="flex w-24 h-24 p-4 bg-darker-slate-gray rounded-lg animate-pulse"
          style={{
            backgroundColor: '#0b1e35', // Slate gray background color
            borderColor: '#58576B', // Darker slate gray border color
            borderRadius: '0.5rem', // Consistent rounded corners
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
          }}
          aria-hidden="true" // Hides non-informative elements from screen readers
        />
      </Table.Cell>
      <Table.Cell className="text-left">
        <div className="flex flex-col gap-y-2">
          <div className="w-32 h-4 bg-slate-gray animate-pulse rounded-md" />
          <div className="w-24 h-4 bg-darker-slate-gray animate-pulse rounded-md" />
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="flex gap-2 items-center">
          <div className="w-6 h-8 bg-slate-gray animate-pulse rounded-md" />
          <div className="w-14 h-10 bg-darker-slate-gray animate-pulse rounded-md" />
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="flex gap-2">
          <div className="w-12 h-6 bg-slate-gray animate-pulse rounded-md" />
        </div>
      </Table.Cell>
      <Table.Cell className="!pr-0 text-right">
        <div className="flex gap-2 justify-end">
          <div className="w-12 h-6 bg-slate-gray animate-pulse rounded-md" />
        </div>
      </Table.Cell>
    </Table.Row>
  )
}

export default SkeletonCartItem
