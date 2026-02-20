import { Schema } from "jcc-express-mvc/Eloquent";

export class Migration {
  up() {
    return Schema.table("users", (table) => {
      table.string("bio").nullable();
    });
  }

  down() {
    return Schema.table("users", (table) => {
      table.dropColumns("bio");
    });
  }
}
