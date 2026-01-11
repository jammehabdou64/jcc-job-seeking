import { Schema } from "jcc-express-mvc/Eloquent";
export class Migration {
  up() {
    return Schema.create("users", (table) => {
      table.id();
      table.string("name");
      table.string("email").unique();
      table.string("password");
      table.enum("role", ["admin", "employer", "employee"]).default("employee");
      table.timestamps();
      table.softDeletes();
    });
  }

  down() {
    return Schema.dropTable("users");
  }
}
