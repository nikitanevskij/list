import "./App.css";
import Result from "./Result/Result";
import React from "react";
import axios from "axios";

function App() {
  const [state, setState] = React.useState([]);
  // const [search, setSearch] = React.useState({});
  const [searchValue, setSearchValue] = React.useState("");
  const [searchType, setSearchType] = React.useState("line");
  // const [isLoad, setLoad] = React.useState(false);

  React.useEffect(() => {
    try {
      async function fetchData() {
        const { data } = await axios.get("http://localhost:3001/db.json");
        setState(data.data);
      }
      fetchData();
    } catch (error) {
      alert("Ошибка при запросе");
      console.error(error);
    }
  }, []);

  const filtredItems = (e) => {
    e.preventDefault();
    // setSearch({ searchValue, searchType });
    // searchValue && setLoad(true);
  };

  const searchItems = () => {
    if (searchType === "line") {
      const filtred = state.filter((item) =>
        item.toLowerCase().includes(searchValue.toLowerCase())
      );
      return <Result state={filtred} />;
    } else if (searchType === "characters") {
      const filtred = state.filter((item) => item.length === +searchValue);
      return <Result state={filtred} />;
    } else {
      const filtred = state.filter(
        (item) => item.split(" ").length === +searchValue
      );
      return <Result state={filtred} />;
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div className="app_search">
          <div>
            <form onSubmit={filtredItems}>
              <div>
                <input
                  type={searchType === "line" ? "text" : "number"}
                  name="search"
                  placeholder={
                    searchType === "line"
                      ? "Введите подстроку"
                      : "Введите символы"
                  }
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                />
                <input type="submit" value="" />
              </div>
              <div>
                <label>
                  Поиск по столбцу
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                  >
                    <option value="line">Строка</option>
                    <option value="characters">К-во символов</option>
                    <option value="wordCount">К-во слов</option>
                  </select>
                </label>
              </div>
            </form>
          </div>
        </div>
        {searchValue ? searchItems() : <Result state={state} />}
      </div>
    </div>
  );
}

export default App;
