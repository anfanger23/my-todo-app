import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/todoSlice';

function FilterBarRedux() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.todos.filter);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch(setFilter({
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div
      className="filter-bar"
      style={{
        marginBottom: '1rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '0.8rem',
      }}
    >
      <h3 style={{ width: '100%', marginBottom: '0.5rem' }}>Filtrer opgaver</h3>

      <select
        name="type"
        value={filter.type}
        onChange={handleChange}
        style={{
          flex: '1 1 150px',
          padding: '0.6rem',
          height: '40px',
        }}
      >
        <option value="">Alle typer</option>
        <option value="hurtig">Lille</option>
        <option value="stor">Stor</option>
      </select>

      <input
        type="text"
        name="tag"
        placeholder="Filtrér efter tag"
        value={filter.tag}
        onChange={handleChange}
        style={{
          flex: '1 1 200px',
          padding: '0.6rem',
        }}
      />

      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flex: '1 1 auto',
        }}
      >
        <input
          type="checkbox"
          name="showTodayOnly"
          checked={filter.showTodayOnly}
          onChange={handleChange}
          style={{ width: '18px', height: '18px' }}
        />
        <span>Kun dagens opgaver</span>
      </label>
    </div>
  );
}

export default FilterBarRedux;