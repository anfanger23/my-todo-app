import { Provider } from 'react-redux';
import store from './store';

import TodoFormRedux from '../components/redux/TodoFormRedux';
import TodoListRedux from '../components/redux/TodoListRedux';
import FilterBarRedux from '../components/redux/FilterBarRedux';
import StatsOverviewRedux from '../components/redux/StatsOverviewRedux';

function ReduxAppLogic() {
  return (
    <div className="app-container">
      <h1>Min To-Do App (Redux Toolkit)</h1>
      <TodoFormRedux />
      <FilterBarRedux />
      <TodoListRedux />
      <StatsOverviewRedux />
    </div>
  );
}

function AppRedux() {
  return (
    <Provider store={store}>
      <ReduxAppLogic />
    </Provider>
  );
}

export default AppRedux;