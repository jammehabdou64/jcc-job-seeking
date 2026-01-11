import { Schema } from "jcc-express-mvc/Eloquent";

export class Migration {
  up() {
    return Schema.create("categories", (table) => {
      table.id();
      table.string("name").unique();
      table.string("slug").unique();
      table.text("description").nullable();
      table.string("icon").nullable();
      table.integer("job_count").default(0);
      table.timestamps();
      table.softDeletes();
    });
  }

  down() {
    return Schema.dropTable("categories");
  }
}
