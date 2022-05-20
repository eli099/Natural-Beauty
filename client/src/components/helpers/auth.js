// ? Funtion to get payload off of token
export const getPayload = () => {
  const token = window.localStorage.getItem('natural-beauty')
  console.log('token ->', token)
  if (!token) return
  // Split token and return index 1
  const payload = token.split('.')[1]
  console.log('payload ->', payload)
  // Parse into JSON object
  console.log(JSON.parse(atob(payload)))
  return JSON.parse(atob(payload))
}
getPayload()

// ? Checking to see if user is autheticated
export const userIsAuthenticated = () => {
  // Get payload for localStorage
  const payload = getPayload()
  console.log('expiry ->', payload)
  // Check payload exists (code will break otherwise)
  if (!payload) return false
  // Get today's date (in milliseconds)
  console.log('currentTime ->', Math.floor(Date.now() / 1000)) // Divide by 1000 to convert to seconds, round down
  const currentTime = Math.floor(Date.now() / 1000)
  // Compare token expiry -> expiry needs to be in future to be authenticated
  // Return boolean
  return currentTime < payload.exp
}
console.log('is user authenticated? ->', userIsAuthenticated())
userIsAuthenticated()