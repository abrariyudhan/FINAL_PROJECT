import jwt from "jsonwebtoken"

const SECRET_KEY = process.env.SECRET_KEY || "kukukakikukaku"


export function signToken(payload) {
  return jwt.sign(payload, SECRET_KEY)
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY)
}