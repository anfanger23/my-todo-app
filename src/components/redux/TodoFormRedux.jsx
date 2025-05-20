import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../redux/todosSlice';

function TodoFormRedux() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [type, setType] = useState('hurtig');
  const [estimatedMinutes, setEstimatedMinutes] = useState('');
  const [deadline, setDeadline] = useState('');
  const [dailyLimit, setDailyLimit] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addTodo({ title, type, estimatedMinutes, deadline, dailyLimit, tags }));

    // Reset formular
    setTitle('');
    setEstimatedMinutes('');
    setDeadline('');
    setDailyLimit('');
    setTags('');
    setType('hurtig');
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        boxShadow: "none",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "0.8rem",
      }}
    >
      <h2 style={{ width: "100%", marginBottom: "0.5rem" }}>Tilføj opgave</h2>

      <input
        type="text"
        placeholder="Titel"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ flex: "1 1 150px", padding: "0.6rem" }}
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        style={{ flex: "1 1 150px", padding: "0.6rem", height: "40px" }}
      >
        <option value="hurtig">Lille</option>
        <option value="stor">Stor</option>
      </select>

      <input
        type="number"
        placeholder="Estimeret tid (minutter)"
        value={estimatedMinutes}
        onChange={(e) => setEstimatedMinutes(e.target.value)}
        style={{ flex: "1 1 160px", padding: "0.6rem" }}
      />

      {type === 'stor' && (
        <>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            style={{ flex: "1 1 180px", padding: "0.6rem" }}
          />
          <input
            type="number"
            placeholder="Daglig tidsgrænse (minutter)"
            value={dailyLimit}
            onChange={(e) => setDailyLimit(e.target.value)}
            style={{ flex: "1 1 200px", padding: "0.6rem" }}
          />
        </>
      )}

      <input
        type="text"
        placeholder="Tags (kommasepareret)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        style={{ flex: "1 1 250px", padding: "0.6rem" }}
      />

      <button
        type="submit"
        style={{
          padding: "0.6rem 1rem",
          height: "40px",
          width: "auto",
          whiteSpace: "nowrap",
        }}
      >
        Tilføj
      </button>
    </form>
  );
}

export default TodoFormRedux;