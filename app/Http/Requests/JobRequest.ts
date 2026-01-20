import { FormRequest } from "jcc-express-mvc/Core/FormRequest";
import { ValidationException } from "jcc-express-mvc/lib/Error/ValidationException";
import { Request } from "jcc-express-mvc";
import { Job } from "@/Model/Job";
import { Category } from "@/Model/Category";
import { JobInterface } from "@/Model/Interface";

export class JobRequest extends FormRequest {
  constructor(req: Request) {
    super(req);
  }

  async rules() {
    await this.validate({
      title: ["required", "min:5", "max:200"],
      description: ["required", "min:50"],
      category: ["required"],
      type: ["required"],
      // budgetMin: ["num", "min:0"],
      // budgetMax: ["num", "min:0"],
      tags: ["nullable"],
    });

    // Validate budget max is greater than min
    const budgetMin = parseFloat(this.input("budgetMin") || "0");
    const budgetMax = parseFloat(this.input("budgetMax") || "0");
    if (budgetMax < budgetMin) {
      console.log("budgetMax < budgetMin");
      throw new ValidationException(
        { budgetMax: "Maximum budget must be greater than minimum budget" },
        this.req,
      );
    }
  }

  async save() {
    const tags = this.input("tags")
      ? this.input("tags")
          .split(",")
          .map((tag: string) => tag.trim())
          .filter((tag: string) => tag.length > 0)
      : [];

    // Look up category by name if category is a string, otherwise use as ID
    let categoryId = this.input("category");
    if (typeof categoryId === "string" && isNaN(Number(categoryId))) {
      const category = await Category.where("name", categoryId).first();
      if (category) {
        categoryId = (category as any).id;
      } else {
        throw new ValidationException(
          { category: "Category not found" },
          this.req,
        );
      }
    }

    const job: JobInterface = this.route("job")
      ? await Job.find(this.route("job"))
      : (new Job() as any);

    job.user_id = this.req.user?.id;
    job.title = this.input("title");
    job.description = this.input("description");
    job.category_id = categoryId;
    job.type = this.input("type");
    job.budget_min = parseFloat(this.input("budgetMin"));
    job.budget_max = parseFloat(this.input("budgetMax"));
    job.tags = tags;
    job.featured =
      this.input("featured") === "true" || this.input("featured") === true;
    job.status = "active";

    return job.save();
  }
}
