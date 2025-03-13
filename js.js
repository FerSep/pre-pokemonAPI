

function dividir(array, num){
 
    let grupo = []
  
    for(let i =0; i<array.length; i+=num){
      grupo.push(array.slice(i, i+ num))
    }
  
    return grupo
  }
  
  async function cargar() {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0')
    let data = await response.json()
    let general = data.results
  
    return general
  }
  
  async function CargarPokemones() {
  
    let lista = await cargar()
    let gruposdivididos = dividir(await lista, 5)
  
    /*console.log(lista)
    console.log(gruposdivididos)*/
    for(let grupos of gruposdivididos){
  
     let x = await procesargrupo(grupos)
  
    }
  
  }
  
  async function procesargrupo(grupo) {
    
    for(let object of grupo){
  
      let respuesta = await fetch(object.url)
      let datos =  await respuesta.json()
      
      let name = datos.name
      let types = ObtenerTipos(datos.types)
      let imagen = ObtenerImagen(datos.sprites)
            
      console.log(`nombre: ${name}, tipo: ${types}, url: ${imagen} `)
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

