import db from "../sequelize.js";
import { hashPassword } from "../utils/hash.js";

// Make a new user

// Username, Password, Name, Age, Address
// req.body, includes all of them

export const createUser = async (req, res, next) => {
  const { username, password, name, age, address } = req.body;

  if (!username) {
    return res.status(400).send("Missing Username");
  } else if (!password) {
    return res.status(400).send("Missing Password");
  } else if (!name) {
    return res.status(400).send("Missing name");
  } else if (!age) {
    return res.status(400).send("Missing age");
  } else if (!address) {
    return res.status(400).send("Missing address");
  }

  try {
    if (await doesUserExist(username)) {
      return res.status(400).send("Username already exists, smartass");
    }

    const result = await db.query(
      "INSERT INTO t_users(username, password, age, name, address) VALUES (:username, :password, :age, :name, :address)",
      {
        replacements: {
          username: username,
          password: await hashPassword(password),
          name: name,
          age: parseInt(age),
          address: address,
        },
        type: db.QueryTypes.INSERT,
      }
    );

    console.log(result);
    return res.send("Create User");
  } catch (err) {
    console.log(err);
    return res.status(500).send("An error has occured");
  }
};

async function doesUserExist(username) {
  try {
    const result = await db.query(
      "SELECT * FROM t_users WHERE username = :username",
      { replacements: { username: username } }
    );
    if (!result[0][0]) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    throw err;
  }
}
