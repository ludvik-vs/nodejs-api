const responseMiddleware = (req, res) => {
  if (res.err) {
    let statusCode = 400;
    let message = 'An error occurred';

    // Check for specific error messages to determine status code and message
    if (res.err.message === 'User not found' || res.err.message === 'Fighter not found') {
      statusCode = 404;
      message = res.err.message;
    } else if (res.err.message) {
      message = res.err.message;
    }

    res.status(statusCode).json({ error: true, message: message });
  } else {
    res.status(200).json(res.data);
  }
};

export { responseMiddleware };
