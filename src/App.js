import React from "react";
import { useState, useEffect } from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";

const url = "https://course-api.com/react-tabs-project";

function App() {
  const [nacitanie, setNacitanie] = useState(true);
  const [prace, setPrace] = useState([]);
  const [hodnota, setHodnota] = useState(0);

  const fetchPrace = async () => {
    const resp = await fetch(url);
    const data = await resp.json();
    setPrace(data);
    setNacitanie(false);
  };

  useEffect(() => {
    fetchPrace();
  }, []);

  if (nacitanie) {
    return (
      <>
        <h1 className="text-center mt-5">Načítavam dáta!</h1>
      </>
    );
  }
  const { title, dates, duties, company } = prace[hodnota];
  return (
    <>
      <div className="container">
        <div className="title text-center mt-5">
          <h1>Pracovné skúsenosti</h1>
          <div className="underline"></div>
        </div>
        <section className="mt-5">
          <div className="buttons">
            {prace.map((praca, index) => {
              return (
                <button
                  key={praca.id}
                  onClick={() => setHodnota(index)}
                  className={`${hodnota === index && "btn-aktiv"}`}
                >
                  {praca.company}
                </button>
              );
            })}
          </div>
          <article>
            <h3>{title}</h3>
            <h4 className="pt-2">{company}</h4>
            <h5 className="pt-2 pb-3">{dates}</h5>
            {duties.map((duty, index) => {
              return (
                <div className="text" key={index}>
                  <span className="ikonka">{<AiOutlineDoubleRight />}</span>
                  <p>{duty}</p>
                </div>
              );
            })}
          </article>
        </section>
      </div>
    </>
  );
}

export default App;
