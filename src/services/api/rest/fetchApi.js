const API_URL = 'http://localhost:5001/qonsoll-ams/us-central1'

/**
 * It takes a path, method, headers, and body, and returns a promise that resolves to the response data
 * @param path - The path to the API endpoint.
 * @param method - The HTTP method to use.
 * @param [headers] - { 'Content-Type': contentType, ...restHeaders }
 * @param body - The body of the request.
 * @returns The response data from the fetch request.
 */
const fetchApi = async ({ path, method, headers = {}, body } = {}) => {
  const { contentType = 'application/json', ...restHeaders } = headers

  const apiPath = `${API_URL}/${path}`
  const options = {
    method,
    headers: { 'Content-Type': contentType, ...restHeaders }
  }
  if (body) options.body = JSON.stringify(body)

  const response = await fetch(apiPath, options)
  const responseData = await response.json()

  return responseData
}

export default fetchApi
