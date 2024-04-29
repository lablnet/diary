async function handleError (err: any) {
    if (err instanceof Error) {
      return err.message
    }
    return 'An unknown error occurred'
}

export { handleError }
