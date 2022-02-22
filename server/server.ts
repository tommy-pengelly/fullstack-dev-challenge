import cors from "cors";
import express from "express";
import { __prod__ } from "./utils/constants";
import CalculatorRoutes from "./routes/CalculatorRoutes";

const app = express();

app.use(cors());

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (__prod__) {
  app.use(express.static("client/build"));
}

app.use("/api/calculator", CalculatorRoutes);

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
