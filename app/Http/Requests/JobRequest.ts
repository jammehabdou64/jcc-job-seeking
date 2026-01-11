import { FormRequest } from "jcc-express-mvc/Core/FormRequest";
import { ValidationException } from "jcc-express-mvc/lib/Error/ValidationException";
import { Request } from "jcc-express-mvc";
import { Job } from "@/Model/Job";

export class JobRequest extends FormRequest {
  constructor(req: Request) {
    super(req);
  }

  async rules() {
    await this.validate({
      title: ["required", "min:5", "max:200"],
      description: ["required", "min:50"],
      category: ["required"],
      type: ["required", "in:fixed,hourly"],
      budgetMin: ["required", "numeric", "min:0"],
      budgetMax: ["required", "numeric", "min:0"],
      tags: ["nullable"],
    });

    // Validate budget max is greater than min
    const budgetMin = parseFloat(this.input("budgetMin") || "0");
    const budgetMax = parseFloat(this.input("budgetMax") || "0");
    if (budgetMax < budgetMin) {
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

    return Job.create({
      user_id: this.req.user?.id,
      title: this.input("title"),
      description: this.input("description"),
      category: this.input("category"),
      type: this.input("type"),
      budget_min: parseFloat(this.input("budgetMin")),
      budget_max: parseFloat(this.input("budgetMax")),
      tags: JSON.stringify(tags),
      featured:
        this.input("featured") === "true" || this.input("featured") === true,
      status: "active",
    });
  }
}
