var stompClient = null

export function connect() {
    const socket = new SockJS('/gs-guide-websocket')
    stompClient = Stomp.over(socket)
    stompClient.connect({}, frame => {
        console.log('Connected: ' + frame)
        stompClient.subscribe('/topic/activity', room => {
            // showGreeting(JSON.parse(greeting.body).content)
        })
    })
}

export function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect()
    }
    console.log("Disconnected")
}

export function sendRoom(room) {
    stompClient.send("/app/changeLight", {}, JSON.stringify(room))
}