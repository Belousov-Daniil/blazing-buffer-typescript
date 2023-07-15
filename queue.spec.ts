
import {createDataBuffer} from './buffer.struct'

export function DescribeFastQueueForeach(): boolean {
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
