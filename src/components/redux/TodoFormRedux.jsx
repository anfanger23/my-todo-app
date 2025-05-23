import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../redux/todoSlice';

/**
 * TodoFormRedux - Komponent til at tilføje nye opgaver via Redux
 * Håndterer brugerinput og sender data til Redux store
 */
function TodoFormRedux() {
  // Hent dispatch-funktionen fra Redux
  const dispatch = useDispatch();
  
  // State variabler til at gemme formulardata
  const [title, setTitle] = useState(''); // Opgavens titel
  const [type, setType] = useState('hurtig'); // Opgavetype: 'hurtig' eller 'stor'
  const [estimatedMinutes, setEstimatedMinutes] = useState(''); // Estimeret tid i minutter
  const [deadline, setDeadline] = useState(''); // Deadline dato (kun for store opgaver)
  const [tags, setTags] = useState(''); // Kommaseparerede tags

  /**
   * Håndterer formular-indsendelse
   * @param {Event} e - Formular-event objekt
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Forhindrer standard formular-opførsel

    // Dispatcher action til Redux store med formulardata
    dispatch(
      addTodo({
        title,
        type,
        estimatedMinutes,
        deadline,
        tags,
      })
    );

    // Nulstil alle formularfelter efter indsendelse
    setTitle('');
    setType('hurtig');
    setEstimatedMinutes('');
    setDeadline('');
    setTags('');
  };

  return (
    <>
      <h2>Tilføj opgave</h2>
      <form onSubmit={handleSubmit}>
        {/* Input felt til opgavetitel */}
        <input
          type="text"
          placeholder="Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Dropdown til valg af opgavetype */}
         <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        style={{ flex: "1 1 150px", padding: "0.6rem", height: "34px" }}
      >
        <option value="hurtig">Lille</option>
        <option value="stor">Stor</option>
      </select>

        {/* Input til estimeret tid i minutter */}
        <input
          type="number"
          placeholder="Estimeret tid (minutter)"
          style={{ flex: "1 1 160px", padding: "0.6rem" }}
          value={estimatedMinutes}
          onChange={(e) => setEstimatedMinutes(e.target.value)}
          required
        />

        {/* Betinget visning af deadline-felt (kun for store opgaver) */}
        {type === 'stor' && (
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        )}

        {/* Input til tags (kommasepareret liste) */}
        <input
          type="text"
          placeholder="Tags (kommasepareret)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        {/* Knap til at indsende formularen */}
        <button type="submit">Tilføj</button>
      </form>
    </>
  );
}

export default TodoFormRedux;