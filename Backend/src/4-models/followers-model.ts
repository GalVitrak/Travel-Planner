import Joi from "joi";

class FollowersModel {
  public vacationId: number;
  public userId: number;

  public constructor(followers: FollowersModel) {
    this.vacationId = followers.vacationId;
    this.userId = followers.userId;
  }

  public static validationSchema = Joi.object({
    vacationId: Joi.number().required().positive().integer(),
    userId: Joi.number().required().positive().integer(),
  });

  public validate(): string {
    const result = FollowersModel.validationSchema.validate(this);
    return result.error?.message;
  }
}

export default FollowersModel;
