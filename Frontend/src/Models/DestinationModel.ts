class DestinationModel {
  public destinationId: number;
  public destinationName: string;
  public description: string;
  public image: FileList;
  public imageName: string;

  public static nameValidation = {
    required: { value: true, message: "Missing Destination's Name" },
    minLength: { value: 2, message: "Name Too Short" },
    maxLength: { value: 20, message: "Name Too Long" },
  };

  public static descriptionValidation = {
    required: { value: true, message: "Missing Destination's Description" },
    minLength: { value: 2, message: "Description Too Short" },
    maxLength: { value: 250, message: "Description Too Long" },
  };

  public static imageValidation = {
    required: { value: true, message: "Missing Image" },
  };
}

export default DestinationModel;
