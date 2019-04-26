var RoomsApi = Vue.resource('/room{/id}');

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
            RoomsApi.update({id: this.id}, room)
        }
    }
});

Vue.component('rooms-list', {
    data: function() {
        return {
            rooms: [],
        }
    },
    created: function () {
        RoomsApi.get().then(result =>
            result.json().then(data =>
                data.forEach(room => this.rooms.push(room))))
    },
    template:
        '<div><room-row v-for="room in rooms" :key="room.id" :room="room" /></div>'
});

new Vue({
    el: '#app',
    template: '<rooms-list/>'
});