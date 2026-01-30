import React from 'react'

function Signup() {
  return (
   <>
   <form style={{textAlign:'center'}} >
    <h1>Registration Form</h1>

    <div>
        <label>Username </label> <br />
    <input type="text" placeholder='username' />
    </div>

    <div>
        <label>Email</label> <br />
    <input type="text" placeholder='email' />
    </div>

    <div>
        <label>Password</label> <br />
    <input type="password" placeholder='password' />
    </div>
  <br />
    <button>Register</button>
   </form>
   </>
  )
}

export default Signup