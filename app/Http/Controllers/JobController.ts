import { httpContext } from "jcc-express-mvc";
import { Inject, Method } from "jcc-express-mvc/Core/Dependency";
import { JobRequest } from "@/Request/JobRequest";
import { Job } from "@/Model/Job";
import { JobRepository } from "app/Repository/JobRepository";

@Inject()
export class JobController {
  constructor(private jobRepository: JobRepository) {}

  @Method()
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
  async store({ req, res } = httpContext, jobRequest: JobRequest) {
    const job = await jobRequest.save();

    if (!job) {
      return res.status(422).json({
        message: "Validation failed",
      });
    }

    return res.status(201).json({
      message: "Job posted successfully",
      data: job,
    });
  }

  @Method()
  async update({ req, res } = httpContext) {
    const job = await Job.find(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const jobData = job as any;
    // Check if user owns the job
    if (jobData.user_id !== req.user?.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Update job
    const updateData: any = {};
    if (req.body.title) updateData.title = req.body.title;
    if (req.body.description) updateData.description = req.body.description;
    if (req.body.category) updateData.category = req.body.category;
    if (req.body.type) updateData.type = req.body.type;
    if (req.body.budgetMin) updateData.budget_min = req.body.budgetMin;
    if (req.body.budgetMax) updateData.budget_max = req.body.budgetMax;
    if (req.body.tags) {
      const tags = Array.isArray(req.body.tags)
        ? req.body.tags
        : req.body.tags.split(",").map((t: string) => t.trim());
      updateData.tags = JSON.stringify(tags);
    }
    if (req.body.featured !== undefined)
      updateData.featured = req.body.featured;
    if (req.body.status) updateData.status = req.body.status;

    await Job.where("id", jobData.id).update(updateData);

    const updatedJob = await Job.find(jobData.id);

    return res.json({
      message: "Job updated successfully",
      data: updatedJob,
    });
  }

  @Method()
  async destroy({ req, res } = httpContext) {
    const job = await Job.find(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const jobData = job as any;
    // Check if user owns the job
    if (jobData.user_id !== req.user?.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Job.where("id", jobData.id).delete();

    return res.json({ message: "Job deleted successfully" });
  }

  @Method()
  async myJobs({ req, res } = httpContext) {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const jobs = await Job.where("user_id", req.user.id)
      .orderBy("created_at", "desc")
      .get();

    return res.json({ data: jobs });
  }

  incrementViews(job: any) {
    return true;
    // job.views_count = (job.views_count || 0) + 1;
    // return Job.where("id", job.id).update({
    //   views_count: (job.views_count || 0) + 1,
    // });
  }
}
