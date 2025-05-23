import { useSelector, useDispatch } from 'react-redux';
import {
  toggleDone,
  deleteTodo,
  selectTodos,
  selectFilter,
  logTime,
} from '../../redux/todoSlice';
import { isToday, parseISO } from 'date-fns';
import { useState } from 'react';

function TodoListRedux() {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const filter = useSelector(selectFilter);
  const [minutesWorkedMap, setMinutesWorkedMap] = useState({});

  const handleMinutesChange = (id, value) => {
    setMinutesWorkedMap((prev) => ({ ...prev, [id]: value }));
  };

  const handleLogTime = (id) => {
    const minutes = Number(minutesWorkedMap[id]);
    if (!isNaN(minutes) && minutes > 0) {
      dispatch(logTime({ id, minutes }));
      setMinutesWorkedMap((prev) => ({ ...prev, [id]: '' }));
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter.type && todo.type !== filter.type) return false;
    if (filter.tag && !todo.tags.includes(filter.tag)) return false;
    if (filter.showTodayOnly && !isToday(parseISO(todo.createdAt))) return false;
    return true;
  });

  if (filteredTodos.length === 0) return <p>Ingen opgaver matcher filtrene.</p>;

  return (
    <div>
      <h2>Dine opgaver</h2>
      {filteredTodos.map((todo) => (
        <div key={todo.id} className={`todo-item ${todo.isDone ? 'done' : ''}`}>
          <h3>{todo.title}</h3>

          <div className="todo-details">
            <p>⏱ {todo.estimatedMinutes} min</p>
            {todo.deadline && <p>📅 {todo.deadline}</p>}
            {todo.tags.length > 0 && <p>🏷 {todo.tags.join(', ')}</p>}
          </div>

          {!todo.isDone && todo.type === 'stor' && (
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.5rem' }}>
              <input
                type="number"
                min="1"
                placeholder="Tid brugt (min)"
                value={minutesWorkedMap[todo.id] || ''}
                onChange={(e) => handleMinutesChange(todo.id, e.target.value)}
                style={{ width: '120px', padding: '0.4rem' }}
              />
              <button onClick={() => handleLogTime(todo.id)}>⏳ Registrér</button>
            </div>
          )}

          {!todo.isDone && todo.type === 'hurtig' && (
            <div className="todo-actions">
              <button onClick={() => dispatch(toggleDone(todo.id))}>✅ Markér som færdig</button>
            </div>
          )}

          {todo.isDone && <p style={{ fontStyle: 'italic' }}>✅ Opgaven er færdig</p>}

          <div className="todo-actions">
            <button onClick={() => dispatch(deleteTodo(todo.id))}>❌</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoListRedux;