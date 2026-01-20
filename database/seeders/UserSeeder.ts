import { bcrypt } from "jcc-express-mvc";
import { User } from "../../app/Models/User";
import { UserInterface } from "@/Model/Interface";
export class UserSeeder {
  //

  async run() {
    const users:Partial<UserInterface>[] = [
      {
        name: "Administrator",
        email: "admin@example.com",
        password: await bcrypt("password"),
        role: "admin",
      },
      {
        name: "User",
        email: "user@example.com",
        password: await bcrypt("password"),
        role: "employee",
      },
      {
        name:"Lamin Jammeh",
        email:"lamin@example.com",
        password: await bcrypt("password"),
        role: "employer",
      }
    ];
    for (const user of users) {
      const existingUser = await User.where("email", user.email).first();
      if (!existingUser) {
        await User.create(user);
      }
    }
  }
}
