
let road_A = 0

let road_B = 0

process.on("message", (message) => {

    road_A = message.roadA

    road_B = message.roadB

})

let time_A = 0

let time_B = 0

setInterval(() => {
    road_A++
    time_A++
    console.log(road_A)
    if (road_A === road_B){
        const data = {
            time: `Xe A gap Xe B sau ${time_A}s`,
            road: `Quang duong Xe A di la ${road_A}km`
        }
        process.send(data)
        process.exit()
    }
}, 1000)

setInterval(() => {
    road_B = road_B + 2
    time_B++
    console.log(road_B)
    if (road_A === road_B){
        const data = {
            time: `Xe B gap Xe A sau ${time_B}s`,
            road: `Quang duong Xe B di la ${road_B}km`
        }
        process.send(data)
        process.exit()
    }
}, 1000)