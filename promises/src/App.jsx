import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Card from "./components/Card";

function App() {
  const URL = "http://localhost:3001/api/noticias";
  const [noticias, setNoticias] = useState([]);

  const [title, setTitle] = useState("");
  const [cuerpo, setCuerpo] = useState("");
  const [autor, setAutor] = useState("");

  useEffect(() => {
    getNoticias();
  }, []);

  const getNoticias = () => {
    axios.get(URL).then((res) => setNoticias(res.data.data));
    // fetch("http://localhost:3001/api/noticias")
    //   .then((res) => res.json())
    //   .then((data) => setNoticias(data.data))
    //   .catch((err) => console.log(err));
  };

  const agregarSubmit = (e) => {
    e.preventDefault();
    axios
      .post(URL, { title: title, cuerpo: cuerpo, autor: autor })
      .then((res) => {
        setNoticias([...noticias, res.data.data]);
      });
    setTitle("");
    setCuerpo("");
    setAutor("");
  };

  const eliminarAllNot = () => {
    //actualizar axios ?
    setNoticias([]);
  };

  const eliminarNot = (id) => {
    axios
      .delete(`${URL}/${id}`)
      .then(() => setNoticias(noticias.filter((noticia) => noticia.id !== id)));
  };

  return (
    <div className="App">
      <form className="form" onSubmit={agregarSubmit}>
        <input
          type={"text"}
          placeholder="Titulo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <input
          type={"text"}
          placeholder="Cuerpo"
          value={cuerpo}
          onChange={(e) => setCuerpo(e.target.value)}
        ></input>
        <input
          type={"text"}
          placeholder="Autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        ></input>

        <button type="submit">Agregar</button>
      </form>

      {noticias.map((noticia) => {
        return (
          <Card key={noticia.id} noticia={noticia} eliminarNot={eliminarNot} />
        );
      })}

      <div className="deleteAll">
        <button onClick={eliminarAllNot}>Borrar todo</button>
      </div>
    </div>
  );
}

export default App;
