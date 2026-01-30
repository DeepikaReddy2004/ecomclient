import React from 'react'

function Header() {
  return (
    <>
    <header style={{display:'flex',border:'1px solid black', justifyContent:'space-evenly'}}>
        <div style={{display:'flex', alignItems:'center'}}>
    <img height={50} width={50} src="https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_t.png" alt="" />
    <div style={{fontSize:'40px'}}>
    AZONMART
    </div>
        </div>
     
    <nav style={{display:'flex', textAlign:'center', gap:'20px',alignItems:'center'}} >

     <a href="">Home</a>
     <a href="">About</a>
     <a href="">Login</a>
     <a href="">Signup</a>
     <a href="">Support</a>
    </nav>
    </header>
    </>
  )
}

export default Header