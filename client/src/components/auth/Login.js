import React from 'react'

const Login = () => {
  return (
    <>
    <section className="form-page">
        <form>
          <h1>Login</h1>
          <p>Continue your journey...</p>
          
          <input type="text" name="email" placeholder="Email" aria-label="Email" />
          
          <input type="text" name="password" placeholder="Password" aria-label="Password" />
          
          <button type="submit">Login</button>
        </form>
      </section>
    </>
  )
}

export default Login