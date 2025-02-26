export const verifyLogin = async (req, res, next) => {
  if (false) {
    return res.status(401).send("Action is not allowed");
  }
  return next();
};
