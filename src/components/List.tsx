import { memo, useCallback, useLayoutEffect, useRef, useState } from "react";
import "./list.css";
import clsx from "clsx";
import SelectedItems from "./SelectedItems";
import type { Item } from "../lib/utils";

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
    const liRef = useRef<HTMLLIElement>(null);

    useLayoutEffect(() => {
      const el = liRef.current;
      if (!el) return;
      el.classList.remove("animate-on-render");
      void el.offsetWidth;
      el.classList.add("animate-on-render");
    });

    return (
      <li
        ref={liRef}
        data-testid={`item-${item.name}`}
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
  const [selectedItems, setSelectedItems] = useState<Array<Item>>([]);

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
      <SelectedItems selectedItems={selectedItems} />
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
