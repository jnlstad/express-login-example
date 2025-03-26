import db from "../sequelize.js";

export const getUser = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send("Missing ID");
  }

  try {
    const result = await db.query("SELECT * FROM t_users WHERE user_id = :id", {
      replacements: { id: id },
    });
    return res.send(result);
  } catch (err) {
    return res.status(500).send("An Internal Error has Occured");
  }
};
