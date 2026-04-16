import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [habits, setHabits] = useState([]);
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  const filteredHabits = habits.filter((habit) => {
    if (filter === "active") return !habit.done
    if (filter === "completed") return habit.done
    return true
  })

  const addHabit = () => {
    if (input.trim() === "") return;

    setHabits([...habits, { text: input, done: false }]);
    setInput("");
  };

  const toggleHabit = (index) => {
    const newHabits = [...habits];
    newHabits[index].done = !newHabits[index].done;
    setHabits(newHabits)
  }

  const deleteHabit = (index) => {
    const newHabits = habits.filter((habit, i) => {
       return i !== index
    })
     
    setHabits(newHabits)
    
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <h1>Habit Tracker</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Nieuwe habit..."
      />

      <button onClick={addHabit}>Toevoegen</button>
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("completed")}>completed</button>
      <button onClick={() => setFilter("active")}>Active</button>
      <button onClick={() => setDarkMode(!darkMode)}>Toggle Dark Mode</button>

      <ul>
        {filteredHabits.map((habit, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={habit.done}
              onChange={() => toggleHabit(index)}
            />

            <span style={{ textDecoration: habit.done ? "line-through" : "" }}>
              {habit.text}
            </span>

            <button onClick={() => deleteHabit(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;