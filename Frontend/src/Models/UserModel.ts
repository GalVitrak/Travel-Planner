class UserModel {
  userId: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: string;

  public static fNameValidation = {
    required: { value: true, message: "Missing First Name" },
    minLength: { value: 2, message: "Name Too Short" },
    maxLength: { value: 15, message: "Name Too Long" },
  };

  public static lNameValidation = {
    required: { value: true, message: "Missing Last Name" },
    minLength: { value: 2, message: "Name Too Short" },
    maxLength: { value: 20, message: "Name Too Long" },
  };

  public static usernameValidation = {
    required: { value: true, message: "Missing Username" },
    minLength: { value: 4, message: "Username Too Short" },
    maxLength: { value: 15, message: "Username Too Long" },
  };

  public static passwordValidation = {
    required: { value: true, message: "Missing Password" },
    minLength: { value: 5, message: "Password Too Short" },
    maxLength: { value: 15, message: "Password Too Long" },
  };
}

export default UserModel;
