/**
 * Server middleware to respond to CORS preflight requests using OPTIONS method.
 */
export default defineEventHandler((event) => {
  if (isPreflightRequest(event)) {
    event.node.res.statusCode = 204
    event.node.res.statusMessage = 'No Content'
    return 'OK'
  }
})
