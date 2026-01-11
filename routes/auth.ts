import { AuthController } from "@Controllers/AuthController";
import { Auth } from "jcc-express-mvc";
import { Route } from "jcc-express-mvc/Core";

Route.prefix("/auth").group((Route) => {
  Route.post("/login", Auth.attempt);
  Route.post("/register", [AuthController, "register"]);
});

Route.middleware("guest").get("/login", (req, res) =>
  res.inertia("Auth/Login"),
);

Route.middleware("guest").get("/register", (req, res) =>
  res.inertia("Auth/Register"),
);

Route.middleware("guest").get("/forgot-password", (req, res) =>
  res.inertia("Auth/ForgotPassword"),
);

Route.get("/logout", Auth.logout);
