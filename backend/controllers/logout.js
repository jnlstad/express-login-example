import db from "../sequelize.js";
import { sha256 } from "../utils/hash.js";

export const logout = async (req, res, next) => {
  const BEARER_TOKEN =
    req.headers.authorization || req.cookies.session_token
      ? "Bearer " + req.cookies.session_token
      : "";

  try {
    const HASHED_SESSION_TOKEN = await sha256(BEARER_TOKEN.split(" ")[1]);

    const result = await db.query(
      "SELECT id FROM t_sessions WHERE token = :HASHED_SESSION_TOKEN",
      { replacements: { HASHED_SESSION_TOKEN } }
    );
    const ID = result[0][0].id;

    const updateResult = await db.query(
      "UPDATE t_sessions SET valid_until = SYSUTCDATETIME() WHERE id = :ID AND valid_until > SYSUTCDATETIME()",
      { replacements: { ID } }
    );

    //make the session_token cookie be removed from browser.
    //tip, it still uses res.cookie("session_token")
    res.cookie("session_token", "", {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 0,
    });

    res.send("logged out");
  } catch (err) {
    return res.status(500).send("An internal server error has occured");
  }
};
