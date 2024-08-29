import { LineItem, Region } from "@medusajs/medusa";
import { Table, Text } from "@medusajs/ui";

import LineItemOptions from "@modules/common/components/line-item-options";
import LineItemPrice from "@modules/common/components/line-item-price";
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price";
import Thumbnail from "@modules/products/components/thumbnail";

type ItemProps = {
  item: Omit<LineItem, "beforeInsert">;
  region: Region;
};

const Item = ({ item, region }: ItemProps) => {
  return (
    <Table.Row className="w-full bg-black text-pastel-pink rounded-lg shadow-[0_0_20px_5px_rgba(255,197,225,0.75)]" data-testid="product-row"> {/* Black background with pastel-pink text and pink shadow */}
      <Table.Cell className="!pl-4 !pr-4 w-32"> {/* Add padding to the left and right of the image */}
        <div className="flex justify-center">
          <Thumbnail thumbnail={item.thumbnail} size="square" />
        </div>
      </Table.Cell>

      <Table.Cell className="text-left !pl-4 !pr-4"> {/* Add padding to the left and right of the product name */}
        <Text className="txt-medium-plus font-bold" data-testid="product-name"> {/* Bold text */}
          {item.title}
        </Text>
        <LineItemOptions variant={item.variant} data-testid="product-variant" />
      </Table.Cell>

      <Table.Cell className="!pr-4 !pl-4"> {/* Add padding to the left and right of the price */}
        <span className="flex flex-col items-end h-full justify-center">
          <span className="flex gap-x-1">
            <Text className="font-bold"> {/* Bold text */}
              <span data-testid="product-quantity">{item.quantity}</span>x 
            </Text>
            <LineItemUnitPrice item={item} region={region} style="tight" />
          </span>

          <LineItemPrice item={item} region={region} style="tight" />
        </span>
      </Table.Cell>
    </Table.Row>
  );
};

export default Item;
