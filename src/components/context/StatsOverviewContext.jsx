import { useTodos } from '../../context/TodoContext';

function StatsOverview() {
  const { todos } = useTodos();

  const doneCount = todos.filter((todo) => todo.isDone).length;
  const remainingTodos = todos.filter((todo) => !todo.isDone);
  const remainingCount = remainingTodos.length;
  const remainingTime = remainingTodos.reduce((sum, todo) => {
    return sum + (todo.estimatedMinutes || 0);
  }, 0);

  return (
    <div
      style={{
        marginTop: '2rem',
        borderTop: '1px solid #ccc',
        paddingTop: '1rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}
    >
      <h3 style={{ width: '100%', marginBottom: '0.5rem' }}>Statusoversigt</h3>
      <p style={{ margin: 0 }}>✅ Opgaver løst: {doneCount}</p>
      <p style={{ margin: 0 }}>📝 Opgaver tilbage: {remainingCount}</p>
      <p style={{ margin: 0 }}>⏳ Estimeret tid tilbage: {remainingTime} minutter</p>
    </div>
  );
}

export default StatsOverview;