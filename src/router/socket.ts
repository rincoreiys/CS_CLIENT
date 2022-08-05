
import io from 'socket.io-client'
const ADDR = "http://192.168.0.100:3000"
// const ADDR = "http://127.0.0.1:3000"
const socket = io(`${ADDR}/web`)

export const registerSocket = (store:any) => {
    socket.on("connect", () => {
        socket.emit("sync") 
      });
          
      socket.on("sync", (state:any) => {
        console.log("sync", state)
        Object.keys(state).forEach(key => {store[key] =  state[key]})
        console.log("log", store)
      })

    return socket
      
}



