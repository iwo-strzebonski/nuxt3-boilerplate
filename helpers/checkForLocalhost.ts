/**
 * Check if hostname is localhost
 *
 * @description This is a workaround for localhost
 * @param {string} hostname - hostname
 * @returns {boolean} - true if hostname is localhost
 * @private
 * @ignore
 */
export default function checkForLocalhost(hostname: string): boolean {
  return hostname.startsWith('localhost') || hostname.startsWith('localho.st') || hostname.startsWith('127.0.0')
}
