// Make it modular

import db from "../sequelize.js";

export const editUser = async (req, res, next) => {
  const { username, password, name, age, address } = req.body;
  const { id } = req.params;

  const setters = [];
  let values = {};

  if (username) {
    setters.push("username = :username");
    values = { ...values, username: username };
  }
  if (password) {
    setters.push("password = :password");
    values = { ...values, password: password };
  }
  if (name) {
    setters.push("name = :name");
    values = { ...values, name: name };
  }
  if (age) {
    setters.push("age = :age");
    values = { ...values, age: parseInt(age) };
  }
  if (address) {
    setters.push("username = :username");
    values = { ...values, address: address };
  }

  if (!setters) {
    res.status(400).send("Missing inserts");
  }
  if (!id) {
    res.status(400).send("Missing id");
  }

  try {
    const result = await db.query(
      `UPDATE t_users SET ${setters.join(",")} WHERE user_id = :id`,
      {
        replacements: { ...values, id: id },
      }
    );
    return res.send("Successfully updated");
  } catch (err) {
    console.log(err);
    return res.status(500).send("An internal error has occurred");
  }
};
