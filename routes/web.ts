import { Route } from "jcc-express-mvc/Core";
import { Job } from "@/Model/Job";
import { User } from "@/Model/User";

Route.middleware("guest").get("/", (req, res) => {
  return res.inertia("Index");
});

Route.get("/dashboard", async (req, res) => {
  // Get user's jobs if authenticated
  let myJobs: any[] = [];
  let applications: any[] = [];

  if (req.user) {
    myJobs = await Job.where("user_id", req.user.id)
      .orderBy("created_at", "desc")
      .get();
  }

  return res.inertia("Dashboard", {
    myJobs: myJobs || [],
    applications: applications || [],
  });
});

Route.prefix("/jobs").group(() => {
  Route.get("/", async (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 12;

    let query = Job.query().where("status", "active");

    if (req.query.category) {
      query = query.where("category", req.query.category as string);
    }
    if (req.query.type) {
      query = query.where("type", req.query.type as string);
    }
    if (req.query.search) {
      const search = req.query.search as string;
      query = query.where((q: any) => {
        q.where("title", "like", `%${search}%`).orWhere(
          "description",
          "like",
          `%${search}%`,
        );
      });
    }

    const jobs = await query
      .orderBy("created_at", "desc")
      .limit(limit)
      .offset((page - 1) * limit)
      .get();

    const total = await query.count();

    return res.inertia("Jobs/JobListings", {
      jobs: jobs || [],
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  });

  Route.get("/:id", async (req, res) => {
    const job = await Job.find(req.params.id);

    if (!job) {
      return res.redirect("/jobs");
    }

    // Increment views
    await Job.where("id", job.id).update({
      views_count: (job.views_count || 0) + 1,
    });

    // Load user
    const user = await User.find(job.user_id);

    return res.inertia("Jobs/JobDetail", {
      job: {
        ...job,
        postedBy: user
          ? {
              id: user.id,
              name: user.name,
              email: user.email,
              avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`,
              rating: 4.8,
            }
          : null,
      },
    });
  });
});

Route.middleware(["auth"]).get("/post-job", (req, res) => {
  return res.inertia("Jobs/PostJob");
});

Route.middleware(["auth"]).get("/profile", (req, res) => {
  return res.inertia("Profile");
});

Route.middleware(["auth"]).get("/home", (req, res, next) => {
  return res.inertia("Home");
});

require("./auth");
