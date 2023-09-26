import "./styles.css";
import ItemList from "./Components/ItemList";
import AddItem from "./Components/AddItem";
import { useState } from "react";
import { useLocalStorageState } from "./useLocalStorageState";

export default function App() {
  const [items, setItems] = useLocalStorageState([], "items");
  const [showForm, setShowForm] = useState(false);

  //Handler Functions
  function handleAddItems(item) {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newItem = { ...item, id };
    setItems([...items, newItem]);
  }

  function handleDeleteItem(id) {
    setItems(items.filter((item) => item.id !== id));
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
      {showForm && (
        <div>
          <AddItem onAddItems={handleAddItems} />
        </div>
      )}
      <ItemList onDeleteItem={handleDeleteItem} items={items} />
    </div>
  );
}
