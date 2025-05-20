import { useSelector, useDispatch } from 'react-redux';
import {
  toggleDone,
  deleteTodo,
  selectTodos,
  selectFilter,
} from '../../redux/todoSlice';
import { isToday, parseISO } from 'date-fns';

function TodoListRedux() {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const filter = useSelector(selectFilter);

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

          <div className="todo-actions">
            <button onClick={() => dispatch(toggleDone(todo.id))}>
              {todo.isDone ? '↩️' : '✅'}
            </button>
            <button onClick={() => dispatch(deleteTodo(todo.id))}>❌</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoListRedux;