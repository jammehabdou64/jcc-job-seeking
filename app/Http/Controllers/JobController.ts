import { httpContext } from "jcc-express-mvc";
import { Inject, Method } from "jcc-express-mvc/Core/Dependency";
import { Builder } from "jcc-express-mvc/Eloquent/Builder";
import { JobRequest } from "@/Request/JobRequest";
import { Job } from "@/Model/Job";
import { User } from "@/Model/User";

@Inject()
export class JobController {
  @Method()
  async index({ req, res } = httpContext) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const category = req.query.category as string;
    const type = req.query.type as string;
    const search = req.query.search as string;

    let query = Job.query();

    return Job.paginate(req);

    // Apply filters
    // if (category) {
    //   query = query.where("category", category);
    // }

    if (type) {
      query = query.where("type", type);
    }

    if (search) {
      query = query.where((q: Builder) => {
        q.where("title", "like", `%${search}%`).orWhere(
          "description",
          "like",
          `%${search}%`,
        );
      });
    }

    // Only show active jobs for public listing
    query = query.where("status", "active");

    const jobs = await query
      .latest("created_at")
      .limit(limit)
      .offset((page - 1) * limit)
      .get();

    const total = await query.count();

    return res.json({
      data: jobs,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  }

  @Method()
  async show(job: Job, { req, res } = httpContext) {
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Increment views
    await Job.where("id", job.id).update({
      views_count: (job.views_count || 0) + 1,
    });

    // Load user relationship
    const user = (await User.find(job.user_id)) as Record<string, any>;
    const jobData = {
      ...job,
      postedBy: user
        ? {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`,
            rating: 4.8, // This would come from a ratings table in a real app
          }
        : null,
    };

    return res.json({ data: jobData });
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
    const job = (await Job.find(req.params.id)) as Record<string, any>;

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if user owns the job
    if (job.user_id !== req.user?.id) {
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

    await Job.where("id", job.id).update(updateData);

    const updatedJob = await Job.find(job.id);

    return res.json({
      message: "Job updated successfully",
      data: updatedJob,
    });
  }

  @Method()
  async destroy({ req, res } = httpContext) {
    const job = (await Job.find(req.params.id)) as Record<string, any>;

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if user owns the job
    if (job.user_id !== req.user?.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Job.where("id", job.id).delete();

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
}
