
const Card = ({ noticia, eliminarNot }) => {
  return (
    <div className="card">
      <h2>{noticia.title}</h2>
      <p>{noticia.cuerpo}</p>
      <p>{noticia.autor}</p>
      <button onClick={()=> eliminarNot(noticia.id)}>Eliminar</button>
    </div>
  );
};

export default Card;
