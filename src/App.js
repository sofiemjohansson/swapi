import React, { useEffect, useState } from "react";
import RingLoader from "react-spinners/RingLoader";
import ShowBox from "./components/ShowBox";

const App = () => {
  const [showThis, setShowThis] = useState([]);
  const [loading, setLoading] = useState(true);

  const loaderWaitTime = 1200;
  const serverURL = "https://swapi.py4e.com/api/films";

  useEffect(() => {
    async function fetchData() {
      let res = await fetch(serverURL);
      let data = await res.json();

      if (data) {
        setShowThis(data.results);

        setShowThis((currentList) => [
          ...currentList.sort((a, b) => a.release_date - b.release_date),
        ]);

        setLoading(false);
      }
    }

    setTimeout(() => {
      fetchData();
    }, loaderWaitTime);
  }, []);

  return (
      <div className="main-container">
        {loading && (
            <div style={{ margin: "5rem" }}>
              <RingLoader color={"#fff850"} size={125} />
              <h2 style={{ color: "#fff850", margin: "50% 20%" }}>Please wait while loading.....</h2>
            </div>
        )}

        {!loading && (
            <div className="all-container">
              {showThis.map((Stats, index) => (
                  <ShowBox
                      key={index}
                      title={Stats.title}
                      release_date={Stats.release_date}
                      characters={Stats.characters}
                      opening_crawl={Stats.opening_crawl}
                      setLoading={setLoading}
                  />
              ))}
            </div>
        )}
      </div>
  );
};

export default App;