import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  gProvider
} from '@/services/firebase'
import { User, updateProfile, sendEmailVerification } from 'firebase/auth'
import {
  validateEmail,
  validatePassword,
  handleError
} from '@/utils'

export function useAuth () {
  const user = ref<User | null>(null)
  const error = ref<string | null>(null)
  const success = ref<string | null>(null)
  const loading = ref<boolean>(false)
  const externalAuthLoading = ref<boolean>(false)
  const router = useRouter()

  async function validates (email: string, password: string) {
    const emailError = validateEmail(email)
    if (emailError) {
      error.value = emailError
      return false
    }
    const passwordError = validatePassword(password)
    if (passwordError) {
      error.value = passwordError
      return false
    }
    return true
  }

  async function login (email: string, password: string) {
    if (!(await validates(email, password))) {
      return
    }
    try {
      loading.value = true
      error.value = null
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user
      // if emailVerified is false, send verification email.
      if (!user.emailVerified) {
        await sendEmailVerification(user)
        error.value = 'Please verify your email. Verification email sent.'
        await auth.signOut()
      } else {
        success.value =
          "Logged in successfully. You're being redirected to home page."
        setTimeout(() => {
          router.push('/')
        }, 5000)
      }
    } catch (err) {
      error.value = await handleError(err)
    } finally {
      loading.value = false
    }
  }

  async function resetPassword(email: string) {
    if (validateEmail(email)) {
      error.value = validateEmail(email)
      return
    }
    try {
      loading.value = true
      error.value = null
      await sendPasswordResetEmail(auth, email)
      success.value = 'Password reset email sent'
    } catch (err) {
      error.value = await handleError(err)
    } finally {
      loading.value = false
    }
  }

  async function loginWithGoogle () {
    try {
      externalAuthLoading.value = true
      error.value = null
      const userCredential = await signInWithPopup(auth, gProvider)
      success.value =
        "Logged in successfully. You're being redirected to home page."
      setTimeout(() => {
        router.push('/')
      }, 5000)
    } catch (err) {
      error.value = await handleError(err)
    } finally {
      externalAuthLoading.value = false
    }
  }

  return {
    user,
    error,
    success,
    loading,
    externalAuthLoading,
    login,
    resetPassword,
    loginWithGoogle
  }
}
