import { Model } from "jcc-express-mvc/Eloquent";

export class User extends Model {
  protected hidden: string[] = ["password"];

  // Relationship to jobs
  jobs() {
    return this.hasMany("Job", "user_id");
  }
}
