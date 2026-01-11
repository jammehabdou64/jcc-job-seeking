import { Category } from "@/Model/Category";
import { User } from "@/Model/User";
import { Schema } from "jcc-express-mvc/Eloquent";

export class Migration {
  up() {
    return Schema.create("jobs", (table) => {
      table.id();

      // table.foreignIdFor(User).onDelete("cascade");
      table.unsignedBigInteger("user_id");
      table.unsignedBigInteger("category_id");
      table.foreign("user_id").references("id").on("users").onDelete("cascade");
      table
        .foreign("category_id")
        .references("id")
        .on("categories")
        .onDelete("set null");
      // table.foreignIdFor(Category).nullable().onDelete("set null");
      table.string("title");
      table.text("description");
      table.enum("type", ["fixed", "hourly"]).default("fixed");
      table.decimal("budget_min", 10, 2);
      table.decimal("budget_max", 10, 2);
      table.json("tags").nullable();
      table.boolean("featured").default(false);
      table.enum("status", ["active", "closed", "draft"]).default("active");
      table.integer("applicants_count").default(0);
      table.integer("views_count").default(0);
      table.timestamps();
      table.softDeletes();

      // table.index("user_id");
      // table.index("category_id");
    });
  }

  down() {
    return Schema.dropTable("jobs");
  }
}
