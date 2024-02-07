import "../styles/ShowFilter.css"

export default function ShowFilter({filtrado,handleFiltrado,filtredList}){
    return  <div className="filter">
    <input className="input" type="text" value={filtrado} onChange={handleFiltrado} />
    {filtredList.map((el,i) => {
        return <div className="showed" key={i}>
          <p >Nombre: {el.name}</p>
         <p >Numero: {el.number}</p>
        </div>
    })}
    </div>
}