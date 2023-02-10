import Joi from "joi";

class VacationModel {
  public vacationId: number;
  public destinationId: number;
  public startDate: string;
  public endDate: string;
  public price: number;

  public constructor(vacation: VacationModel) {
    this.vacationId = vacation.vacationId;
    this.destinationId = vacation.destinationId;
    this.startDate = vacation.startDate;
    this.endDate = vacation.endDate;
    this.price = vacation.price;
  }

  public static validationSchema = Joi.object({
    vacationId: Joi.number().optional().positive().integer(),
    destinationId: Joi.number().required().positive().integer(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    price: Joi.number().required().positive().max(9999),
  });

  public validate(): string {
    const result = VacationModel.validationSchema.validate(this);
    return result.error?.message;
  }
}

export default VacationModel;
