# blazing-buffer-typescript
Lightweight fully functional queue-like buffer for a specific task pool where it's used as an ordered buffer where data takeout rate almost the same as embedding or timings are optimized

## Documentation
**Create a new buffer with function**.
```ts
const buffer = createDataBuffer<yourType>();
```
> It does not have any underlying overhead or another function calls, so feel free not to go inspecting source files

**Send data to buffer**
```ts
buffer.send(yourTypeData1);
```

**Send data to buffer**
```ts
const data = buffer.read();
if (data !== undefined) {
  // buffer does not contain yourTypeData1 anymore
  // typeof data === 'yourType'...
}
```
**Flush buffer and read everything within**
```ts
buffer.send(yourTypeData2);
buffer.send(yourTypeData3);
buffer.send(yourTypeData4);

const buffer_dump: yourType[] = buffer.flush();
// buffer is empty...
```

```ts
// Alternatuve way of reading
buffer.flush().forEach((data) => ...);
```
