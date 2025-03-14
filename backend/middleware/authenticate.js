import db from "../sequelize.js";
import { sha256 } from "../utils/hash.js";

export const authenticate = ({ permissions }) => {
  return async (req, res, next) => {
    const BEARER_TOKEN =
      req.headers.authorization || req.cookies.session_token
        ? "Bearer " + req.cookies.session_token
        : "";

    try {
      if (!BEARER_TOKEN || !BEARER_TOKEN.startsWith("Bearer")) {
        return res.status(401).send("Invalid Auth, Missing Bearer Token");
      }

      if (!permissions || permissions.length == 0) {
        return next();
      }

      const SESSION_TOKEN = BEARER_TOKEN.split(" ")[1];
      const HASHED_SESSION_TOKEN = await sha256(SESSION_TOKEN);

      const result = await db.query(
        `
    SELECT DISTINCT perm.permission_name FROM t_sessions s
    JOIN t_users u ON u.id = s.id
    JOIN t_user_permissions p ON p.user_id = u.id
    JOIN t_permissions perm ON p.permission_id = perm.id
    WHERE token = :HASHED_SESSION_TOKEN AND valid_until > SYSUTCDATETIME()`,
        { replacements: { HASHED_SESSION_TOKEN } }
      );
      console.log(result);
      const USER_PERMISSIONS = result[0];

      const permissionSet = new Set(permissions);
      const doesHavePermission = USER_PERMISSIONS.some((userPermission) =>
        permissionSet.has(userPermission.permission_name)
      );
      if (doesHavePermission) {
        return next();
      } else {
        return res.status(401).send("You do not have permission for this");
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send("An unknown error has occurred");
    }

    return res.status(401).send("Unauthorized");
  };
};
