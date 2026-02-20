import { Schema } from "jcc-express-mvc/Eloquent";

export class Migration {
  up() {
    return Schema.create("applications", (table) => {
      table.id();
      table.unsignedBigInteger("user_id");
      table.unsignedBigInteger("job_id");
      table.text("message").nullable();
      table.decimal("bid_amount", 10, 2).nullable();
      table.enum("status", ["pending", "accepted", "rejected"]).default("pending");
      table.timestamps();
      table.foreign("user_id").references("id").on("users").onDelete("cascade");
      table.foreign("job_id").references("id").on("jobs").onDelete("cascade");
    });
  }

  down() {
    return Schema.dropTable("applications");
  }
}
