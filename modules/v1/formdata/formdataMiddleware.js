const middlewareNext = (req, res, next) => {
  // insert your middleware here
  next()
};

const formdataMiddleware = {
  middlewareNext,
};

module.exports = formdataMiddleware;
