import { useTodos } from '../../context/TodoContext';
import TodoItem from './TodoItemContext';
import { isToday, parseISO } from 'date-fns';

function TodoList() {
  const { todos, toggleDone, deleteTodo, filter } = useTodos();

if (todos.length === 0) return <p>Ingen opgaver endnu.</p>;

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
      <TodoItem
        key={todo.id}
        todo={todo}
        onToggle={toggleDone}
        onDelete={deleteTodo}
      />
    ))}
  </div>
);
}

export default TodoList;