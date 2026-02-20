import { Model } from "jcc-express-mvc/Eloquent";
import { Job } from "./Job";
import { SavedJob } from "./SavedJob";
import { Application } from "./Application";

export class User extends Model {
  protected fillable: string[] = [
    "name",
    "email",
    "password",
    "bio",
    "avatar",
    "email_notifications",
    "job_alerts",
    "application_updates",
  ];
  protected hidden: string[] = ["password"];

  protected static casts: Record<string, string> = {
    email_notifications: "boolean",
    job_alerts: "boolean",
    application_updates: "boolean",
  };

  jobs() {
    return this.hasMany(Job, "user_id");
  }

  savedJobs() {
    return this.hasMany(SavedJob, "user_id");
  }

  applications() {
    return this.hasMany(Application, "user_id");
  }
}
