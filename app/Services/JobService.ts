import { Inject } from "jcc-express-mvc/Core/Dependency";
import { Job } from "@/Model/Job";
import { SavedJob } from "@/Model/SavedJob";
import { Application } from "@/Model/Application";
import { JobRepository } from "app/Repository/JobRepository";
import { JobInterface } from "@/Model/Interface";

@Inject()
export class JobService {
  constructor(private jobRepository: JobRepository) {}

  async getJobs() {
    return this.jobRepository.getJobs();
  }

  async getJobWithRelations(job: Job) {
    return this.jobRepository.showJob(job);
  }

  async getJobDetail(job: Job) {
    const authUser = (await this.jobRepository.getAuthUser()) as any;
    const jobData = await this.jobRepository.showJob(job);
    const jobId = (job as any).id;
    const isSaved = authUser
      ? await this.jobRepository.isJobSaved(authUser.id, jobId)
      : false;
    const hasApplied = authUser
      ? await this.jobRepository.hasApplied(authUser.id, jobId)
      : false;

    return {
      job: jobData,
      authUser: authUser?.toJSON() || {},
      isSaved: isSaved || false,
      hasApplied: hasApplied || false,
    };
  }

  async getMyJobsData(userId: string, isEmployee: boolean) {
    const savedJobs = await this.jobRepository.getSavedJobs(userId);

    if (isEmployee) {
      const myApplications = await this.jobRepository.getMyApplications(userId);
      return {
        myJobs: [],
        savedJobs: savedJobs || [],
        applications: [],
        myApplications: myApplications || [],
        isEmployee: true,
      };
    }

    const jobs = await this.jobRepository.myJobs(userId);
    const applications =
      await this.jobRepository.getApplicationsForEmployer(userId);

    return {
      myJobs: jobs || [],
      savedJobs: savedJobs || [],
      applications: applications || [],
      myApplications: [],
      isEmployee: false,
    };
  }

  async saveJob(userId: string, jobId: string) {
    const existing = await SavedJob.where("user_id", userId)
      .where("job_id", jobId)
      .first();

    if (existing) {
      return { saved: true, alreadySaved: true };
    }

    await SavedJob.create({ user_id: userId, job_id: jobId });
    return { saved: true, alreadySaved: false };
  }

  async unsaveJob(userId: string, jobId: string) {
    await SavedJob.where("user_id", userId)
      .where("job_id", jobId)
      .delete();
    return { saved: false };
  }

  async applyToJob(
    userId: string,
    job: JobInterface,
    data: {
      message: string;
      bidAmount: number | null;
      cvPath: string | null;
    }
  ) {
    const jobId = job.id;
    const existing = await Application.where("user_id", userId)
      .where("job_id", jobId)
      .first();

    if (existing) {
      return { success: false, alreadyApplied: true };
    }

    await Application.create({
      user_id: userId,
      job_id: jobId,
      message: data.message,
      bid_amount: data.bidAmount,
      status: "pending",
      cv: data.cvPath,
    });

    await Job.where("id", jobId).update({
      applicants_count: (job.applicants_count || 0) + 1,
    });

    return { success: true, alreadyApplied: false };
  }

  canUserEditJob(job: JobInterface, userId: string | undefined): boolean {
    return !!userId && job.user_id === userId;
  }
}
