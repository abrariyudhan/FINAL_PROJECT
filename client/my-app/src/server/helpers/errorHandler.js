import { CustomError } from "./customErrors";

export function errorHandler(error) {
  if (error instanceof CustomError) {
    return { message: error.message, statusCode: error.statusCode }
  } 
  
  // if (error.name === "ZodError") {
  //   const messages = error.issues.map(issue => `${issue.path[0]}: ${issue.message}`)
  //   return { message: messages.join("; "), statusCode: 400 };
  // }

  console.error("UNHANDLED ERROR:", error)
  return { message: "Internal Server Error", statusCode: 500 }
}