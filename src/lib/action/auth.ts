'use server'

import { z, ZodError } from "zod"
import { validateLoginUser, validateUserAuthentication } from "../validations/authentication"
import {hash , compare} from 'bcrypt'
import { prisma } from "../db"
import { createSession } from "../session"
import { redirect } from "next/navigation"
type AuthZodResult = {
  success: boolean,
  data?: any,
  error?: ZodError
}
async function restructureErrorZodRegister(parseResult: AuthZodResult , email: string) {
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

  if (parseResult.success) {
    return {success: true}
  }
  return {error, success: false};
}
async function restructureErrorZodLogin(parseResult: AuthZodResult) {
  const error: Record<string, string> = {}
  if (!parseResult.success) {
    const emailError = parseResult.error!.issues.find(issue => issue.path.includes('email'));
    const passwordError = parseResult.error!.issues.find(issue => issue.path.includes('password'))
    if (emailError) {
      error.email = emailError!.message
    }
    if (passwordError) {
      error.password = passwordError!.message
    }
  }
  if (parseResult.success) {
    return {success: true}
  }
  return {error, success: false};
}

export async function register(message: string, formState: HTMLFormElement) {
  try {
    const username = formState.get('username')
    const email = formState.get('email')
    const password = formState.get('password')
    const result = await restructureErrorZodRegister(validateUserAuthentication.safeParse({ username, email, password }) , email)
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
    const user = {email , password:hashedPassword}
    await createSession({ ...user })
    return {success: true}
  } catch (error) {
    return error
  }
}

export async function login(message: string, formState: HTMLFormElement) {
  try {
    const email = formState.get('email')
    const password = formState.get('password')
    const result = await restructureErrorZodLogin(validateLoginUser.safeParse({ email, password }), email)
    const returnDataStructure = {
      data: {
        email
      },
      error: null as Record<string, string> | undefined | null
    }
    if (!result.success) {
      console.log('in')
      returnDataStructure.error = result?.error
      return returnDataStructure
    }
    const targetedUsersDB = await prisma.user.findFirst({where:{email: email}})
    const isPasswordCorrect = await compare(password, targetedUsersDB!.password)
    if (!isPasswordCorrect) {
      returnDataStructure.error = { ...returnDataStructure.error, password: 'Invalid Credentials' }
      return returnDataStructure
    }
    const user = { email, password: targetedUsersDB!.password }
    await createSession({ ...user })
    return {success: true}

  } catch (error) {
    console.log(error)
  }
}