import { httpContext } from "jcc-express-mvc";
import { Inject, Method } from "jcc-express-mvc/Core/Dependency";
import { JobRequest } from "@/Request/JobRequest";
import { Job } from "@/Model/Job";
import { SavedJob } from "@/Model/SavedJob";
import { Application } from "@/Model/Application";
import { JobRepository } from "app/Repository/JobRepository";
import { JobInterface } from "@/Model/Interface";
import { Category } from "@/Model/Category";

@Inject()
export class JobController {
  constructor(private jobRepository: JobRepository) {}

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
    const result = await this.jobRepository.getJobs();
    //
    const authUser = await this.jobRepository.getAuthUser();

    return inertia("Jobs/JobListings", {
      jobs: result.data || [],
      meta: result.meta || {},
      auth: authUser?.toJSON() || {},
    });
  }

  @Method()
  async show(job: Job) {
    if (!job) {
      return redirect("/jobs");
    }

    const authUser = (await this.jobRepository.getAuthUser()) as any;
    const jobData = await this.jobRepository.showJob(job);
    const jobId = (job as any).id;
    const isSaved = authUser
      ? await this.jobRepository.isJobSaved(authUser.id, jobId)
      : false;
    const hasApplied = authUser
      ? await this.jobRepository.hasApplied(authUser.id, jobId)
      : false;

    return inertia("Jobs/JobDetail", {
      job: jobData,
      auth: authUser?.toJSON() || {},
      isSaved: isSaved || false,
      hasApplied: hasApplied || false,
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
    const jobWithRelations = await this.jobRepository.showJob(job);

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

    const savedJobs = await this.jobRepository.getSavedJobs(userId);

    if (isEmployee) {
      const myApplications = await this.jobRepository.getMyApplications(userId);
      return res.inertia("Dashboard", {
        myJobs: [],
        savedJobs: savedJobs || [],
        applications: [],
        myApplications: myApplications || [],
        isEmployee: true,
      });
    }

    const jobs = await this.jobRepository.myJobs(userId);
    const applications =
      await this.jobRepository.getApplicationsForEmployer(userId);

    return res.inertia("Dashboard", {
      myJobs: jobs || [],
      savedJobs: savedJobs || [],
      applications: applications || [],
      myApplications: [],
      isEmployee: false,
    });
  }

  @Method()
  async saveJob(job: Job, { req, res } = httpContext) {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Login required" });
    }
    const jobId = (job as any).id;
    const existing = await SavedJob.where("user_id", req.user.id)
      .where("job_id", jobId)
      .first();
    if (existing) {
      return res.redirect(`/jobs/${jobId}`);
    }
    await SavedJob.create({ user_id: req.user.id, job_id: jobId });
    return res.redirect(`/jobs/${jobId}`);
  }

  @Method()
  async unsaveJob(job: Job, { req, res } = httpContext) {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Login required" });
    }
    const jobId = (job as any).id;
    await SavedJob.where("user_id", req.user.id)
      .where("job_id", jobId)
      .delete();
    return res.redirect(`/jobs/${jobId}`);
  }

  @Method()
  async apply(job: Job, { req, res } = httpContext) {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Login required" });
    }
    const jobId = (job as any).id;
    const existing = await Application.where("user_id", req.user.id)
      .where("job_id", jobId)
      .first();
    if (existing) {
      return res
        .with("info", "You have already applied")
        .redirect(`/jobs/${jobId}`);
    }

    let cvPath: string | null = null;
    if (request().hasFile("cv")) {
      const fileObj = req.files?.cv;
      const mimetype = (fileObj as any)?.mimetype || "";
      const allowed =
        mimetype === "application/pdf" || mimetype.startsWith("image/");
      if (!allowed) {
        return res
          .with("error", "CV must be a PDF or image (JPG, PNG, GIF)")
          .redirect(`/jobs/${jobId}`);
      }
      const filename = request().file("cv").store("cvs");
      cvPath = filename ? `cvs/${filename}` : null;
    }

    const message = req.body?.message || req.input("message") || "";
    const bidAmount =
      parseFloat(req.body?.bidAmount || req.input("bidAmount") || "0") || null;
    await Application.create({
      user_id: req.user.id,
      job_id: jobId,
      message,
      bid_amount: bidAmount,
      status: "pending",
      cv: cvPath,
    });
    const jobModel = job as any;
    await Job.where("id", jobId).update({
      applicants_count: (jobModel.applicants_count || 0) + 1,
    });
    return res
      .with("success", "Application submitted successfully")
      .redirect(`/jobs/${jobId}`);
  }
}
