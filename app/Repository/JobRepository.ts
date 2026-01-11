import { Job } from "@/Model/Job";
import { Request } from "jcc-express-mvc";
import { type Builder } from "jcc-express-mvc/Eloquent/Builder";

export class JobRepository {
  async getJobs(req: Request) {
    const category = req.query.category as string;
    const type = req.query.type as string;
    const search = req.query.search as string;

    let query: Builder = Job.query().with(["postedBy", "category"]);

    // Apply filters
    if (category) {
      query = query.whereHas("category", (q) => {
        q.where("name", category);
      });
    }

    if (type) {
      query = query.where("type", type);
    }

    if (search) {
      query = query.where((q) => {
        q.where("title", "like", `%${search}%`).orWhere(
          "description",
          "like",
          `%${search}%`,
        );
      });
    }

    // Only show active jobs for public listing
    query = query.where("status", "active");

    return query.paginate(req);
  }

  async showJob(job: Job) {
    job.load(["postedBy", "category"]);
    // Increment views
    await this.incrementViews(job);

    return job;
  }

  private async incrementViews(job: any) {
    return true;
    return job.update({
      views_count: (job.views_count || 0) + 1,
    });
  }
}
