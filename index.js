const express = require("express")
const { fork } = require("child_process") // Kỹ thuật Multi-Thread

// const fetch = require("node-fetch")
// const redis = require("redis")  // Kỹ thuật caching

var fs = require("fs") // Kỹ thuật Stream and Buffer



const PORT = process.env.PORT || 3000
// const REDIS_PORT = process.env.PORT || 6379

// const client = redis.createClient(REDIS_PORT)

const app = express()


// Kỹ thuật Multi-Thread
app.get("/process", (req, res) => {
  const myProcess = fork("./multi_thread/process.js")

  myProcess.send({ roadA: 5, roadB: 0 })

  myProcess.on("message", (message) => {
    console.log(message)
  })
})


// Kỹ thuật Stream and Buffer video
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html')
// })

// Kỹ thuật Stream and Buffer video
// Cái route này tương ứng cái source video bên client
// <video width="400" controls>
//  <source src="http://localhost:3000/video/123" type="video/mp4">
// </video>
// Có thể lưu video vào public của nodejs nhưng mình sẽ tạo ra 1 route khác để buffer video
app.get("/video/:id", (req, res) => {
  
  // Ensure there is a range given for the video
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  // get video stats (about 61MB)
  const videoPath = "video1.mp4";
  const videoSize = fs.statSync("video1.mp4").size;

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);

})


// Kỹ thuật caching
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
