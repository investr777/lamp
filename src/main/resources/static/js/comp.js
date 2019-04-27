var RoomsApi = Vue.resource('/room{/id}');

connect()

Vue.component('rooms-list', {
    template: `<div>
      <h1 v-if="currentRoom">Вы в комнате № {{ currentRoom }}</h1>
      <h1 v-else>Выберите комнату</h1>
      <template v-for="room in rooms">
        <room-row
          v-bind="room"
          :current.sync="currentRoom"
          @update-room="onUpdateRoom" />
      </template>
    </div>`,
    props: {
        list: Array,
        current: Number
    },
    data() {
        return {
            rooms: this.$props.list,
            currentRoom: this.$props.current,
        }
    },
    methods: {
        onUpdateRoom(room) {
            const roomIndex = this.rooms
                .findIndex(item => item.id === room.id)

            this.rooms.splice(roomIndex, 1, room)
        }
    },
})

Vue.component('room-row', {
    template: `<div>
      <div v-if="isActiveRoom">
        <button type="button" @click="cameOut">Выйти из комнаты №{{ id }}</button><br/>
       <span v-if="activeLamp">
                    <img src="/img/on.jpg" @click="edit"/>
                </span>
                <span v-else>
                    <img src="/img/off.jpg" @click="edit"/>
                </span>
      </div>
      <div v-else-if="nonSelectedRoom">
        <button type="button" @click="comeIn">Войти в комнату №{{ id }}</button>
      </div>
    </div>`,
    props: {
        id: Number,
        activeLamp: Boolean,
        current: Number,
    },
    data() {
        return {
            active: this.$props.activeLamp
        }
    },
    computed: {
        isActiveRoom() {
            return this.current === this.id
        },
        nonSelectedRoom() {
            return !this.current
        }
    },
    methods: {
        edit: function () {
            var room = {activeLamp: true}
            sendRoom({id: this.id}, room)
        },
        comeIn() {
            this.$emit('update:current', this.id)
        },
        cameOut() {
            this.$emit('update:current', 0)
            this.$emit('update-room', {
                id: this.id,
                activeLamp: this.active
            })
        },
    }
})

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
    data: {
        rooms: {
            current: 0,
            list:[]
        }
    },
    created: function () {
        RoomsApi.get().then(result =>
            result.json().then(data =>
                data.forEach(room => this.rooms.list.push(room))))

        addHandler(data => {
            let index = getIndex(this.rooms.list, data.id)
            if (index > -1) {
                this.rooms.list.splice(index, 1, data)
            }
        })
    }
});