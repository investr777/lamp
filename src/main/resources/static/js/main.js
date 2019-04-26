var RoomsApi = Vue.resource('/room{/id}');

connect()

Vue.component('room-row', {
    props: ['room'],
    data: function() {
        return {
            id: ''
        }
    },
    template:
        '<div>' +
        '<div v-if="id === room.id">' +
            'Комнта №{{room.id}}:' +
            '<span v-if="room.activeLamp">' +
                '<img src="/img/on.jpg" @click="edit"/>' +
                '<input v-if="room.activeLamp" type="button" value="Turn off" @click="edit"/>' +
            '</span>' +
            '<span v-else>' +
                '<img src="/img/off.jpg" @click="edit"/>' +
                '<input v-if="!room.activeLamp" type="button" value="Turn on" @click="edit"/>' +
            '</span>' +
            '<input type="button" value="Выйти из комнаты" @click="exit"/>' +
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
        },
        exit: function () {
            this.id = ''
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