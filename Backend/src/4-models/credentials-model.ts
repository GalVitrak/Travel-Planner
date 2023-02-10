import Joi from "joi";

class CredentialsModel {
  public username: string;
  public password: string;

  public constructor(credentials: CredentialsModel) {
    this.username = credentials.username;
    this.password = credentials.password;
  }

  public static validationSchema = Joi.object({
    username: Joi.string().required().min(2).max(15),
    password: Joi.string().required().min(2).max(20),
  });

  public validate(): string {
    const result = CredentialsModel.validationSchema.validate(this);
    return result.error?.message;
  }
}

export default CredentialsModel;
