/**
 * Validate email address
 * 
 * @param {string} email
 * 
 * @since v1.0.0
 * @author Muhammad Umer Farooq <umer@lablnet.com>
 * @returns {string | null}
 */
const validateEmail = (email: string): string | null => {
  if (
    !email ||
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
  ) {
    return 'Invalid email address'
  }
  return null
}

/**
 * Validate password
 * 
 * @param {string} email
 * 
 * @since v1.0.0
 * @author Muhammad Umer Farooq <umer@lablnet.com>
 * @returns {string | null}
 */
const validatePassword = (password: string): string | null => {
  if (!password || password.length < 8) {
    return 'Password must be at least 8 characters'
  }
  return null
}

/**
 * Validate name
 * 
 * @param {string} str
 * @param {string} field
 * 
 * @since v1.0.0
 * @author Muhammad Umer Farooq <umer@lablnet.com>
 * @returns {string | null}
 */
const shouldNotEmpty = (str: string, field: string = 'Name'): string | null => {
  if (!str) {
    return `${field} should not be empty`
  }
  return null
}

export { validateEmail, validatePassword, shouldNotEmpty }
