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
            <DialogContent class="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle class="text-xl">Apply for this job</DialogTitle>
                <DialogDescription class="space-y-1.5 pt-1">
                  <p class="text-slate-600">
                    Add a cover message and optional bid to strengthen your application.
                  </p>
                  <p class="text-sm font-medium text-slate-700 truncate" :title="job?.title">
                    {{ job?.title }}
                  </p>
                </DialogDescription>
              </DialogHeader>
              <form @submit.prevent="submitApply" class="space-y-5 pt-2">
                <!-- Cover Message -->
                <div class="space-y-1.5">
                  <Label for="message">Cover Message</Label>
                  <textarea
                    id="message"
                    v-model="applyForm.message"
                    rows="4"
                    maxlength="1000"
                    :class="[
                      'w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-400 resize-none text-sm transition-colors',
                      applyForm.errors?.message ? 'border-red-400' : 'border-slate-300',
                    ]"
                    placeholder="Introduce yourself, highlight relevant experience, and explain why you're a great fit for this role..."
                  ></textarea>
                  <div class="flex justify-between items-center">
                    <p v-if="applyForm.errors?.message" class="text-xs text-red-600">
                      {{ applyForm.errors.message }}
                    </p>
                    <span v-else class="text-xs text-slate-400">
                      {{ applyForm.message.length }}/1000
                    </span>
                  </div>
                </div>

                <!-- CV / Resume -->
                <div class="space-y-1.5">
                  <Label>CV / Resume (optional)</Label>
                  <div
                    v-if="!applyForm.cv"
                    class="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-primary-400 hover:bg-primary-50/50 transition-colors cursor-pointer"
                    :class="{ 'border-primary-400 bg-primary-50/30': isDragging }"
                    @click="cvInputRef?.click()"
                    @dragover.prevent="isDragging = true"
                    @dragleave="isDragging = false"
                    @drop.prevent="onCvDrop"
                  >
                    <input
                      ref="cvInputRef"
                      id="cv"
                      type="file"
                      accept=".pdf,application/pdf,image/jpeg,image/png,image/gif"
                      class="hidden"
                      @change="onCvSelected"
                    />
                    <span class="text-2xl block mb-2">📄</span>
                    <p class="text-sm text-slate-600 font-medium">
                      Drag & drop or <span class="text-primary-600">browse</span>
                    </p>
                    <p class="text-xs text-slate-500 mt-0.5">PDF or image (JPG, PNG, GIF). Max 5MB.</p>
                  </div>
                  <div
                    v-else
                    class="flex items-center justify-between gap-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <div class="flex items-center gap-3 min-w-0">
                      <span class="text-lg">📎</span>
                      <div class="min-w-0">
                        <p class="text-sm font-medium text-slate-800 truncate">{{ applyForm.cv?.name }}</p>
                        <p class="text-xs text-slate-500">{{ formatFileSize(applyForm.cv?.size) }}</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      class="text-slate-500 hover:text-red-600 shrink-0"
                      @click.prevent="clearCv"
                    >
                      Remove
                    </Button>
                  </div>
                </div>

                <!-- Bid Amount -->
                <div class="space-y-1.5">
                  <Label for="bidAmount">Bid Amount (optional)</Label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                    <input
                      id="bidAmount"
                      v-model.number="applyForm.bidAmount"
                      type="number"
                      step="0.01"
                      min="0"
                      :class="[
                        'w-full pl-7 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm',
                        applyForm.errors?.bidAmount ? 'border-red-400' : 'border-slate-300',
                      ]"
                      placeholder="0.00"
                    />
                  </div>
                  <p v-if="applyForm.errors?.bidAmount" class="text-xs text-red-600">
                    {{ applyForm.errors.bidAmount }}
                  </p>
                </div>

                <DialogFooter class="flex gap-3 pt-4 border-t border-slate-200">
                  <DialogClose as-child>
                    <Button type="button" variant="outline" class="min-w-[100px]">Cancel</Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    :disabled="applyForm.processing"
                    class="min-w-[140px]"
                  >
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
          <Button
            v-if="auth?.id"
            variant="outline"
            size="lg"
            :class="[saved ? 'text-red-600 border-red-300' : '', 'transition-all']"
            :disabled="saving"
            @click="toggleSave"
          >
            <svg
              class="w-5 h-5 mr-2"
              :fill="saved ? 'currentColor' : 'none'"
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
            {{ saved ? "Saved" : "Save Job" }}
          </Button>
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
import { computed, ref, watch } from "vue";
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
import { toast } from "vue-sonner";

const props = defineProps<{
  job?: any;
  isSaved?: boolean;
  hasApplied?: boolean;
}>();

const page = usePage();
const auth = (page.props as any).auth || {};
const job = props.job;
const hasApplied = props.hasApplied || false;

// Optimistic save state (Twitter-style: instant UI, request in background)
const saved = ref(props.isSaved ?? false);
const saving = ref(false);
watch(() => props.isSaved, (v) => { saved.value = v ?? false; });

const applyForm = useForm({
  message: "",
  cv: null as File | null,
  bidAmount: null as number | null,
});

const cvInputRef = ref<HTMLInputElement | null>(null);
const isDragging = ref(false);

const formatFileSize = (bytes?: number) => {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const validateAndSetCv = (file: File | null) => {
  if (!file) {
    applyForm.cv = null;
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    applyForm.cv = null;
    toast.error("File must be 5MB or smaller");
    return;
  }
  applyForm.cv = file;
};

const onCvSelected = (e: Event) => {
  const input = e.target as HTMLInputElement;
  validateAndSetCv(input.files?.[0] ?? null);
};

const onCvDrop = (e: DragEvent) => {
  isDragging.value = false;
  const file = e.dataTransfer?.files?.[0];
  if (file) validateAndSetCv(file);
  cvInputRef.value && (cvInputRef.value.value = "");
};

const clearCv = () => {
  applyForm.cv = null;
  cvInputRef.value && (cvInputRef.value.value = "");
};

const postedByAvatarUrl = computed(() => {
  const pb = job?.postedBy;
  if (!pb) return `https://ui-avatars.com/api/?name=User&background=random`;
  const av = pb.avatar;
  if (!av) return `https://ui-avatars.com/api/?name=${encodeURIComponent(pb.name || "User")}&background=random`;
  if (typeof av === "string" && (av.startsWith("http") || av.startsWith("/"))) return av;
  return `/${av}`;
});

const toggleSave = async () => {
  if (saving.value || !job?.id) return;
  saving.value = true;
  const wasSaved = saved.value;
  saved.value = !saved.value; // optimistic update
  const url = `/jobs/${job.slug || job.id}/save`;
  try {
    const res = await fetch(url, {
      method: saved.value ? "POST" : "DELETE",
      headers: { Accept: "application/json" },
      credentials: "same-origin",
    });
    if (!res.ok) throw new Error("Request failed");
  } catch {
    saved.value = wasSaved; // revert on error
    toast.error("Something went wrong. Please try again.");
  } finally {
    saving.value = false;
  }
};

const submitApply = () => {
  applyForm.post(`/jobs/${job?.slug || job?.id}/apply`, {
    preserveScroll: true,
    forceFormData: true,
    onSuccess: () => {
      applyForm.reset();
      cvInputRef.value && (cvInputRef.value.value = "");
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
