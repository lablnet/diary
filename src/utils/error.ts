/**
 * Handle error and return error message
 * 
 * @param {any} err
 * 
 * @since v1.0.0
 * @author Muhammad Umer Farooq <umer@lablnet.com>
 * @returns {string}
 */
async function handleError (err: any) {
    if (err instanceof Error) {
      return err.message
    }
    return 'An unknown error occurred'
}

export { handleError }
