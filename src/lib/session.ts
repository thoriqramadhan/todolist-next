import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
const secretKey = process.env.JWT_SIGN_KEY
const encodedKey = new TextEncoder().encode(secretKey)

// membuat sign key jwt baru
export async function jwtSignKey(payload : {user: string , expiredAt: Date}) {
    const algorithm = 'HS256' 
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: algorithm })
        .setIssuedAt(Date.now())
        .setExpirationTime('1d')
    .sign(encodedKey)
}

// membuat session dengan key sign jwt
export async function createSession(user: string) {
    // membuat + 1 hari
    const expiredAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
    const signKey = await jwtSignKey({ user, expiredAt }) as string
    
      (await cookies()).set('session', signKey, {
        httpOnly: true,
        secure: true,
        expires: expiredAt,
        sameSite: 'lax',
        path: '/'
    })
}

// untuk mengambil payload user di session
export async function decryptSession(sessionKey) {
    try {
        const {payload } = await jwtVerify(sessionKey, encodedKey, {
            algorithms: ['HS256']
        })
        return payload
    } catch (error) {
        console.log('Failed to verify session!')
    }
}