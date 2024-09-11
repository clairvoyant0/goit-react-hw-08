import { useDispatch } from 'react-redux';

import css from './SearchBox.module.css';
import { changeFilter } from '../../redux/filters/slice';

const SearchBox = () => {
  const dispatch = useDispatch();

  const handleChange = event => {
    const value = event.target.value;
    // 1. Створення команди
    // 2. Доставка команди в Store
    const action = changeFilter(value);
    dispatch(action);
  };

  return (
    <div className={css.filterField}>
      <label className={css.label}>
        <span className={css.filterFieldTitle}>Find contact by name</span>
        <input
          className={css.filterFieldInput}
          onChange={handleChange}
          type="text"
          placeholder="Enter name"
        />
      </label>
    </div>
  );
};

export default SearchBox;