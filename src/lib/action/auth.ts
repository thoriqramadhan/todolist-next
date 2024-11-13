'use server'

import { z, ZodError } from "zod"
import { validateUserAuthentication } from "../validations/authentication"

type AuthZodResult = {
  success: boolean,
  data?: any,
  error?: ZodError
}
function restructureErrorZod(parseResult: AuthZodResult) {
  const error: Record<string ,string , string> = {}
  if (!parseResult.success) {
    const emailError = parseResult.error!.issues.find(issue => issue.path.includes('email'));
    const usernameError = parseResult.error!.issues.find(issue => issue.path.includes('username'))
    const passwordError = parseResult.error!.issues.find(issue => issue.path.includes('password'))
    if (usernameError) {
      error.username = usernameError!.message
    }
    if (emailError) {
      error.email = emailError!.message
    }
    if (passwordError) {
      error.password = passwordError!.message
    }
    return {error, success: false};
  }
    return parseResult.success
}

export async function register(message: string, formState: HTMLFormElement) {
  try {
    const username = formState.get('username')
    const email = formState.get('email')
    const password = formState.get('password')
    const result = restructureErrorZod(validateUserAuthentication.safeParse({ username, email , password }))
    if (!result.success) {
      return {
        data: {
          username,
          email
        },
        error: result.error
      }
    }

  } catch (error) {
    return {
      error: error
    }
  }
}