// Get all users
import db from "../sequelize.js";

export const getUsers = async (req, res, next) => {
  try {
    const result = await db.query("SELECT * FROM t_users");
    return res.json(result);
  } catch (err) {
    return res.status(500).send("An Internal Error has Occurred");
  }
};
