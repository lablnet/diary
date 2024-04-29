const validateEmail = (email: string): string | null => {
  if (
    !email ||
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
  ) {
    return 'Invalid email address'
  }
  return null
}

const validatePassword = (password: string): string | null => {
  if (!password || password.length < 8) {
    return 'Password must be at least 8 characters'
  }
  return null
}

const shouldNotEmpty = (str: string, field: string = 'Name'): string | null => {
  if (!str) {
    return `${field} should not be empty`
  }
  return null
}

export { validateEmail, validatePassword, shouldNotEmpty }
