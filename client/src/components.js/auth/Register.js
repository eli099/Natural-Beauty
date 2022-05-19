import React from 'react'

const Register = () => {
  return (
    <>
      <section className="form-page">
        <form>
          <h1>Register</h1>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" placeholder="Username" />
          <label htmlFor="username">Email</label>
          <input type="text" name="email" placeholder="Email" />
          <label htmlFor="username">Password</label>
          <input type="text" name="password" placeholder="Password" />
          <label htmlFor="username">Password Confirmation</label>
          <input type="text" name="passwordConfirmation" placeholder="Password Confirmation" />
        </form>
      </section>
    </>
  )
}

export default Register