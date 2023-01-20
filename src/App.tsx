import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import _debounce from "lodash/debounce";

import "./App.css";

function App() {
  const [count, setCount] = useState([]);
  const [info, setInfo] = useState<{
    prev: string | null;
    next: string | null;
    pages: number;
  } | null>(null);
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const request = ({ search = "" }: any = {}) =>
    axios
      .get(
        `https://rickandmortyapi.com/api/character/?count=12&page=${page}&status=${filterStatus}&gender=${filterGender}&name=${search}`
      )
      .then(({ data: { results, info } }) => {
        setCount(results);
        setInfo(info);
      });

  useEffect(() => {
    request();
  }, [page, filterStatus, filterGender]);

  const changeSearchValue = (val: any) => {
    setSearchValue(val);
    debounceFn(val);
  };

  const debounceFn = useCallback(
    _debounce((val) => request({ search: val }), 2000),
    [page]
  );

  const onClear = () => {
    setFilterStatus("");
    setFilterGender("");
    setSearchValue("");
  };

  return (
    <div className="App">
      <div className="filters">
        <h4>Filters</h4>
        <div>
          <input
            className="search"
            type="search"
            name="search"
            id="search"
            placeholder="Search character"
            value={searchValue}
            onChange={(e) => {
              setPage(1);
              changeSearchValue(e.target.value);
            }}
          />
        </div>

        <div className="selects">
          <div className="select">
            <h6>Status</h6>
            <select
              name="status"
              id="status"
              value={filterStatus}
              onChange={(e) => {
                setPage(1);
                setFilterStatus(e.target.value);
              }}
            >
              <option value=""></option>
              <option value="alive">alive</option>
              <option value="dead">dead</option>
              <option value="unknown">unknown</option>
            </select>
          </div>

          <div className="select">
            <h6>Gender</h6>
            <select
              name="gender"
              id="gender"
              value={filterGender}
              onChange={(e) => {
                setPage(1);
                setFilterGender(e.target.value);
              }}
            >
              <option value=""></option>
              <option value="female">female</option>
              <option value="male">male</option>
              <option value="genderless">genderless</option>
              <option value="unknown">unknown</option>
            </select>
          </div>

          <button onClick={onClear}>Clear filters</button>
        </div>
      </div>
      <div className="buttons">
        <button
          disabled={!info?.prev}
          onClick={() => setPage((page) => page - 1)}
        >
          Prev
        </button>
        <button
          disabled={!info?.next}
          onClick={() => setPage((page) => page + 1)}
        >
          Next
        </button>
        <p>Page: {page}</p>
      </div>
      <div className="cardsContainer">
        {count?.map(({ id, name, status, species, image }) => (
          <div key={id} className="card">
            <img src={image} alt={name} />
            <div className="card__text">
              <h3>{name}</h3>
              <p>
                {status} -{" "}
                <span
                  className={`indicator ${
                    status == "Alive" ? `green` : status == "Dead" ? `red` : ""
                  }`}
                />
              </p>
              <p>{species}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
