import { httpContext } from "jcc-express-mvc";
import { Inject, Method } from "jcc-express-mvc/Core/Dependency";
import { JobRequest } from "@/Request/JobRequest";
import { Job } from "@/Model/Job";
import { JobRepository } from "app/Repository/JobRepository";
import { JobInterface } from "@/Model/Interface";

@Inject()
export class JobController {
  constructor(private jobRepository: JobRepository) {}

  async index({ req, res } = httpContext) {
    const result = await this.jobRepository.getJobs(req);
    //
    return res.inertia("Jobs/JobListings", {
      jobs: result.data || [],
      meta: result.meta || {},
    });
  }

  @Method()
  async show(job: Job, { req, res } = httpContext) {
    if (!job) {
      return res.redirect("/jobs");
    }

    return res.inertia("Jobs/JobDetail", {
      job: await this.jobRepository.showJob(job),
    });
  }

  @Method()
  async store({  res } = httpContext, jobRequest: JobRequest) {
    const job = await jobRequest.save();

    if (job) {
      return res.with("success", "Job posted successfully").redirect("/dashboard");
    }

    return res.with("error", "Failed to post job").redirectBack();
  }

  @Method()
  async update(jobRequest: JobRequest, { req, res } = httpContext) {
    const saved = await jobRequest.save();
    if (!saved) {
      return res.with("error", "Failed to update job").redirectBack();
    }

    return res.with("success", "Job updated successfully").redirectBack();
  }

  @Method()
  async destroy(job:Job,{ req, res } = httpContext) {

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const jobData:JobInterface = job as any;
    // Check if user owns the job
    if (jobData.user_id !== req.user?.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await job.delete();

    return res.with("success", "Job deleted successfully").redirectBack();
  }

  @Method()
  async myJobs({ req, res } = httpContext) {
    const jobs = await this.jobRepository.myJobs(req.user?.id);

    return res.inertia("Dashboard", {
      myJobs: jobs || [],
      applications: [],
    });
  }
}
