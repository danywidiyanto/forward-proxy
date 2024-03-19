# Forward Proxy in Node.js

This repository contains a simple forward proxy implementation in Node.js.

## Installation

1. Clone the repository:

    ```
    git clone https://github.com/your_username/forward-proxy-nodejs.git
    ```

2. Navigate to the project directory:

    ```
    cd forward-proxy-nodejs
    ```

3. Run the proxy server:

    ```
    node proxy.js
    ```

## How to Use Forward Proxy

You can use the forward proxy by configuring your `curl` command with the `-x` option:

curl -x http://localhost:3456 https://www.google.com


This command will make a request to `https://www.google.com` through the forward proxy running on `localhost:3456`.

### Additional Features:

1. The proxy automatically appends 'NODEJS' to the response body if it detects 'HTML' (case insensitive) in HTTP responses.

## Assumptions and Constraints

- This implementation does not use any external libraries.
- Node.js version 14 or higher is required.
- The proxy supports both HTTP and HTTPS connections.

