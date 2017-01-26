const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null
        this._tail = null
        this.length = 0
    }

    append(data) {
        let newNode = new Node(data)

        if (this.isEmpty()) {
            this._tail = newNode
            this._head = this._tail
        }
        else{
            this._tail.next = newNode
            newNode.prev = this._tail
            this._tail = newNode
        }

        this.length += 1
        return this
    }

    head() {
        return this._head.data
    }

    tail() {
        return this._tail.data
    }

    at(index) {
        let node = this._head
        for (let i = 0; i < index; i++){
            node = node.next
        }

        return node.data
    }

    insertAt(index, data) {
        let newNode = new Node(data)
        let node = this._head

        for (let i = 0; i < index; i++){
            node = node.next
        }
        if (this.isEmpty() || index == this.length) {
            this.append(data)
        }
        else if (node.prev == null) {
            this._head.prev = newNode
            newNode.next = this._head
            this._head = newNode
        }
        else {
            newNode.next = node
            newNode.prev = node.prev
            node.prev.next = newNode
            node.prev = newNode
        }

        this.length += 1
        return this
    }

    isEmpty() {
        return this.length == 0
    }

    clear() {
        for (let node = this._head; node != null; ){
            let next = node.next
            node.data = null;
            node.next = null;
            node.prev = null;
            node = next;
        }

        this.length = 0
        return this
    }

    deleteAt(index) {
        let node = this._head

        for (let i = 0; i < index; i++){
            node = node.next
        }

        const prev = node.prev
        const next = node.next

        if (prev == null && next == null ){
            this.clear()
        }
        else if (next == null){
            this._tail.prev.next = null
            node.prev = this._tail
        }
        else if (prev == null){
            this._head =  node.next
            this._head.prev = null
        }
        else{
            next.prev = prev
            prev.next = next
            }

        node.data = null
        node.next = null
        node.prev = null
        this.length -= 1
        return this
    }

    reverse() {
        let temp = null;
        let current = this._head;

        while (current != null) {
            temp = current.prev;
            current.prev = current.next;
            current.next = temp;
            current = current.prev;
        }

        if (temp != null) {
            this._tail = this._head
            this._head = temp.prev;
        }
        return this
    }

    indexOf(data) {
        let index = 0
        for (let node = this._head; node != null; node = node.next) {
            if (node.data == data)
                return index;
            index++;
        }
        return -1;
    }
}

module.exports = LinkedList;
