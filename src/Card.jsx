import React from 'react'

function Card(props) {

  
  return (
   <>
<div  style={{border:'1px solid red' }}  >
   <h1>userdetails</h1>
   <img height={100} width={100}  src={props.image} alt="" />
   <p>name:{props.name}</p>
   <p>age:{props.age}</p>
   <p>branch:{props.branch}</p>

</div>
   
   </>
  )
}

export default Card