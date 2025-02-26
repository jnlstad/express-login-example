import db from "../sequelize.js";
import { comparePassword } from "../utils/hash.js";

export const login = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username) {
    return res.status(400).send("Missing username in body");
  }
  if (!password) {
    return res.status(400).send("Missing password in body");
  }

  try {
    const isSamePassword = await comparePassword(username, password);

    if (isSamePassword) {
      return res.send("Logged in");
    }
    return res.status(401).send("Wrong password or username");
  } catch (err) {
    return res.status(500).send("An internal server error has occured");
  }
};
