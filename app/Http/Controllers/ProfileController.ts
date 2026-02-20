import { Inject, Method } from "jcc-express-mvc/Core/Dependency";
import { User } from "@/Model/User";
import { bcrypt, verifyHash } from "jcc-express-mvc";

@Inject()
export class ProfileController {
  //
  async show() {
    return inertia("Profile", {
      auth: auth()?.toJSON?.() || null,
    });
  }

  @Method()
  async update(user: User) {
    if (!user) {
      return response().status(404).json({ message: "User not found" });
    }
    const currentUser = auth();
    if (!currentUser || (currentUser as any).id !== (user as any).id) {
      return response().status(403).json({ message: "Unauthorized" });
    }

    await request().validate({
      name: ["required", "string", "max:255"],
      email: ["required", "email"],
      bio: ["nullable", "string", "max:1000"],
    });

    const data = await request().validated();
    //
    const updateData: Record<string, any> = {
      name: data.name,
      email: data.email,
    };
    if ("bio" in data && data.bio !== undefined) {
      updateData.bio = data.bio;
    }

    if (request().hasFile("avatar")) {
      updateData.avatar = request().file("avatar").store("avatars");
    }

    await user.update(updateData);

    return response()
      .with("success", "Profile updated successfully")
      .redirect(303, "/profile");
  }

  async updateNotifications() {
    const user = auth();
    if (!user) {
      return response().status(401).json({ message: "Unauthorized" });
    }

    await request().validate({
      email_notifications: ["nullable", "boolean"],
      job_alerts: ["nullable", "boolean"],
      application_updates: ["nullable", "boolean"],
    });

    const data = await request().validated();
    const toBool = (v: any) =>
      v === true || v === "true" || v === "1" || v === 1;
    await (user as any).update({
      email_notifications: toBool(data.email_notifications) ?? true,
      job_alerts: toBool(data.job_alerts) ?? true,
      application_updates: toBool(data.application_updates) ?? true,
    });

    return response()
      .with("success", "Notification preferences updated")
      .redirect(303, "/profile");
  }

  @Method()
  async updatePassword(user: User) {
    if (!user) {
      return response().status(404).json({ message: "User not found" });
    }

    await request().validate({
      currentPassword: ["required", "string"],
      password: ["required", "string", "min:8", "same:passwordConfirmation"],
      passwordConfirmation: ["required", "same:password"],
    });

    const isValid = await verifyHash(
      request().input("currentPassword"),
      auth().password,
    );
    if (!isValid) {
      return response()
        .with("error", "Current password is incorrect")
        .redirect(303, "/profile");
    }

    const newPassword = request().input("password") || request().body?.password;
    await user.update({
      password: await bcrypt(newPassword),
    });

    return response()
      .with("success", "Password updated successfully")
      .redirect(303, "/profile");
  }
}
