/*--------------------------
 * Created by: VNDG.
 * Package: blazing-buffer
 *-------------------------*/

import {createDataBuffer} from './buffer.struct'

export function DescribeFastQueueForeach(): boolean {
    console.log('Asserting - buffer sends and reads correctly');
    const buffer = createDataBuffer<number>();
    const values: number[] = [];
    for (let i = 0; i<50; i++) {
        values.push(i);
        buffer.send(i);
    };
    
    for (let i = 0; i<50; i++) {
        if (values[i] !== buffer.read()) return false;
        continue;
    };
    
    return true;
};


export function DescribeFastQueueForflush(): boolean {
    console.log('Asserting - if .flush() works properly');
    const buffer = createDataBuffer<number>();
    const values: number[] = [];
    for (let i = 0; i<50; i++) {
        values.push(i);
        buffer.send(i);
    };
    
    return buffer.flush().every((item, index) => item === values[index]);
};
