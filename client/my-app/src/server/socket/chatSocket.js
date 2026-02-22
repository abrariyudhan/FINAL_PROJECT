import { Server } from "socket.io";
import Chat from "../models/Chat";

export function initChatSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL || "http://localhost:3000",
            credentials: true
        }
    })

    io.on("connection", (socket) => {
        console.log("User connected: " + socket.id)

        //Join room chat
        socket.on("joinRoom", (roomId) => {
            socket.join(roomId)
            console.log(`User ${socket.id} joined room ${roomId}`)
        })

        //Sending message
        socket.on("sendMessage", async (data) => {
            const { roomId, senderId, message } = data
            try {
                const newMessage = await Chat.addMessage(roomId, senderId, message)
                io.to(roomId).emit("receiveMessage", newMessage)
            } catch (error) {
                console.error("Error sending message:", error.message)
            }
        }) 

        socket.on("disconnect", () => {
            console.log("User disconnected: " + socket.id)
        })
    })
}