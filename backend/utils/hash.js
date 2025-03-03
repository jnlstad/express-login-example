import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import db from "../sequelize.js";

const saltRounds = 10;

export async function hashPassword(password) {
  return await bcrypt.hash(password, saltRounds);
}

export async function comparePassword(username, password) {
  try {
    const result = await db.query(
      "SELECT password FROM t_users WHERE username = :username",
      {
        replacements: { username: username },
      }
    );
    const hash = result[0][0].password;
    return await bcrypt.compare(password, hash);
  } catch (err) {
    throw err;
  }
}

export async function sha256(text) {
  return CryptoJS.SHA256(text).toString(CryptoJS.enc.Hex);
}
