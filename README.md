# blazing-buffer-typescript
*Lightweight fully functional queue-like buffer for a specific task pool where it's used as an ordered buffer where data takeout rate almost the same as embedding or timings are optimized*

#### install
```bash
npm i @rdmt-studios/blazing-buffer
```

## Safe method passing

Buffer does not implemented as an object, it's just an interface to access function scope data, that's why methods does not depend on context, so you wound never face a context loss when passing method as an argument (callback), it's safe.

For example you can hide full interface from entity, giving it access only to use send or flush method.

```ts
class CustomAlerter extends HTMLElement {
  constructor(bufferSender: (data: string) => void) {
    super();
    this.onclick = bufferSender('clicked');
  };
};

class CustomConsole extends HTMLElement {
  constructor(bufferFlusher: () => string[]) {
    super();
    const button = customConsole.createDisplayButton();
    button.onclick = () => {
      this.textContent = bufferFlusher().join('\n');
    };
    this.appendChild(button);
  };

  private static createDisplayButton(): HTMLButtonElement {
    const node = document.createElement('button');
    node.textContent = 'Flush buffer';
    return node;
  };
};

function createConsole(): void {
  const buffer = createDataBuffer<string>();

  documen.body.append(
    new CustomAlerter(buffer.send),
    new CustomConsole(buffer.flush),
  );
}
```

## Usage
#### Creating new buffer
```ts
const buffer = createDataBuffer<yourType>();
```
> It does not have any underlying overhead or another function calls, so feel free not to go inspecting source files

#### Store

`send(data: T)` method puts data to buffer, saving order, time complexity `O(const)`

```ts
buffer.send(yourTypeData1);
```

#### Read

`read(data: T): void` takes out oldest stored data in buffer and removes it,time complexity `O(const)`

```ts
const data = buffer.read();
if (data !== undefined) {
  // buffer does not contain yourTypeData1 anymore
  // typeof data === 'yourType'...
}

```

#### Flush

`flush(): T[]` method clears buffer and returns it's "dump" as array, ordered is saved so elements is stored as they were stored in buffer, time complexity `O(n)`

```ts
buffer.send(yourTypeData2);
buffer.send(yourTypeData3);
buffer.send(yourTypeData4);

const buffer_dump: yourType[] = buffer.flush();
// buffer is empty...
```

#### Alternative way of reading

```ts
buffer.flush().forEach((data) => ...);
```


## Package api

Buffer contstructor
```ts
import {createDataBuffer} from 'blazing-buffer'
```

Buffer interface type
```ts
import {DataBufferQueue} from 'blazing-buffer'
```
