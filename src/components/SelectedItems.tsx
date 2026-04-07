import type { Item } from "../lib/utils";

export default function SelectedItems({
  selectedItems,
}: {
  selectedItems: Array<Item>;
}) {
  return (
    <>
      <h3>Selected Items</h3>
      <span data-testid="selected-names">
        {selectedItems.map((item) => item.name)}
      </span>
    </>
  );
}
