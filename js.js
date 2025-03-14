

function dividir(array, num){
 
    let grupo = []
  
    for(let i =0; i<array.length; i+=num){
      grupo.push(array.slice(i, i+ num))
    }
  
    return grupo
  }
  
  async function cargar() {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151¿&offset=0')
    let data = await response.json()
    let general = data.results  
    return general
  }
  
  async function CargarPokemones() {
  
    let lista = await cargar()
    let gruposdivididos = dividir(await lista, 5)

    for(let grupos of gruposdivididos){
  
      await procesargrupo(grupos)
    }
  
  }
  
  async function procesargrupo(grupo) {
  
    for(let object of grupo){
  
      let respuesta = await fetch(object.url)
      let datos =  await respuesta.json()
      
      
      let name = datos.name
      let types = ObtenerTipos(datos.types)
      let imagen = ObtenerImagen(datos.sprites)
            
      //console.log(`nombre: ${name}, tipo: ${types}, url: ${imagen} `)

      transform(name,types,imagen)
      card2(name,types,imagen)
    
    } 
    
  }
  function ObtenerTipos (array){

    let tipos = []
    array.forEach(elemento=>{
      tipos.push(elemento.type.name)
    })
    return tipos
  }
  
  function ObtenerImagen(object){

    let imagen = object.front_default

    return imagen
  }

    CargarPokemones()
 
  function transform(nombre, tipo, img){

    let pokemon = {
      name : '',
      tipo : [],
      img : ''
    }
    pokemon.name = nombre;
    pokemon.tipo = tipo
    pokemon.img = img


    console.log(pokemon)
    
  }

  function card(nombre, tipos){

    let card = document.createElement("div");
    
    let tipo = document.createElement("span");
    tipo.textContent = tipos
    
    let name = document.createElement("h2");
    name.textContent = nombre

    card.appendChild(name)
    card.appendChild(tipo)

    document.getElementById('main').appendChild(card)
  }

  function card2(nombre, tipos,img){

    document.getElementById('main').innerHTML +=`
      <div class="card">
        <img src="${img}" alt="${nombre}">
        <h2>${nombre}</h2>
        <span>${tipos}</span>
    </div>
    `;
  }