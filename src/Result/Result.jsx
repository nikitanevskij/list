import React from "react";
import "./Result.css";

function Result({ state }) {
  const [sort, setSort] = React.useState(true);
  const [arr, setArr] = React.useState([]);

  React.useEffect(() => {
    setArr(state);
  }, [state]);

  const sortItems = () => {
    if (sort) {
      let filtred = arr.sort((a, b) => b.length - a.length);
      setArr(filtred);
    } else {
      let filtred = arr.sort((a, b) => a.length - b.length);
      setArr(filtred);
    }
    setSort((sort) => !sort);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              Строка <button onClick={sortItems}>Ghb</button>
            </th>
            <th>Кво символов</th>
            <th>К-во слов</th>
          </tr>
        </thead>
        <tbody>
          {arr &&
            arr.map((item, index) => (
              <tr key={index}>
                <td>{item}</td>
                <td>{item.length}</td>
                <td>{item.split(" ").length}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Result;
