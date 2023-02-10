import { OkPacket } from "mysql";
import cyber from "../2-utils/cyber";
import dal from "../2-utils/dal";
import CredentialsModel from "../4-models/credentials-model";
import {
  ResourceNotFoundErrorModel,
  UnauthorizedError,
  ValidationErrorModel,
} from "../4-models/error-models";
import RoleModel from "../4-models/role-model";
import UserModel from "../4-models/user-model";

//register a new user
async function register(user: UserModel): Promise<string> {
  const err = user.validate();
  if (err) throw new ValidationErrorModel(err);
  if (await isUsernameTaken(user.username))
    throw new UnauthorizedError(`Username ${user.username} is already taken`);

  user.password = cyber.hash(user.password);
  // set default role - user
  user.role = RoleModel.User;
  const sql = `INSERT INTO users VALUES(DEFAULT,?,?,?,?,?)`;
  const info: OkPacket = await dal.execute(sql, [
    user.firstName,
    user.lastName,
    user.username,
    user.password,
    user.role,
  ]);
  user.userId = info.insertId;
  const token = cyber.getNewToken(user);
  return token;
}

// login function
async function login(credentials: CredentialsModel): Promise<string> {
  const err = credentials.validate();
  if (err) throw new ValidationErrorModel(err);
  credentials.password = cyber.hash(credentials.password);

  const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
  const users = await dal.execute(sql, [
    credentials.username,
    credentials.password,
  ]);
  if (users.length === 0)
    throw new UnauthorizedError("Incorrect Username or Password");
  const user = users[0];
  const token = cyber.getNewToken(user);
  return token;
}

// a function to check if the username has already been registered.
async function isUsernameTaken(username: string): Promise<boolean> {
  const sql = `SELECT COUNT(*) AS count FROM users WHERE username = ?`;
  const count = await dal.execute(sql, [username]);

  return count[0].count > 0;
}

export default {
  register,
  login,
};

//Paris, the city of Love. With a lot of baguettes and croissants (and sometimes snails) Fall in love in the beautiful destination.
