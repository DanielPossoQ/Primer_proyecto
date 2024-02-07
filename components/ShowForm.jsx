import "../styles/ShowForm.css"

export default function ShowForm({persons, callDelete}){

    function clickDelete(e){
        if(window.confirm("Quiere eliminar este contacto?")){
            const index = e.target.value;  
            const id = persons[index].id
            callDelete(id)  
         }
        }
    return <div className="cont-input">
        {persons.map((el,i) => {
            if(el.name){
                return <div className="input" key={i}>
              <p >Nombre: {el.name}</p>
             <p >Numero: {el.number}</p>
             <button className="boton" onClick={clickDelete} value={i}>Eliminar</button>
            </div>
            } else{
                return
            }
        })}
    </div>
}