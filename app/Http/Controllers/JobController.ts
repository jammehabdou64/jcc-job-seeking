import { httpContext } from "jcc-express-mvc";
import { Inject, Method } from "jcc-express-mvc/Core/Dependency";
import { JobRequest } from "@/Request/JobRequest";
import { Job } from "@/Model/Job";
import { JobService } from "@/Services/JobService";
import { JobInterface } from "@/Model/Interface";
import { Category } from "@/Model/Category";

@Inject()
export class JobController {
  constructor(private jobService: JobService) {}

  async create() {
    const role = auth()?.role;
    if (role === "employee") {
      return response()
        .status(403)
        .with(
          "error",
          "Employees cannot post jobs. Create an employer account.",
        )
        .redirect(303, "/dashboard");
    }
    const categories = await Category.all();
    return inertia("Jobs/PostJob", {
      categories: categories || [],
    });
  }

  async index() {
    const result = await this.jobService.getJobs();
    return inertia("Jobs/JobListings", {
      jobs: result.data || [],
      meta: result.meta || {},
    });
  }

  @Method()
  async show(job: Job) {
    if (!job) {
      return redirect("/jobs");
    }

    const detail = await this.jobService.getJobDetail(job);
    return inertia("Jobs/JobDetail", {
      job: detail.job,
      auth: detail.authUser,
      isSaved: detail.isSaved,
      hasApplied: detail.hasApplied,
    });
  }

  @Method()
  async store(jobRequest: JobRequest) {
    const role = (auth() as any)?.role;
    if (role === "employee") {
      return response()
        .status(403)
        .with("error", "Employees cannot post jobs.")
        .redirectBack();
    }
    const job = await jobRequest.save();

    if (job) {
      return response()
        .with("success", "Job posted successfully")
        .redirect("/dashboard");
    }

    return response().with("error", "Failed to post job").redirectBack();
  }

  @Method()
  async edit(job: Job, { req, res } = httpContext) {
    if (!job) {
      return res.redirect("/jobs");
    }

    const jobData: JobInterface = job as any;
    if (jobData.user_id !== req.user?.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const categories = await Category.all();
    const jobWithRelations = await this.jobService.getJobWithRelations(job);

    return res.inertia("Jobs/EditJob", {
      job: jobWithRelations,
      categories: categories || [],
    });
  }

  @Method()
  async update(job: Job, { req, res } = httpContext, jobRequest: JobRequest) {
    if (!job) {
      return res.redirect("/jobs");
    }

    const jobData: JobInterface = job as any;
    if (jobData.user_id !== req.user?.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const saved = await jobRequest.save();
    if (!saved) {
      return res.with("error", "Failed to update job").redirectBack();
    }

    return res
      .with("success", "Job updated successfully")
      .redirect("/dashboard");
  }

  @Method()
  async destroy(job: Job, { req, res } = httpContext) {
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const jobData: JobInterface = job as any;
    if (jobData.user_id !== req.user?.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await job.delete();

    return res
      .with("success", "Job deleted successfully")
      .redirect("/dashboard");
  }

  @Method()
  async myJobs({ req, res } = httpContext) {
    const userId = req.user?.id || "";
    const role = (req.user as any)?.role;
    const isEmployee = role === "employee";

    const data = await this.jobService.getMyJobsData(userId, isEmployee);
    return res.inertia("Dashboard", data);
  }

  @Method()
  async saveJob(job: Job, { req, res } = httpContext) {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Login required" });
    }
    const jobModel = job as any;
    const jobId = jobModel.id;
    const jobSlug = jobModel.slug || jobId;
    const wantsJson =
      req.xhr || req.get("Accept")?.includes("application/json");
    await this.jobService.saveJob(req.user.id, jobId);
    if (wantsJson) return res.json({ saved: true });
    return res.redirect(`/jobs/${jobSlug}`);
  }

  @Method()
  async unsaveJob(job: Job, { req, res } = httpContext) {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Login required" });
    }
    const jobModel = job as any;
    const jobId = jobModel.id;
    const jobSlug = jobModel.slug || jobId;
    const wantsJson =
      req.xhr || req.get("Accept")?.includes("application/json");
    await this.jobService.unsaveJob(req.user.id, jobId);
    if (wantsJson) return res.json({ saved: false });
    return res.redirect(`/jobs/${jobSlug}`);
  }

  @Method()
  async apply(job: Job) {
    const req = request();
    const res = response();
    const jobModel = job as unknown as JobInterface & { slug?: string };
    const jobSlug = jobModel.slug || jobModel.id;

    let cvPath: string | null = null;
    if (req.hasFile("cv")) {
      const fileObj = req.files?.cv;
      const mimetype = (fileObj as any)?.mimetype || "";
      const allowed =
        mimetype === "application/pdf" || mimetype.startsWith("image/");
      if (!allowed) {
        return response()
          .with("error", "CV must be a PDF or image (JPG, PNG, GIF)")
          .redirect(`/jobs/${jobSlug}`);
      }
      const filename = req.file("cv").store("cvs");
      cvPath = filename ? `cvs/${filename}` : null;
    }

    const message = req.body?.message || req.input("message") || "";
    const bidAmount =
      parseFloat(req.body?.bidAmount || req.input("bidAmount") || "0") || null;

    const result = await this.jobService.applyToJob(req.user!.id, jobModel, {
      message,
      bidAmount,
      cvPath,
    });

    if (result.alreadyApplied) {
      return response()
        .with("info", "You have already applied")
        .redirect(`/jobs/${jobSlug}`);
    }

    return res
      .with("success", "Application submitted successfully")
      .redirect(303, `/jobs`);
  }
}
