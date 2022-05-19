import React from 'react'

const Register = () => {
  return (
    <>
      <section className="form-page">
        <form>
          <h1>Sign Up</h1>
          <p>Start your journey here...</p>
          <input type="text" name="username" placeholder="Username" aria-label="Username" />
          
          <input type="text" name="email" placeholder="Email" aria-label="Email" />
          
          <input type="text" name="password" placeholder="Password" aria-label="Password" />
          
          <input type="text" name="passwordConfirmation" placeholder="Password Confirmation" aria-label="Password Confirmation" />
          <button type="submit">Continue</button>
        </form>
      </section>
    </>
  )
}

export default Register