import { LineItem, Region } from "@medusajs/medusa"
import { Heading, Table } from "@medusajs/ui"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  items?: Omit<LineItem, "beforeInsert">[]
  region?: Region
}

const ItemsTemplate = ({ items, region }: ItemsTemplateProps) => {
  return (
    <div className="text-pastel-pink bg-slate-gray"> {/* Ensure all text within this div is pastel-pink and the background is slate-gray */}
      <div className="pb-3 flex items-center">
        <Heading className="text-[2rem] leading-[2.75rem] text-pastel-pink"> {/* Heading is pastel-pink */}
          Cart
        </Heading>
      </div>
      <Table className="bg-slate-gray text-pastel-pink"> {/* Set table background to slate-gray and text to pastel-pink */}
        <Table.Header className="border-t-0 bg-slate-gray">
          <Table.Row className="text-pastel-pink txt-medium-plus bg-slate-gray"> {/* Table row background set to slate-gray */}
            <Table.HeaderCell className="!pl-0 bg-slate-gray">Item</Table.HeaderCell>
            <Table.HeaderCell className="bg-slate-gray"></Table.HeaderCell>
            <Table.HeaderCell className="bg-slate-gray">Quantity</Table.HeaderCell>
            <Table.HeaderCell className="hidden small:table-cell bg-slate-gray">
              Price
            </Table.HeaderCell>
            <Table.HeaderCell className="!pr-0 text-right bg-slate-gray">
              Total
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body className="bg-slate-gray">
          {items && region
            ? items
                .sort((a, b) => (a.created_at > b.created_at ? -1 : 1))
                .map((item) => (
                  <Item key={item.id} item={item} region={region} />
                ))
            : Array.from(Array(5).keys()).map((i) => (
                <div key={i} className="bg-slate-gray"> {/* Wrap SkeletonLineItem in a div with bg-slate-gray */}
                  <SkeletonLineItem />
                </div>
              ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default ItemsTemplate
