import { useDispatch, useSelector } from 'react-redux';
import { toggleDone, deleteTodo } from '../../redux/todosSlice';
import { isToday, parseISO } from 'date-fns';

function TodoListRedux() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const filter = useSelector((state) => state.todos.filter);

  // Filtrér todos
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
        <div
          key={todo.id}
          className={`todo-item ${todo.isDone ? 'done' : ''}`}
          style={{
            marginBottom: '1rem',
            padding: '1rem',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: todo.isDone ? '#e0fce0' : 'white',
          }}
        >
          <h3 style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }}>
            {todo.title}
          </h3>
          <p>Type: {todo.type}</p>
          <p>Estimeret tid: {todo.estimatedMinutes} min</p>
          {todo.deadline && <p>Deadline: {todo.deadline}</p>}
          {todo.tags.length > 0 && <p>Tags: {todo.tags.join(', ')}</p>}
          <button onClick={() => dispatch(toggleDone(todo.id))}>
            {todo.isDone ? 'Fortryd' : 'Færdig'}
          </button>
          <button
            onClick={() => dispatch(deleteTodo(todo.id))}
            style={{ marginLeft: '1rem' }}
          >
            Slet
          </button>
        </div>
      ))}
    </div>
  );
}

export default TodoListRedux;