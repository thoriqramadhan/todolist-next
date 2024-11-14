import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
const secretKey = process.env.JWT_SIGN_KEY
const encodedKey = new TextEncoder().encode(secretKey)

// membuat sign key jwt baru
export async function jwtSignKey(payload : {user: RegisterFormat , expiredAt: Date}) {
    const algorithm = 'HS256' 
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: algorithm })
        .setIssuedAt()
        .setExpirationTime('1d')
    .sign(encodedKey)
}

// membuat session dengan key sign jwt
export async function createSession(user: RegisterFormat) {
    // membuat + 1 hari
    const expiredAt = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
    const signKey = await jwtSignKey({ user, expiredAt }) as string

    const cookieStore = await cookies()
        
    cookieStore.set('session', signKey, {
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
        return false
    }
}