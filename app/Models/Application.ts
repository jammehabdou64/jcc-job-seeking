import { Model } from "jcc-express-mvc/Eloquent";
import { User } from "./User";
import { Job } from "./Job";

export class Application extends Model {
  protected fillable: string[] = [
    "user_id",
    "job_id",
    "message",
    "bid_amount",
    "status",
    "cv",
  ];

  protected static casts: Record<string, string> = {
    bid_amount: "number",
  };

  user() {
    return this.belongsTo(User, "user_id");
  }

  job() {
    return this.belongsTo(Job, "job_id");
  }
}
