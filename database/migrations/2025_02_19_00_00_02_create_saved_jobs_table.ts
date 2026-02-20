import { Schema } from "jcc-express-mvc/Eloquent";

export class Migration {
  up() {
    return Schema.create("saved_jobs", (table) => {
      table.id();
      table.unsignedBigInteger("user_id");
      table.unsignedBigInteger("job_id");
      table.timestamps();
    table.foreign("user_id").references("id").on("users").onDelete("cascade");
    table.foreign("job_id").references("id").on("jobs").onDelete("cascade");
    table.compositeUnique(["user_id", "job_id"]);
    });
  }

  down() {
    return Schema.dropTable("saved_jobs");
  }
}
