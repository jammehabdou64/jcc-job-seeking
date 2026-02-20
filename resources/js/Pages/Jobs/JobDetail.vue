<template>
  <Navbar />
  <div class="bg-slate-50 min-h-[calc(100vh-64px)]">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Back Button -->
      <Link
        href="/jobs"
        class="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Jobs
      </Link>

      <!-- Job Header -->
      <div class="bg-white rounded-xl border border-slate-200 p-8 mb-6">
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-3">
              <h1 class="text-3xl font-bold text-slate-900">{{ job.title }}</h1>
              <Badge
                v-if="job.featured"
                label="Featured"
                variant="accent"
                size="md"
              />
            </div>
            <p class="text-lg text-slate-600 mb-4">{{ job.category?.name || job.category }}</p>
            <div class="flex items-center gap-6 text-sm text-slate-600">
              <div class="flex items-center gap-2">
                <span class="text-lg">💰</span>
                <span class="font-semibold">{{ job.budget_min }} - {{ job.budget_max }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-lg">📅</span>
                <span>{{ job.created_at }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-lg">📬</span>
                <span>{{ job.applicants_count ?? job.applicants ?? 0 }} applicants</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-6">
          <Badge
            v-for="tag in job.tags"
            :key="tag"
            :label="tag"
            variant="default"
          />
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-4 pt-6 border-t border-slate-200">
          <Dialog v-if="auth?.id && !hasApplied">
            <DialogTrigger as-child>
              <Button variant="default" size="lg" class="flex-1" as="button">
                Apply Now
              </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Apply for this job</DialogTitle>
                <DialogDescription>
                  Add a cover message and optional bid amount to strengthen your application.
                </DialogDescription>
              </DialogHeader>
              <form @submit.prevent="submitApply" class="space-y-4">
                <div class="space-y-2">
                  <Label for="message">Cover Message</Label>
                  <textarea
                    id="message"
                    v-model="applyForm.message"
                    rows="4"
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                    placeholder="Introduce yourself and explain why you're a good fit..."
                  ></textarea>
                </div>
                <div class="space-y-2">
                  <Label for="bidAmount">Bid Amount (optional)</Label>
                  <input
                    id="bidAmount"
                    v-model.number="applyForm.bidAmount"
                    type="number"
                    step="0.01"
                    min="0"
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter your bid"
                  />
                </div>
                <DialogFooter>
                  <DialogClose as-child>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" :disabled="applyForm.processing">
                    {{ applyForm.processing ? "Submitting..." : "Submit Application" }}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Button
            v-else-if="auth?.id && hasApplied"
            variant="secondary"
            size="lg"
            class="flex-1"
            disabled
          >
            Already Applied
          </Button>
          <Link
            v-else
            href="/login"
          >
            <Button variant="default" size="lg" class="w-full">
              Login to Apply
            </Button>
          </Link>
          <Link
            v-if="auth?.id"
            :href="`/jobs/${job?.id}/save`"
            :method="isSaved ? 'delete' : 'post'"
            as="button"
          >
            <Button variant="outline" size="lg" :class="isSaved ? 'text-red-600 border-red-300' : ''">
              <svg
                class="w-5 h-5 mr-2"
                :fill="isSaved ? 'currentColor' : 'none'"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {{ isSaved ? "Unsave Job" : "Save Job" }}
            </Button>
          </Link>
          <Link v-else href="/login">
            <Button variant="outline" size="lg">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Save Job
            </Button>
          </Link>
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Job Details -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Description -->
          <Card class="bg-white">
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-slate-700 whitespace-pre-line leading-relaxed">
                {{ job.description }}
              </p>
            </CardContent>
          </Card>

          <!-- Skills Required -->
          <Card class="bg-white">
            <CardHeader>
              <CardTitle>Skills Required</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="flex flex-wrap gap-2">
                <Badge
                  v-for="tag in job.tags"
                  :key="tag"
                  :label="tag"
                  variant="primary"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Job Overview -->
          <Card class="bg-white">
            <CardHeader>
              <CardTitle>Job Overview</CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">
              <div>
                <p class="text-sm text-slate-600 mb-1">Budget</p>
                <p class="text-lg font-semibold text-slate-900">
                  {{ job.budget_min }} - {{ job.budget_max }}
                </p>
              </div>
              <div>
                <p class="text-sm text-slate-600 mb-1">Job Type</p>
                <p class="text-lg font-semibold text-slate-900 capitalize">
                  {{ job.type }}
                </p>
              </div>
              <div>
                <p class="text-sm text-slate-600 mb-1">Category</p>
                <p class="text-lg font-semibold text-slate-900">
                  {{ job.category?.name || job.category }}
                </p>
              </div>
              <div>
                <p class="text-sm text-slate-600 mb-1">Posted</p>
                <p class="text-lg font-semibold text-slate-900">
                  {{ job.created_at }}
                </p>
              </div>
              <div>
                <p class="text-sm text-slate-600 mb-1">Applications</p>
                <p class="text-lg font-semibold text-slate-900">
                  {{ job.applicants_count ?? job.applicants ?? 0 }} applicants
                </p>
              </div>
            </CardContent>
          </Card>

          <!-- Posted By -->
          <Card class="bg-white" v-if="job?.postedBy">
            <CardHeader>
              <CardTitle>Posted By</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="flex items-center gap-4">
                <img
                  :src="postedByAvatarUrl"
                  :alt="job.postedBy?.name || 'User'"
                  class="w-16 h-16 rounded-full object-cover bg-slate-200"
                />
                <div>
                  <p class="font-semibold text-slate-900">
                    {{ job.postedBy?.name || "User" }}
                  </p>
                  <div class="flex items-center gap-1 mt-1">
                    <!-- <span
                      v-for="i in Math.floor(job.postedBy.rating)"
                      :key="i"
                      class="text-yellow-400"
                      >★</span
                    >
                    <span class="text-sm text-slate-600 ml-1">
                      {{ job.postedBy.rating }}
                    </span> -->
                  </div>
                </div>
              </div>
              <Button variant="outline" class="w-full mt-4">
                View Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Link, usePage, useForm } from "@inertiajs/vue3";
import Navbar from "@/Components/Navbar.vue";
import Footer from "@/Components/Footer.vue";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import Badge from "@/Components/Badge.vue";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";

const props = defineProps<{
  job?: any;
  isSaved?: boolean;
  hasApplied?: boolean;
}>();

const page = usePage();
const auth = (page.props as any).auth || {};
const job = props.job;
const isSaved = props.isSaved || false;
const hasApplied = props.hasApplied || false;

const applyForm = useForm({
  message: "",
  bidAmount: null as number | null,
});

const postedByAvatarUrl = computed(() => {
  const pb = job?.postedBy;
  if (!pb) return `https://ui-avatars.com/api/?name=User&background=random`;
  const av = pb.avatar;
  if (!av) return `https://ui-avatars.com/api/?name=${encodeURIComponent(pb.name || "User")}&background=random`;
  if (typeof av === "string" && (av.startsWith("http") || av.startsWith("/"))) return av;
  return `/${av}`;
});

const submitApply = () => {
  applyForm.post(`/jobs/${job?.id}/apply`, {
    preserveScroll: true,
    onSuccess: () => {
      applyForm.reset();
    },
  });
};

// Transform backend job to frontend format
// const job = computed<Job>(() => {
//   if (props.job) {
//     const tags =
//       typeof props.job.tags === "string"
//         ? JSON.parse(props.job.tags || "[]")
//         : props.job.tags || [];

//     // Handle category - can be string or object
//     let categoryName = "General";
//     if (props.job.category) {
//       if (typeof props.job.category === "string") {
//         categoryName = props.job.category;
//       } else if (typeof props.job.category === "object" && props.job.category?.name) {
//         categoryName = props.job.category.name;
//       }
//     }

//     // Handle postedBy - can be object or need to construct
//     let postedBy = props.job.postedBy;
//     if (!postedBy && props.job.user_id) {
//       postedBy = {
//         id: props.job.user_id?.toString() || "1",
//         name: "User",
//         avatar: `https://ui-avatars.com/api/?name=User&background=random`,
//         rating: 4.8,
//       };
//     } else if (postedBy && typeof postedBy === "object") {
//       // Ensure postedBy has all required fields
//       postedBy = {
//         id: postedBy.id?.toString() || props.job.user_id?.toString() || "1",
//         name: postedBy.name || "User",
//         avatar:
//           postedBy.avatar ||
//           `https://ui-avatars.com/api/?name=${encodeURIComponent(postedBy.name || "User")}&background=random`,
//         rating: postedBy.rating || 4.8,
//       };
//     }

//     return {
//       id: props.job.id.toString(),
//       title: props.job.title,
//       description: props.job.description,
//       budget: {
//         min: parseFloat(props.job.budget_min || 0),
//         max: parseFloat(props.job.budget_max || 0),
//         currency: "USD",
//       },
//       type: props.job.type,
//       category: categoryName || "General",
//       tags: tags,
//       postedDate: new Date(props.job.created_at || props.job.createdAt || new Date()),
//       postedBy: postedBy || {
//         id: "1",
//         name: "User",
//         avatar: `https://ui-avatars.com/api/?name=User&background=random`,
//         rating: 4.8,
//       },
//       applicants: props.job.applicants_count || props.job.applicants || 0,
//       featured: props.job.featured || false,
//     };
//   }

//   // Fallback
//   return {
//     id: "1",
//     title: "Loading...",
//     description: "",
//     budget: { min: 0, max: 0, currency: "USD" },
//     type: "fixed",
//     category: "General",
//     tags: [],
//     postedDate: new Date(),
//     postedBy: {
//       id: "1",
//       name: "User",
//       avatar: "",
//       rating: 5,
//     },
//     applicants: 0,
//   } as Job;
// });

// const budgetDisplay = computed(() => {
//   if (job.value.type === "fixed") {
//     return `$${job.value.budget.min.toLocaleString()}-$${job.value.budget.max.toLocaleString()}`;
//   } else {
//     return `$${job.value.budget.min}-$${job.value.budget.max}/hr`;
//   }
// });

// const postedTimeAgo = computed(() => {
//   const now = new Date();
//   const posted = job.value.postedDate;
//   const diffMs = now.getTime() - posted.getTime();
//   const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
//   const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

//   if (diffDays > 0) {
//     return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
//   } else if (diffHours > 0) {
//     return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
//   } else {
//     return "Just now";
//   }
// });
</script>
