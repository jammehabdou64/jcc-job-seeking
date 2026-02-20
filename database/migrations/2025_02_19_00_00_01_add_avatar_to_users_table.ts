import { Schema } from "jcc-express-mvc/Eloquent";

export class Migration {
  up() {
    return Schema.table("users", (table) => {
      table.string("avatar").nullable();
    });
  }

  down() {
    return Schema.table("users", (table) => {
      table.dropColumns("avatar");
    });
  }
}
