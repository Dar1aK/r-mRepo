import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [count, setCount] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then(({ data: { results } }) => {
        setCount(results);
      });
  }, []);

  return (
    <div className="App">
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
