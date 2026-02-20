import { Schema } from "jcc-express-mvc/Eloquent";

export class Migration {
  up() {
    return Schema.table("applications", (table) => {
      table.string("cv").nullable();
    });
  }

  down() {
    return Schema.table("applications", (table) => {
      table.dropColumns("cv");
    });
  }
}
