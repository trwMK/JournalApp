import Item from "./Item";

export default function ItemList({ onDeleteItem, items }) {
  return (
    <div className="list">
      <h2>{items.length > 0 ? "Your journal" : "Write about your life"}</h2>
      <ul>
        {items.map((item) => (
          <Item key={item} item={item} onDeleteItem={onDeleteItem} />
        ))}
      </ul>
    </div>
  );
}
