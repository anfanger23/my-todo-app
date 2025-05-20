import TodoFormContext from '../components/context/TodoFormContext';
import TodoListContext from '../components/context/TodoListContext';
import FilterBarContext from '../components/context/FilterBarContext';
import StatsOverviewContext from '../components/context/StatsOverviewContext';

function AppContext() {
  return (
    <div className="app-container">
      <h1>Min To-Do App</h1>
      <TodoFormContext />
      <FilterBarContext />
      <TodoListContext />
      <StatsOverviewContext />
    </div>
  );
}

export default AppContext;