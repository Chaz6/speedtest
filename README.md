# speedtest

This is a simple speed server that is built with Node.js. A Dockerfile is included for your convenience.

# Run

node ./src/speed.js

Access the server at http://localhost:8080 by providing a size, optionally followed by a unit. The following units are supported:-

- `MB`
- `MiB`
- `GB`
- `GiB`

Example urls:-

- http://localhost:8080/123MiB
- http://localhost:8080/42GiB
- http://localhost:8080/682MB
- http://localhost:8080/19GB
- http://localhost:8080/2453957

# Default behaviors/config

The following environment variables can be set to alter the default behavior:-

- `LISTEN_HOST`
- `LISTEN_PORT`
- `MAX_SIZE`

MIT License
===========

Copyright (c) 2025 Chris Hills
Copyright (c) 2012 Joshua Erickson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
