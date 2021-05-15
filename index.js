const express = require("express")
const { fork } = require("child_process")
// const fetch = require("node-fetch")
// const redis = require("redis")


const PORT = process.env.PORT || 3000
// const REDIS_PORT = process.env.PORT || 6379

// const client = redis.createClient(REDIS_PORT)

const app = express()

app.get("/process", (req, res) => {
  const myProcess = fork("./multi_thread/process.js")

  myProcess.send({ roadA: 5, roadB: 0 })

  myProcess.on("message", (message) => {
    console.log(message)
  })
})

// app.get("/caching/:id", (req, res) => {

//     const id = req.params.id

//     client.get(id.toString, async (err, reply) => {
        
//         if (reply){
//             res.json(JSON.parse(reply))
//             return
//         }

//         const response = await fetch(`https://tienkim9920.herokuapp.com/api/product/${id}`);

//         const data = await response.json();

//         client.set(id.toString(), JSON.stringify(data))

//         res.json(data)

//     })

// })


app.listen(PORT, () => {
  console.log("Setting server is success with port " + PORT)
});
