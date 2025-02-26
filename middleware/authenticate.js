import db from "../sequelize.js";

export const authenticate = async (req, res, next) => {
  const BEARER_TOKEN = req.headers.authorization;

  try {
    if (!BEARER_TOKEN || !BEARER_TOKEN.startsWith("Bearer")) {
      return res.status(401).send("Invalid Auth, Missing Bearer Token");
    }

    const SESSION_TOKEN = BEARER_TOKEN.split(" ")[1];

    const result = await db.query(
      `
      select username from t_sessions 
      JOIN t_users ON t_sessions.id = t_users.id
      WHERE token = :SESSION_TOKEN AND valid_until > SYSUTCDATETIME()`,
      { replacements: { SESSION_TOKEN } }
    );

    const USERNAME = result?.[0]?.[0]?.username || "";
    if (USERNAME) {
      return next();
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("An unknown error has occurred");
  }

  return res.status(401).send("Unauthorized");
};
