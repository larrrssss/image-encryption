# Encrpyt Images

## Install

```sh
npm install image-encryption
```

## Usage

```ts
import { encrypt, decrypt } from 'image-encryption';
import fs from 'fs';
import path from 'path';

const key = 'My secret key';
const image = fs.readFileSync(path.join(__dirname, 'image.png'));

const encryptedBuffer = encrypt(image, key);

const decryptedImage = decrypt(encryptedBuffer, key);
```
