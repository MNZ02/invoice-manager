export function getUserIdFromToken () {
  const token = localStorage.getItem('token')
  if (token) {
    // Split the token into its three parts: header, payload, signature
    const [, payloadBase64] = token.split('.')
    // Decode the payload from Base64
    const payload = JSON.parse(atob(payloadBase64))
    // Extract the user ID from the payload
    const userId = payload.userId // Assuming the user ID is stored in the 'userId' field of the payload
    return userId
  } else {
    // Token not found, return null or handle accordingly
    return null
  }
}
