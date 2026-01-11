import { Model } from "jcc-express-mvc/Eloquent";
import { Job } from "./Job";

export class Category extends Model {
  protected fillable: string[] = [
    "name",
    "slug",
    "description",
    "icon",
    "job_count",
  ];

  // Relationship to jobs
  jobs() {
    return this.hasMany(Job, "category_id");
  }

  static boot(): void {
    this.creating((data) => {
      data.slug = str().slug(data.name);
    });
  }
}
