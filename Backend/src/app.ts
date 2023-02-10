import express, { request, response } from "express";
import expressFileUpload from "express-fileupload";
import cors from "cors";
import catchAll from "./3-middleware/catch-all";
import logRequest from "./3-middleware/log-request";
import destinationController from "./6-controllers/destination-controller";
import vacationController from "./6-controllers/vacation-controller";
import followerController from "./6-controllers/follower-controller";
import authController from "./6-controllers/auth-controller";
import expressRateLimit from "express-rate-limit";
import path from "path";
import sanitize from "./2-utils/sanitize";

const server = express();



server.use(cors());
server.use(
  "/api/",
  expressRateLimit({
    max: 100,
    windowMs: 1000,
    message: "Please don't DoS attack us :<",
  })
);

server.use(express.json());
server.use(expressFileUpload());

server.use(express.static(path.join(__dirname, "./_front-end")));

server.use(sanitize);
server.use(logRequest);

server.use("/api", authController);
server.use("/api", vacationController);
server.use("/api", destinationController);
server.use("/api", followerController);
server.use("*", (request, response) => {
  response.sendFile(path.join(__dirname, "./_front-end/index.html"));
});
server.use(catchAll);

const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
