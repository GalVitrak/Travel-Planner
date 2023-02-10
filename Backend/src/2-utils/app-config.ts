class AppConfig {
}

// Development config:
class DevelopmentConfig extends AppConfig {
  public isDevelopment = true;
  public isProduction = false;
  public host = "localhost";
  public user = "root";
  public password = "";
  public database = "holidayplanner";
  public port = 3001;
  public frontEndUrl = "http://localhost:3000";
}

// Production config:
class ProductionConfig extends AppConfig {
  public isDevelopment = false;
  public isProduction = true;
  public host = "eu-cdbr-west-03.cleardb.net";
  public user = "bf0df7d018c3d0";
  public password = "7d98a922";
  public database = "heroku_63afc2f1dd819fb";

}

const appConfig =
  process.env.NODE_ENV === "production"
    ? new ProductionConfig()
    : new DevelopmentConfig();

export default appConfig;
