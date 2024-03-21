# async-await-error-handler

`async-await-error-handler` is a lightweight JavaScript library designed to simplify error handling in asynchronous
operations, particularly with promises and async/await syntax in Node.js applications. It offers a more elegant
alternative to traditional try-catch blocks, making your code cleaner and easier to maintain.

## Features

- Custom Error Classes: Differentiate between operational and programmer errors for more nuanced handling.
- Customizable Error Handling: Inject custom logic to handle errors precisely as needed.
- Error Logging: Integrated error logging capabilities, with support for custom logging strategies.
- Flexible Response Formatting: Customize how error responses are formatted and returned to clients.

## Installation

Install the package with npm:

```bash
npm install async-await-error-handler
```

Or with yarn:

```bash
yarn add async-await-error-handler
```

## Usage

### Basic Usage

Wrap your async route handlers to automatically catch and handle errors.

```javascript
const express = require('express');
const { catchErrors } = require('async-await-error-handler');

const app = express();

app.get('/example', catchErrors(async (req, res) => {
// your async code here
}));

app.use((err, req, res, next) => {
  res.status(500).send('Something broke!');
});
```

### Advanced Usage

Utilize custom error classes and enhanced error handling features for more complex scenarios.

```javascript
const { asyncHandler, OperationalError, errorHandlerWithLogging } = require('async-await-error-handler');

app.get('/example', asyncHandler(async (req, res) => {
  if (!req.query.id) {
    throw new OperationalError("Missing 'id' query parameter");
  }
// async operation
}, errorHandlerWithLogging));
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or create an issue for any bugs or feature
requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
