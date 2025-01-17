const { createConnection } = require("./database");
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function addUser(email, password) {
  const connection = await createConnection();
  const hashedPassword = bcrypt.hashSync(password, saltRounds);

  connection.connect();

  const query = "INSERT INTO user (email, password) VALUES (?, ?)";
  connection.execute(query, [email, hashedPassword]);

  connection.end();
}

async function authenticateUser(email, password) {
  const connection = await createConnection();

  connection.connect();

  const query = "SELECT * FROM user WHERE email = ?;";
  const [rows] = await connection.execute(query, [email]);
  const user = await rows[0];

  const match = await bcrypt.compare(password, user.password);

  if (match) {
    return true;
  }
  connection.end();
}

module.exports = { addUser, authenticateUser };
