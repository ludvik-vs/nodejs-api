const responseMiddleware = (req, res) => {
  if (res.err) {
    res.status(400).json({ error: res.err.message });
  } else {
    res.status(200).json(res.data);
  }
};

export { responseMiddleware };

