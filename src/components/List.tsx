import { memo, useCallback, useState } from "react";
import "./list.css";
import clsx from "clsx";

export type Item = {
  color: string;
  name: string;
};

const Item = memo(
  ({
    item,
    onItemSelect,
    selected,
  }: {
    item: Item;
    onItemSelect: (item: Item) => void;
    selected: boolean;
  }) => {
    return (
      <li
        data-testid={`item-${item.name}`}
        key={`item.name ${Math.random() * 1000}`}
        className={clsx(
          `animate-on-render`,
          `List__item List__item--${item.color}`,
          selected && `selected`,
        )}
        onClick={() => onItemSelect(item)}
      >
        {item.name}
      </li>
    );
  },
);

export default function List({ items }: { items: Array<Item> }) {
  const [selectedItems, setSelectedItems] = useState([]);

  const onItemSelect = useCallback((item: Item) => {
    setSelectedItems((prev) => {
      const nextSet = new Set(prev);
      if (nextSet.has(item)) {
        nextSet.delete(item);
      } else {
        nextSet.add(item);
      }
      return [...nextSet];
    });
  }, []);

  return (
    <>
      <h3>Selected Items</h3>
      <span data-testid="selected-names">
        {selectedItems.map((item) => item.name)}
      </span>
      <ul className="List" data-testid="item-list">
        {items.map((item) => (
          <Item
            key={item.name}
            item={item}
            onItemSelect={onItemSelect}
            selected={selectedItems.includes(item)}
          />
        ))}
      </ul>
    </>
  );
}
