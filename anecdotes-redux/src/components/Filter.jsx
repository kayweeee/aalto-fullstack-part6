import { filterChange } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(filterChange(event.target.value));
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      filter
      <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
