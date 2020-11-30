# webssh

[![license][license-image]][license-url]

A web based ssh client.

## Principle

```
+---------+     http     +--------+    ssh    +------------+
| browser | <==========> | webssh | <=======> | ssh server |
+---------+   websocket  +--------+    ssh    +------------+
```

## Installation

`$ yarn install --production`

## Features

- Password authentication supported.
- Fullscreen terminal supported.
- $TERM `xterm-256color` supported.
- Modern browsers supported.

## License

[MIT][license-url] © AkiJoey

[license-image]: https://img.shields.io/github/license/akijoey/webssh
[license-url]: https://github.com/akijoey/webssh/blob/master/LICENSE
