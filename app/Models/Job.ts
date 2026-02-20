import { Model } from "jcc-express-mvc/Eloquent";
import { User } from "./User";
import { Category } from "./Category";
import { Application } from "./Application";

export class Job extends Model {
  protected fillable: string[] = [
    "user_id",
    "category_id",
    "title",
    "slug",
    "description",
    "category",
    "type",
    "budget_min",
    "budget_max",
    "tags",
    "featured",
    "status",
    "applicants_count",
    "views_count",
  ];

  protected static casts: Record<string, string> = {
    budget_min: "number",
    budget_max: "number",
    featured: "boolean",
    tags: "array",
    created_at: "now",
  };

  // Relationship to user
  postedBy() {
    return this.belongsTo(User, "user_id");
  }

  // Relationship to category
  category() {
    return this.belongsTo(Category, "category_id");
  }

  applications() {
    return this.hasMany(Application, "job_id");
  }

  static booted(): void {
    this.creating((data) => {
      data.slug = str().slug(data.title, true);
    });

    this.updating((data) => {
      data.slug = str().slug(data.title, true);
    });
  }
}
