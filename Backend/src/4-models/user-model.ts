import RoleModel from "./role-model";
import Joi from "joi";

class UserModel {
  public userId: number;
  public firstName: string;
  public lastName: string;
  public username: string;
  public password: string;
  public role: RoleModel;

  public constructor(user: UserModel) {
    this.userId = user.userId;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.username = user.username;
    this.password = user.password;
    this.role = user.role;
  }

  public static validationSchema = Joi.object({
    userId: Joi.number().optional().integer().positive(),
    firstName: Joi.string().required().min(2).max(15),
    lastName: Joi.string().required().min(2).max(15),
    username: Joi.string().required().min(2).max(15),
    password: Joi.string().required().min(2).max(20),
    role: Joi.forbidden(),
  });

  public validate(): string {
    const result = UserModel.validationSchema.validate(this);
    return result.error?.message;
  }
}

export default UserModel;
