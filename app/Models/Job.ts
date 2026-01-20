import { Model } from "jcc-express-mvc/Eloquent";
import { User } from "./User";
import { Category } from "./Category";

export class Job extends Model {
  protected fillable: string[] = [
    "user_id",
    "category_id",
    "title",
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
}
