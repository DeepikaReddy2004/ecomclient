import { useState, useEffect } from 'react'

function Home() {
  const [product, setproduct] = useState([])

  const BACKEND_API = import.meta.env.VITE_BACKEND_API

  //function which make a get request to the backend

  useEffect(() => {
    async function apicall() {
      let response = await fetch(`${BACKEND_API}/products`)
      let result= await response.json()
      setproduct(result)
      return;
  }
  apicall();
}, [BACKEND_API])


  return (
   <>
    <div style={{display:'flex',flexWrap:'wrap' ,justifyContent:'space-evenly',gap:'50px'}} >
      {product.map(function(p){
        return <div style={{border:"1px solid black" }} >
          <img height={250} width={250}  src={p.image} alt="" />
          <p>{p.title.slice(0,11)}</p>
          <p>{p.price}</p>
        </div>
      })}
    </div>
   
   </>
    
  )
}

export default Home
