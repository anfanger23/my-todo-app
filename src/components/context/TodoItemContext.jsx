function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc' }}>
      <h3 style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }}>
        {todo.title}
      </h3>
      <p>Type: {todo.type}</p>
      <p>Estimeret tid: {todo.estimatedMinutes} min</p>
      {todo.deadline && <p>Deadline: {todo.deadline}</p>}
      {todo.tags.length > 0 && (
        <p>Tags: {todo.tags.join(', ')}</p>
      )}
      <button onClick={() => onToggle(todo.id)}>
        {todo.isDone ? 'Fortryd' : 'Færdig'}
      </button>
      <button onClick={() => onDelete(todo.id)} style={{ marginLeft: '1rem' }}>
        Slet
      </button>
    </div>
  );
}

export default TodoItem;