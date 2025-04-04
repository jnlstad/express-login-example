import db from "../sequelize.js";
import { comparePassword, sha256 } from "../utils/hash.js";
import { v4 as uuidv4 } from "uuid";

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

    if (!isSamePassword) {
      return res.status(401).send("Wrong password or username");
    }

    const SESSION_TOKEN = uuidv4();
    const HASHED_SESSION_TOKEN = await sha256(SESSION_TOKEN);

    const result = await db.query(
      "SELECT user_id FROM t_users WHERE username = :username",
      { replacements: { username } }
    );
    const ID = result[0][0].user_id;

    await db.query(
      "INSERT INTO t_sessions(user_id, token) VALUES (:id, :token)",
      {
        replacements: { id: ID, token: HASHED_SESSION_TOKEN },
      }
    );

    res.cookie("session_token", SESSION_TOKEN, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 1000 * 60 * 60,
    });

    res.send(SESSION_TOKEN);
  } catch (err) {
    console.log(err);
    return res.status(500).send("An internal server error has occured");
  }
};
