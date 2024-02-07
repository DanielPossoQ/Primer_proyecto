import axios from 'axios'

const base_url = "http://localhost:3001/persons"

async function getAll(){
   try{
    const request = await fetch(base_url)
    const data = await request.json()
    return data
   }catch(err){
    alert(err)
   }
}

async function create(newObject){
    const request = await fetch(base_url,{
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(newObject)
    })
    const data = await request.json()
    return data
}

async function update(id, newObject){
    const request = await fetch(`${base_url}/${id}`,{
        method: 'PUT',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(newObject)
    })
    const data = await request.json()
    return data
}


async function eliminate(id){
    const request = await fetch(`${base_url}/${id}`,{
        method: "DELETE"
    })
    if(request.ok){
        const data = await request.json()
        console.log("salio bien");
        return data
    }else{
        console.log("salio mal");
    }
}

export default {
    getAll,
    create,
    eliminate,
    update
}