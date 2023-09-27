import Item from "./Item";

export default function ItemList({ onDeleteItem, items }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item key={item} item={item} onDeleteItem={onDeleteItem} />
        ))}
      </ul>
    </div>
  );
}
