<template>
  <Navbar />
  <div class="bg-slate-50 min-h-[calc(100vh-64px)]">
    <!-- Header -->
    <div class="bg-white border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="text-4xl font-bold text-slate-900 mb-2">Dashboard</h1>
        <p class="text-lg text-slate-600">
          Manage your jobs, applications, and saved jobs in one place
        </p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-slate-600 mb-1">{{ stat.label }}</p>
              <p class="text-3xl font-bold text-slate-900">
                {{
                  typeof stat.value === "number" && stat.value < 10
                    ? stat.value.toFixed(1)
                    : stat.value
                }}
              </p>
            </div>
            <div class="text-4xl">{{ stat.icon }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white border-b border-slate-200 mb-8">
        <div class="flex gap-8">
          <button
            @click="activeTab = 'jobs'"
            :class="[
              'px-4 py-4 font-medium border-b-2 transition-all',
              activeTab === 'jobs'
                ? 'text-primary-600 border-primary-600'
                : 'text-slate-600 border-transparent hover:text-slate-900',
            ]"
          >
            My Jobs
            <span
              :class="[
                'ml-2 px-2 py-0.5 rounded-full text-sm font-semibold',
                activeTab === 'jobs'
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-slate-100 text-slate-700',
              ]"
            >
              {{ myJobs.length }}
            </span>
          </button>
          <button
            @click="activeTab = 'applications'"
            :class="[
              'px-4 py-4 font-medium border-b-2 transition-all',
              activeTab === 'applications'
                ? 'text-primary-600 border-primary-600'
                : 'text-slate-600 border-transparent hover:text-slate-900',
            ]"
          >
            Applications
            <span
              :class="[
                'ml-2 px-2 py-0.5 rounded-full text-sm font-semibold',
                activeTab === 'applications'
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-slate-100 text-slate-700',
              ]"
            >
              {{ applications.length }}
            </span>
          </button>
          <button
            @click="activeTab = 'saved'"
            :class="[
              'px-4 py-4 font-medium border-b-2 transition-all',
              activeTab === 'saved'
                ? 'text-primary-600 border-primary-600'
                : 'text-slate-600 border-transparent hover:text-slate-900',
            ]"
          >
            Saved Jobs
            <span
              :class="[
                'ml-2 px-2 py-0.5 rounded-full text-sm font-semibold',
                activeTab === 'saved'
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-slate-100 text-slate-700',
              ]"
            >
              {{ savedJobs.length }}
            </span>
          </button>
        </div>
      </div>

      <!-- My Jobs Tab -->
      <div v-show="activeTab === 'jobs'" class="space-y-6">
        <!-- Filters -->
        <div class="flex gap-4 mb-6">
          <button
            @click="selectedJobStatus = 'all'"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors',
              selectedJobStatus === 'all'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
            ]"
          >
            All Jobs
          </button>
          <button
            @click="selectedJobStatus = 'active'"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors',
              selectedJobStatus === 'active'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
            ]"
          >
            Active
          </button>
          <button
            @click="selectedJobStatus = 'closed'"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors',
              selectedJobStatus === 'closed'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
            ]"
          >
            Closed
          </button>
        </div>

        <!-- Jobs List -->
        <div class="space-y-4">
          <div
            v-for="job in filteredMyJobs"
            :key="job.id"
            class="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all"
          >
            <div class="flex items-start justify-between gap-4 mb-4">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <h3 class="text-lg font-semibold text-slate-900">
                    {{ job.title }}
                  </h3>
                  <Badge
                    :label="getStatusLabel(job.status)"
                    :variant="statusBadgeColor(job.status)"
                  />
                </div>
                <p class="text-slate-600 mb-3">{{ job.category }}</p>
                <p class="text-slate-600 line-clamp-2">{{ job.description }}</p>
              </div>
              <div class="text-right flex-shrink-0">
                <div class="text-lg font-bold text-slate-900 mb-2">
                  {{
                    job.type === "fixed"
                      ? `$${job.budget.min}-$${job.budget.max}`
                      : `$${job.budget.min}/hr`
                  }}
                </div>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </div>

            <div
              class="flex items-center gap-6 text-sm text-slate-600 border-t border-slate-200 pt-4"
            >
              <div class="flex items-center gap-2">
                <span class="text-lg">📬</span>
                <span
                  ><strong>{{ job.applicants }}</strong> applications</span
                >
              </div>
              <div class="flex items-center gap-2">
                <span class="text-lg">👁️</span>
                <span
                  ><strong>{{ job.viewCount || 0 }}</strong> views</span
                >
              </div>
              <div class="flex items-center gap-2">
                <span class="text-lg">📅</span>
                <span
                  >Posted
                  {{
                    job.created_at
                  }}
                 </span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div
          v-if="filteredMyJobs.length === 0"
          class="bg-white rounded-xl border border-slate-200 p-12 text-center"
        >
          <div class="text-4xl mb-4">📋</div>
          <h3 class="text-xl font-semibold text-slate-900 mb-2">
            No {{ selectedJobStatus }} jobs
          </h3>
          <p class="text-slate-600 mb-6">You haven't posted any jobs yet</p>
        </div>
      </div>

      <!-- Applications Tab -->
      <div v-show="activeTab === 'applications'" class="space-y-6">
        <!-- Applications List -->
        <div class="space-y-4">
          <div
            v-for="application in applications"
            :key="application.id || Math.random()"
            class="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all"
          >
            <div class="flex items-start justify-between gap-4 mb-4">
              <div class="flex items-start gap-4 flex-1">
                <img
                  :src="application.freelancer.avatar"
                  :alt="application.freelancer.name"
                  class="w-12 h-12 rounded-full object-cover"
                />
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-slate-900 mb-1">
                    {{ application.freelancer.name }}
                  </h3>
                  <div class="flex items-center gap-2 mb-2">
                    <div class="flex gap-0.5">
                      <span class="text-yellow-400">★</span>
                      <span class="text-yellow-400">★</span>
                      <span class="text-yellow-400">★</span>
                      <span class="text-yellow-400">★</span>
                      <span class="text-yellow-400">★</span>
                    </div>
                    <span class="text-sm text-slate-600"
                      >{{ application.freelancer.rating }} ({{
                        application.freelancer.jobsCompleted
                      }}
                      jobs)</span
                    >
                  </div>
                  <p class="text-sm text-slate-700 mb-3 italic">
                    "{{ application.message }}"
                  </p>
                  <p class="text-xs text-slate-500">
                    Applied on
                    {{ new Date(application.appliedDate).toLocaleDateString() }}
                  </p>
                </div>
              </div>

              <div class="text-right flex-shrink-0">
                <div class="text-lg font-bold text-slate-900 mb-4">
                  ${{ application.bidAmount }}
                </div>
                <div class="flex flex-col gap-2">
                  <Badge
                    :label="getStatusLabel(application.status)"
                    :variant="statusBadgeColor(application.status)"
                  />
                  <Button
                    v-if="application.status === 'pending'"
                    variant="primary"
                    size="sm"
                  >
                    View Profile
                  </Button>
                  <Button v-else variant="secondary" size="sm" disabled>
                    Hired
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div
          v-if="applications.length === 0"
          class="bg-white rounded-xl border border-slate-200 p-12 text-center"
        >
          <div class="text-4xl mb-4">📬</div>
          <h3 class="text-xl font-semibold text-slate-900 mb-2">
            No applications yet
          </h3>
          <p class="text-slate-600">
            Post a job to start receiving applications
          </p>
        </div>
      </div>

      <!-- Saved Jobs Tab -->
      <div v-show="activeTab === 'saved'" class="space-y-6">
        <div class="grid gap-6">
          <JobCard v-for="job in savedJobs" :key="job.id" :job="job" />
        </div>

        <!-- Empty state -->
        <div
          v-if="savedJobs.length === 0"
          class="bg-white rounded-xl border border-slate-200 p-12 text-center"
        >
          <div class="text-4xl mb-4">💾</div>
          <h3 class="text-xl font-semibold text-slate-900 mb-2">
            No saved jobs
          </h3>
          <p class="text-slate-600 mb-6">
            Save jobs to come back to them later
          </p>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { jobsData } from "../data/jobs";
import JobCard from "@/Components/JobCard.vue";
import Button from "@/Components/Button.vue";
import Badge from "@/Components/Badge.vue";
import Navbar from "@/Components/Navbar.vue";
import Footer from "@/Components/Footer.vue";

const props = defineProps<{
  myJobs?: any[];
  applications?: any[];
}>();

// Tab state
const activeTab = ref<"jobs" | "applications" | "saved">("jobs");

// Transform backend jobs to frontend format
const transformJob = (job: any) => {
  if (!job || !job.id) {
    return null;
  }

  try {
    // Parse tags safely
    let tags: string[] = [];
    if (job.tags) {
      if (typeof job.tags === "string") {
        try {
          tags = JSON.parse(job.tags || "[]");
        } catch {
          tags = [];
        }
      } else if (Array.isArray(job.tags)) {
        tags = job.tags;
      }
    }

    // Handle category - can be string or object
    let categoryName = "General";
    if (job.category) {
      if (typeof job.category === "string") {
        categoryName = job.category;
      } else if (typeof job.category === "object" && job.category?.name) {
        categoryName = job.category.name;
      }
    }

    // Handle postedBy - can be object or need to construct
    let postedBy = job.postedBy || job.posted_by;
    if (!postedBy && job.user_id) {
      postedBy = {
        id: job.user_id?.toString() || "1",
        name: "User",
        avatar: `https://ui-avatars.com/api/?name=User&background=random`,
        rating: 4.8,
      };
    } else if (postedBy && typeof postedBy === "object") {
      const name = postedBy.name || "User";
      postedBy = {
        id: postedBy.id?.toString() || job.user_id?.toString() || "1",
        name: name,
        avatar:
          postedBy.avatar ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
        rating: postedBy.rating || 4.8,
      };
    }

    return {
      id: job.id.toString(),
      title: job.title || "Untitled Job",
      description: job.description || "",
      budget: {
        min: parseFloat(job.budget_min || 0),
        max: parseFloat(job.budget_max || 0),
        currency: "USD",
      },
      type: job.type || "fixed",
      category: categoryName,
      tags: tags,
      created_at: job.created_at || job.createdAt || new Date(),
      postedBy: postedBy || {
        id: "1",
        name: "User",
        avatar: `https://ui-avatars.com/api/?name=User&background=random`,
        rating: 4.8,
      },
      applicants: job.applicants_count || job.applicants || 0,
      featured: job.featured || false,
      status: job.status || "active",
      createdDate: new Date(job.created_at || job.createdAt || new Date()),
      viewCount: job.views_count || 0,
    };
  } catch (error) {
    console.error("Error transforming job:", error, job);
    return null;
  }
};

// Transform backend jobs
const myJobs = computed(() => {
  return (props.myJobs || [])
    .map(transformJob)
    .filter((job): job is NonNullable<typeof job> => job !== null);
});

const applications = computed(() => {
  return props.applications || [];
});

const savedJobs = computed(() => {
  // For now, use mock data for saved jobs
  // In the future, this would come from a saved_jobs table
  return [jobsData[2], jobsData[4], jobsData[6]];
});

// Stats
const stats = computed(() => {
  const activeJobCount = myJobs.value.filter((j) => j.status === "active").length;
  const totalApplications = applications.value.length;
  const totalViews = myJobs.value.reduce((sum, job) => sum + (job.viewCount || 0), 0);
  const avgRating = 4.8;

  return [
    {
      label: "Active Jobs",
      value: activeJobCount,
      icon: "📋",
      color: "primary",
    },
    {
      label: "Total Applications",
      value: totalApplications,
      icon: "📬",
      color: "accent",
    },
    {
      label: "Total Views",
      value: totalViews,
      icon: "👁️",
      color: "success",
    },
    {
      label: "Avg Rating",
      value: avgRating,
      icon: "⭐",
      color: "primary",
    },
  ];
});

// Filters
const selectedJobStatus = ref<"all" | "active" | "closed">("all");

const filteredMyJobs = computed(() => {
  if (selectedJobStatus.value === "all") return myJobs.value;
  return myJobs.value.filter((job) => (job.status || "active") === selectedJobStatus.value);
});

const statusBadgeColor = (status: string | undefined | null) => {
  if (!status) return "default";
  switch (status) {
    case "active":
      return "success";
    case "closed":
      return "outline";
    case "pending":
      return "default";
    case "accepted":
      return "success";
    default:
      return "default";
  }
};

const getStatusLabel = (status: string | undefined | null) => {
  if (!status) return "Unknown";
  return status.charAt(0).toUpperCase() + status.slice(1);
};
</script>
