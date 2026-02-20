import { Model } from "jcc-express-mvc/Eloquent";
import { User } from "./User";
import { Job } from "./Job";

export class SavedJob extends Model {
  protected fillable: string[] = ["user_id", "job_id"];

  user() {
    return this.belongsTo(User, "user_id");
  }

  job() {
    return this.belongsTo(Job, "job_id");
  }
}
