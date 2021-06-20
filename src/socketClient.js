import io from "socket.io-client";

class SocketClient {
    ENDPOINT = "http://127.0.0.1:5000";
    socket = null
    constructor() {
        this.socket = io(this.ENDPOINT);
    }

    connectClient ({ onUpdateFromServer }) {
        this.socket.on('updateFromServer', (data) => {
            console.log('updateFrom the server');
            onUpdateFromServer(data)
        })
    }

    add(val) {
        this.socket.emit('add', val)
    }

    delete(id) {
        this.socket.emit('delete', id)

    }

    select(index) {
        this.socket.emit('select', index)

    }
}

export default SocketClient;

