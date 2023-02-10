class Config {
  public static serverUrl: string;
  public static imageUrl: string;

  public static _initialize() {
    if (process.env.NODE_ENV === "production") {
      Config.serverUrl = "https://travel-planner-gv.herokuapp.com";
      Config.imageUrl = "https://travel-planner-gv.s3.eu-central-1.amazonaws.com/"
    } else {
      Config.serverUrl = "http://localhost:3001";
      Config.imageUrl = "http://localhost:3001/api/destinations/images/";
    }
  }

  public imagesUrl = Config.imageUrl;

  public registerUrl = Config.serverUrl + "/api/auth/register/";
  public loginUrl = Config.serverUrl + "/api/auth/login/";

  public destinationsUrl = Config.serverUrl + "/api/destinations/";
  public vacationsUrl = Config.serverUrl + "/api/vacations/";

  public followerUrl = Config.serverUrl + "/api/followers/";
  public followerFilterUrl = Config.serverUrl + "/api/followers-";
  public followedFilterUrl = Config.serverUrl + "/api/followed-";

  public vacationFollowersCountUrl =
    Config.serverUrl + "/api/vacation-followers-count";
  public destinationFollowersCountUrl =
    Config.serverUrl + "/api/destination-followers-count";
}

Config._initialize();

const appConfig = new Config();

export default appConfig;
