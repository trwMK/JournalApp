import "./styles.css";
import ItemList from "./Components/ItemList";
import AddItem from "./Components/AddItem";
import { useState } from "react";
import { useLocalStorageState } from "./useLocalStorageState";
import EditItem from "./Components/EditItem";

export default function App() {
  const [items, setItems] = useLocalStorageState([], "items");
  const [showForm, setShowForm] = useState(false);
  const [item, setItem] = useState({});

  //Handler Functions
  function handleAddItems(item) {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newItem = { ...item, id };
    setItems([...items, newItem]);
  }

  function handleDeleteItem(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  function handleUpdateItem(updatedItem) {
    const itemIndex = items.findIndex((i) => i.id === updatedItem.id);

    if (itemIndex === -1) return;

    const updatedItems = [...items];
    updatedItems[itemIndex] = updatedItem;
    setItems(updatedItems);
  }

  return (
    <div className="App">
      <div className="header">
        <h1>Your diary to a better life</h1>
        <button
          className={showForm ? "btnFormHide btnForm" : "btnFormAdd btnForm"}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Hide Form" : "Show Form"}
        </button>
      </div>
      <h2>{items.length > 0 ? "Your journal" : "Write about your life"}</h2>
      {showForm && (
        <div>
          <AddItem onAddItems={handleAddItems} setShowForm={setShowForm} />
        </div>
      )}
      <ItemList
        onDeleteItem={handleDeleteItem}
        onUpdateItem={handleUpdateItem}
        item={item}
        setItem={setItem}
        items={items}
      />
    </div>
  );
}
