const validator = require('validator');

const validateUrl = (req, res, next) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: 'URL is required' });
  }

  if (!validator.isURL(originalUrl, { protocols: ['http', 'https'] })) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  // Do NOT escape the URL as it breaks redirection
  req.body.originalUrl = originalUrl.trim();
  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  req.body.email = validator.normalizeEmail(email);
  next();
};

const sanitizeInput = (req, res, next) => {
  for (const key in req.body) {
    if (typeof req.body[key] === 'string') {
      // Skip escaping for URLs to prevent redirection issues
      if (key !== 'originalUrl' && key !== 'url') {
        req.body[key] = validator.escape(req.body[key].trim());
      }
    }
  }
  next();
};

module.exports = { validateUrl, validateEmail, sanitizeInput };