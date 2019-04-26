var RoomsApi = Vue.resource('/room{/id}');

connect()

Vue.component('room-row', {
    props: ['room'],
    data: function() {
        return {
            id: '',
        }
    },
    template:
        '<div>' +
        '<div v-if="id === room.id">' +
        'Комнта №{{room.id}}:' +
        'Лампочка {{room.activeLamp}}' +
        '<input type="button" value="On/Off" @click="edit"/>' +
        '</div>' +
        '<div v-else>' +
        'Комнта №{{room.id}}:' +
        '<input type="button" value="Войти в комнату" @click="id = room.id"/>' +
        '</div>' +
        '</div>',
    methods: {
        edit: function () {
            var room = {activeLamp: true}
            sendRoom({id: this.id}, room)
        }
    }
});

Vue.component('rooms-list', {
    props: ['rooms'],
    template:
        '<div><room-row v-for="room in rooms" :key="room.id" :room="room" /></div>'
});

function getIndex(list, id) {
    for (var i = 0; i < list.length; i++ ) {
        if (list[i].id === id) {
            return i
        }
    }
    return -1
}

new Vue({
    el: '#app',
    template: '<rooms-list :rooms="rooms"/>',
    data: {
        rooms: []
    },
    created: function () {
        RoomsApi.get().then(result =>
            result.json().then(data =>
                data.forEach(room => this.rooms.push(room))))

        addHandler(data => {
            let index = getIndex(this.rooms, data.id)
            if (index > -1) {
                this.rooms.splice(index, 1, data)
            }
        })
    }
});