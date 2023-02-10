class VacationModel {
  public vacationId: number;
  public destinationId: number;
  public startDate: string;
  public endDate: string;
  public price: number;
  public isFollowing: number;
  public followersCount: number;

  public static destinationValidation = {
    required: { value: true, message: "You must choose a destination" },
  };

  public static priceValidation = {
    required: { value: true, message: "Missing Price" },
    min: { value: 99, message: "Price Can't be less than $99" },
    max: { value: 9999, message: "Price Can't be more than $9999" },
  };
  destinationName: any;
}

export default VacationModel;
