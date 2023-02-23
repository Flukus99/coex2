const USERS=document.querySelector('#users');
const numero_users=document.querySelector('#numero_users');
const cuerpo_tabla=document.querySelector("#cuerpo_tabla");
const tabla=document.querySelector(".list_users");
const item_clientes=document.querySelector("#clientes_item");
const crear_usuario=document.querySelector(".crear_usuario");
const table_usuario=document.querySelector(".table");

let lista_usuarios={}

let contador=0;



document.body.onload = function(){
    fetch_usuarios()
}

USERS.addEventListener('click',llamar_usuarios);
item_clientes.addEventListener('click',llamar_usuarios);



async function fetch_usuarios(){
    const options = {method: 'GET'};
    let respuesta_fetch;
await fetch('http://localhost:3000/users', options)
  .then(response => response.json())
  .then(response => {
     numero_users.textContent = response.users.length;
     lista_usuarios=response.users;
     respuesta_fetch=response.users;
    console.log(response)
    
  })
  .catch(err => console.error(err));
  return respuesta_fetch
  
}






async function llamar_usuarios(){
    if (contador>0){
        limpiar(USERS);
        mostrar(tabla);

    }else{
        limpiar(USERS)
    let respuesta_usuario=await fetch_usuarios()
    console.log(respuesta_usuario)
    for(let i=0;i<respuesta_usuario.length;i++){

        let usuario=document.createElement('tr');
        
        usuario.innerHTML=`
        <th scope="row" id="id${i}">${i+1}</th>
        <td>${lista_usuarios[i].nombre}</td>
        <td>${lista_usuarios[i].apellido}</td>
        <td>${lista_usuarios[i].cc}</td>
        <td>${lista_usuarios[i].direccion}</td>
        <td>${lista_usuarios[i].ciudad}</td>
        <td>${lista_usuarios[i].telefono}</td>
        <td>${lista_usuarios[i].cupo_disponible}</td>
        <td>
        <i onclick="editar_usuario('${lista_usuarios[i]._id}','${i}')">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"  viewBox="0 0 16 16" class="edit"">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>
        </i>

        <i onclick="eliminar_usuario('${lista_usuarios[i]._id}','id${i}')">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"  viewBox="0 0 16 16" class="delete" >
        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
        </svg>
        </i>

        </td>


        
        `

        cuerpo_tabla.appendChild(usuario)
        contador++; 
    }
    mostrar(tabla)
    
    }
    

   

}



function limpiar(element){
    element.setAttribute("class","no_active")
}
function mostrar(element){
    element.setAttribute("class","active")
}
function limpiar_tabla(element){
    element.innerHTML="";
}
function nuevo_usuario(){
    limpiar(tabla);
    mostrar(crear_usuario)
    document.getElementById("boton_enviar").setAttribute("onclick","enviar_nuevo_usuario()")

}
function editar_usuario(id_usuario,id_element){
    limpiar(tabla);
    limpiar(document.getElementById("crear_usuario"))
    mostrar(document.getElementById("editar_usuario"))
    cargar_editar_usuario(id_usuario,id_element);
    mostrar(crear_usuario);
    
}

function cargar_editar_usuario(id_usuario,id_element){
    console.log(lista_usuarios)
    document.querySelector('#nombre').value=lista_usuarios[id_element].nombre;
    document.querySelector('#apellido').value=lista_usuarios[id_element].apellido;
    document.querySelector('#cc').value=lista_usuarios[id_element].cc;
    document.querySelector('#direccion').value=lista_usuarios[id_element].direccion;
    document.querySelector('#ciudad').value=lista_usuarios[id_element].ciudad;
    document.querySelector('#telefono').value=lista_usuarios[id_element].telefono;
    document.querySelector('#cupo_disponible').value=lista_usuarios[id_element].cupo_disponible;

    
}



function enviar_nuevo_usuario(){
    let nombre=document.querySelector('#nombre').value;
    let apellido=document.querySelector('#apellido').value;
    let cc=document.querySelector('#cc').value;
    let direccion=document.querySelector('#direccion').value;
    let ciudad=document.querySelector('#ciudad').value;
    let telefono=document.querySelector('#telefono').value;
    let cupo_disponible=document.querySelector('#cupo_disponible').value;
    let usuario={
        nombre:nombre,
        apellido:apellido,
        cc:cc,
        direccion:direccion,
        ciudad:ciudad,
        telefono:telefono,
        cupo_disponible:cupo_disponible
    }
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    }
    fetch('http://localhost:3000/user', options)
  .then(response => response.json())
  .then(response => {
       if(response.message=="error creating user"){
        swal("Error al crear usuario");
       }else{
        swal("Usuario creado con exito", "success");
        limpiar(crear_usuario)
        limpiar_tabla(cuerpo_tabla)
        contador = 0
        llamar_usuarios()
        mostrar(tabla)
       }
  })
  .catch(err => console.error(err));
}

function eliminar_usuario(id,id_element){
    console.log(id)
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(`http://localhost:3000/user/${id}`, options)
 .then(response => {
    borrar_element(id_element)
 })
}


function borrar_element(id_element){
    limpiar_tabla(cuerpo_tabla)
    contador = 0
    llamar_usuarios()
    mostrar(tabla)

    
}