/*--------------------------
 * Created by: VNDG.
 * Package: blazing-buffer
 *-------------------------*/

/**
 * Buffer internal node struct to implement FIFO data manipulation principles
 * Can be used as a wrapper at any data type - T
 * 
 * @field stored: T - stored value
 * @field next: BufferNode<T>|undefined - next node pointer
 */
export interface BufferNode<T extends any> {
    stored: T;
    next: BufferNode<T>|undefined;
};


/**
 * Buffer controller interface
 */
export interface DataBufferQueue<T extends any> {
    /**
     * puts data to the buffer
     * @param data 
     */
    send(data: T): void;
    /**
     * pops data from buffer due to sending order
     */
    read(): T|undefined;
    /**
     * flushes buffer and returns iterable array filled with all data stored within (empty if nothing was stored)
     */
    flush(): T[];
};