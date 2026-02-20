import { Job } from "@/Model/Job";
import { SavedJob } from "@/Model/SavedJob";
import { Application } from "@/Model/Application";
import { Request, Response, jwtVerify } from "jcc-express-mvc";
import { type Builder } from "jcc-express-mvc/Eloquent/Builder";
import { JobInterface } from "@/Model/Interface";
import { User } from "@/Model/User";
export class JobRepository {
  async getJobs() {
    const req = request();
    const category = req.query.category as string;
    const type = req.query.type as string;
    const search = req.query.search as string;

    let query: Builder = Job.query();

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

    return query.with(["postedBy", "category"]).paginate(req);
  }

  async showJob(job: Job) {
    job.load(["postedBy", "category"]);
    // Increment views
    await this.incrementViews(job as any);

    return job;
  }

  private async incrementViews(job: JobInterface) {
    return job.update({
      views_count: (job.views_count || 0) + 1,
    });
  }

  public async myJobs(authId: string) {
    return Job.where("user_id", authId)
      .with(["category", "postedBy"])
      .latest()
      .get();
  }

  public async getAuthUser() {
    const token = request().cookies.auth_token;
    if (!token) return null;
    try {
      const payload = jwtVerify(token as string);
      return User.find(payload?.id || payload);
    } catch {
      return null;
    }
  }

  public async getSavedJobs(userId: string) {
    const saved = await SavedJob.where("user_id", userId)
      .with(["job.category"])
      .get();
    return (saved || []).map((s: any) => s.job).filter(Boolean);
  }

  public async getApplicationsForEmployer(employerId: string) {
    const jobs = await Job.where("user_id", employerId).get();
    const jobIds = (jobs || []).map((j: any) => j.id);
    if (jobIds.length === 0) return [];
    const apps = await Application.whereIn("job_id", jobIds)
      .with(["user", "job"])
      .get();
    return (apps || []).map((app: any) => ({
      id: app.id,
      message: app.message,
      bidAmount: app.bid_amount || 0,
      status: app.status,
      appliedDate: app.created_at,
      cv: app.cv || null,
      job: app.job,
      freelancer: app.user
        ? {
            id: app.user.id,
            name: app.user.name,
            bio: app.user.bio,
            avatar:
              app.user.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(app.user.name || "User")}&background=random`,
            rating: 4.8,
            jobsCompleted: 0,
          }
        : {
            id: null,
            name: "User",
            bio: null,
            avatar: "",
            rating: 4.8,
            jobsCompleted: 0,
          },
    }));
  }

  public async getMyApplications(userId: string) {
    return Application.where("user_id", userId)
      .with(["job", "job.postedBy"])
      .get();
  }

  public async isJobSaved(userId: string, jobId: string) {
    const saved = await SavedJob.where("user_id", userId)
      .where("job_id", jobId)
      .first();
    return !!saved;
  }

  public async hasApplied(userId: string, jobId: string) {
    const app = await Application.where("user_id", userId)
      .where("job_id", jobId)
      .first();
    return !!app;
  }
}
