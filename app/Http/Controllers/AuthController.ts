import { Auth } from "jcc-express-mvc";
import { httpContext } from "jcc-express-mvc";
import { Inject, Method } from "jcc-express-mvc/Core/Dependency";
import { AuthRequest } from "@/Request/AuthRequest";
import { User } from "@/Model/User";

@Inject()
export class AuthController {
  @Method()
  async register({ req, res, next } = httpContext, authRequest: AuthRequest) {
    const save = await authRequest.save();
    return save
      ? Auth.attempt(req, res, next)
      : res.json({ message: "Invalid credentials" });
  }

  async login({ req, res, next } = httpContext) {
    return Auth.attempt(req, res, next);
  }

  @Method()
  async forgotPassword({ req, res } = httpContext) {
    await req.validate({
      email: ["required", "email"],
    });

    const email = req.input("email");
    const user = await User.where("email", email).first();

    // Always show success to prevent email enumeration
    if (req.expectsJson()) {
      return res.json({
        message:
          "If an account exists with that email, we've sent password reset instructions.",
      });
    }

    return res
      .with(
        "status",
        "If an account exists with that email, we've sent password reset instructions."
      )
      .redirect("/forgot-password");
  }
}
