import { Route } from "jcc-express-mvc/Core";
import { Job } from "@/Model/Job";
import { User } from "@/Model/User";
import { JobController } from "@Controllers/JobController";

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

Route.prefix("/jobs")
  .controller(JobController)
  .group(() => {
    Route.get("/", "index");
    Route.get("/{job}", "show");
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
