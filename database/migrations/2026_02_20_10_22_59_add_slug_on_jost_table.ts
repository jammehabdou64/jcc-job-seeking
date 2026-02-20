import { Schema } from "jcc-express-mvc/Eloquent";
export class Migration {
  up() {
    return Schema.table("jobs", (table) => {
      table.string("slug").nullable();
    });
  }

  down() {
    return Schema.table("jobs", (table) => {
      table.dropColumns("slug");
    });
  }
}
