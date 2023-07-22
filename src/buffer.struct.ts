/*--------------------------
 * Created by: VNDG.
 * Package: blazing-buffer
 *-------------------------*/

import { BufferNode, DataBufferQueue } from "./types";

/**
 * Just returns BufferNode<T> object withing any external calls
 * 
 * @param toStore: T data to be stored in node
 * @returns object that implements BufferNode<T> interface
 */
function createQueueNode<T extends any>(toStore: T): BufferNode<T> {
    return { stored: toStore, next: undefined };
};


/**
 * Creates new buffer
 * @returns DataBufferQueue<T> 
 */
export function createDataBuffer<T extends any>(): DataBufferQueue<T> {
    let n_head: BufferNode<T>|undefined = undefined;
    let n_tail: BufferNode<T>|undefined = undefined;

    function send(data: T): void {
        if (n_head !== undefined) {
            n_tail!.next = createQueueNode<T>(data);
            n_tail = n_tail!.next;
            return;
        };
        n_head = createQueueNode<T>(data);
        n_tail = n_head;
        return;
    };

    function read(): T|undefined {
        if (n_head !== undefined) {
            const ret_buffer = n_head.stored;
            n_head = n_head.next;
            return ret_buffer;
        };
        return undefined;
    };

    function flush(): T[] {
        const ret_buffer: T[] = [];
        while (n_head) {
            ret_buffer.push(n_head.stored);
            n_head = n_head.next;
        };
        return ret_buffer;
    };

    return { send, read, flush };
};