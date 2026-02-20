import { Schema } from "jcc-express-mvc/Eloquent";

export class Migration {
  up() {
    return Schema.table("users", (table) => {
      table.boolean("email_notifications").default(true);
      table.boolean("job_alerts").default(true);
      table.boolean("application_updates").default(true);
    });
  }

  down() {
    return Schema.table("users", (table) => {
      table.dropColumns("email_notifications", "job_alerts", "application_updates");
    });
  }
}
