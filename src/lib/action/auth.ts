'use server'

import { z, ZodError } from "zod"
import { validateUserAuthentication } from "../validations/authentication"
import {hash} from 'bcrypt'
import { prisma } from "../db"
import { createSession } from "../session"
import { redirect } from "next/navigation"
type AuthZodResult = {
  success: boolean,
  data?: any,
  error?: ZodError
}
async function restructureErrorZod(parseResult: AuthZodResult , email: string) {
  const error: Record<string, string> = {}
  const isEmailDuplicate = await prisma.user.findFirst({where: {email: email}
  })
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
  }

  if (isEmailDuplicate) {
    error.email = 'Email is duplicated'
  }

  return {error, success: false};
}

export async function register(message: string, formState: HTMLFormElement) {
  try {
    const username = formState.get('username')
    const email = formState.get('email')
    const password = formState.get('password')
    const result = await restructureErrorZod(validateUserAuthentication.safeParse({ username, email, password }) , email)
    if (!result.success) {
      return {
        data: {
          username,
          email
        },
        error: result.error
      }
    }
    const hashedPassword = await hash(password, 10)

    await prisma.user.create({
      data: {
        name: username,
        email,
        password: hashedPassword
      }
    })
    const user = {username , email}
    await createSession({ ...user })
    return {success: true}
  } catch (error) {
    return error
  }
}