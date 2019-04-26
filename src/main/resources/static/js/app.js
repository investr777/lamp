var RoomsApi = Vue.resource('/rooms');

Vue.component('room-row', {
    props: ['room'],
    template: '<tr>' +
        '<td>Комнта №{{room.id}}:</td>' +
        '<td>Лампочка {{room.isActiveLamp}}</td>' +
        '</tr>'
});

Vue.component('rooms-list', {
    props: ['rooms'],
    template: '<table>' +
        '<tbody>' +
        '<tr is="room-row" v-for="room in rooms" :key="room.id" :room="room"></tr>' +
        '</tbody>' +
        '</table>',
});

var app = new Vue({
    el: '#app',
    template: '<rooms-list :rooms="rooms"/>',
    data: {
        rooms: []
    },
    created: function () {
        RoomsApi.get().then(result =>
        result.json().then(data =>
        data.forEach(room => this.rooms.push(room))))
    }
});