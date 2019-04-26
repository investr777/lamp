var stompClient = null

const handlers = []

function connect() {
    const socket = new SockJS('/gs-guide-websocket')
    stompClient = Stomp.over(socket)
    stompClient.connect({}, frame => {
        console.log('Connected: ' + frame)
        stompClient.subscribe('/topic/activity', room => {
            handlers.forEach(handler => handler(JSON.parse(room.body)))
        })
    })
}

function addHandler(handler) {
    handlers.push(handler);
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect()
    }
    console.log("Disconnected")
}

function sendRoom(room) {
    stompClient.send("/app/changeLight", {}, JSON.stringify(room))
}