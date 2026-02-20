<template>
  <Navbar />
  <div class="bg-slate-50 min-h-[calc(100vh-64px)]">
    <!-- Header -->
    <div class="bg-white border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="text-4xl font-bold text-slate-900 mb-2">
          Find Your Next Job
        </h1>
        <p class="text-lg text-slate-600">
          Explore {{ jobsData.length }} active job opportunities
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar Filters -->
        <div class="lg:col-span-1">
          <div
            class="bg-white rounded-xl border border-slate-200 p-6 sticky top-20"
          >
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-semibold text-slate-900">Filters</h2>
              <button
                v-if="
                  searchQuery ||
                  selectedCategory ||
                  selectedJobType ||
                  selectedBudgetRange
                "
                @click="resetFilters"
                class="text-xs text-primary-600 hover:text-primary-700 font-medium"
              >
                Reset
              </button>
            </div>

            <!-- Search -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-slate-700 mb-2"
                >Search</label
              >
              <input
                v-model="searchQuery"
                @keyup.enter="handleFilterChange"
                @blur="handleFilterChange"
                type="text"
                placeholder="Job title, skill, tag..."
                class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>

            <!-- Category Filter -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-slate-700 mb-3"
                >Category</label
              >
              <div class="space-y-2">
                <button
                  @click="setCategoryFilter('')"
                  :class="[
                    'w-full text-left px-3 py-2 rounded-lg transition-colors duration-200',
                    !selectedCategory
                      ? 'bg-primary-100 text-primary-700 font-medium'
                      : 'text-slate-600 hover:bg-slate-100',
                  ]"
                >
                  All Categories
                </button>
                <button
                  v-for="category in jobCategories"
                  :key="category.id"
                  @click="setCategoryFilter(category.name)"
                  :class="[
                    'w-full text-left px-3 py-2 rounded-lg transition-colors duration-200',
                    selectedCategory === category.name
                      ? 'bg-primary-100 text-primary-700 font-medium'
                      : 'text-slate-600 hover:bg-slate-100',
                  ]"
                >
                  {{ category.icon }} {{ category.name }}
                </button>
              </div>
            </div>

            <!-- Job Type Filter -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-slate-700 mb-3"
                >Job Type</label
              >
              <div class="space-y-2">
                <button
                  @click="setJobTypeFilter('')"
                  :class="[
                    'w-full text-left px-3 py-2 rounded-lg transition-colors duration-200',
                    !selectedJobType
                      ? 'bg-primary-100 text-primary-700 font-medium'
                      : 'text-slate-600 hover:bg-slate-100',
                  ]"
                >
                  All Types
                </button>
                <button
                  @click="setJobTypeFilter('fixed')"
                  :class="[
                    'w-full text-left px-3 py-2 rounded-lg transition-colors duration-200',
                    selectedJobType === 'fixed'
                      ? 'bg-primary-100 text-primary-700 font-medium'
                      : 'text-slate-600 hover:bg-slate-100',
                  ]"
                >
                  Fixed Price
                </button>
                <button
                  @click="setJobTypeFilter('hourly')"
                  :class="[
                    'w-full text-left px-3 py-2 rounded-lg transition-colors duration-200',
                    selectedJobType === 'hourly'
                      ? 'bg-primary-100 text-primary-700 font-medium'
                      : 'text-slate-600 hover:bg-slate-100',
                  ]"
                >
                  Hourly Rate
                </button>
              </div>
            </div>

            <!-- Budget Range Filter -->
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-3"
                >Budget Range</label
              >
              <div class="space-y-2">
                <button
                  @click="setBudgetFilter('')"
                  :class="[
                    'w-full text-left px-3 py-2 rounded-lg transition-colors duration-200',
                    !selectedBudgetRange
                      ? 'bg-primary-100 text-primary-700 font-medium'
                      : 'text-slate-600 hover:bg-slate-100',
                  ]"
                >
                  All Budgets
                </button>
                <button
                  @click="setBudgetFilter('small')"
                  :class="[
                    'w-full text-left px-3 py-2 rounded-lg transition-colors duration-200',
                    selectedBudgetRange === 'small'
                      ? 'bg-primary-100 text-primary-700 font-medium'
                      : 'text-slate-600 hover:bg-slate-100',
                  ]"
                >
                  &lt; $2,500
                </button>
                <button
                  @click="setBudgetFilter('medium')"
                  :class="[
                    'w-full text-left px-3 py-2 rounded-lg transition-colors duration-200',
                    selectedBudgetRange === 'medium'
                      ? 'bg-primary-100 text-primary-700 font-medium'
                      : 'text-slate-600 hover:bg-slate-100',
                  ]"
                >
                  $2,500 - $7,500
                </button>
                <button
                  @click="setBudgetFilter('large')"
                  :class="[
                    'w-full text-left px-3 py-2 rounded-lg transition-colors duration-200',
                    selectedBudgetRange === 'large'
                      ? 'bg-primary-100 text-primary-700 font-medium'
                      : 'text-slate-600 hover:bg-slate-100',
                  ]"
                >
                  > $7,500
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-3">
          <!-- Results info -->
          <div class="mb-6 flex items-center justify-between">
            <p class="text-slate-600">
              Showing
              <span class="font-semibold text-slate-900">{{
                paginatedJobs.length
              }}</span>
              of
              <span class="font-semibold text-slate-900">{{
                filteredJobs.length
              }}</span>
              jobs
            </p>
          </div>

          <!-- Empty state -->
          <div
            v-if="filteredJobs.length === 0"
            class="bg-white rounded-xl border border-slate-200 p-12 text-center"
          >
            <div class="text-4xl mb-4">🔍</div>
            <h3 class="text-xl font-semibold text-slate-900 mb-2">
              No jobs found
            </h3>
            <p class="text-slate-600 mb-6">
              Try adjusting your filters or search terms
            </p>
            <Button @click="resetFilters" variant="primary"
              >Clear Filters</Button
            >
          </div>

          <!-- Job Grid -->
          <div v-else class="grid gap-6">
            <JobCard v-for="job in paginatedJobs" :key="job.id" :job="job" />
          </div>

          <!-- Pagination -->
          <div
            v-if="totalPages > 1"
            class="mt-12 flex items-center justify-center gap-2"
          >
            <button
              v-if="currentPage > 1"
              @click="goToPage(currentPage - 1)"
              class="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            >
              ← Previous
            </button>

            <div class="flex gap-2">
              <button
                v-for="pageNum in Math.min(totalPages, 10)"
                :key="pageNum"
                @click="goToPage(pageNum)"
                :class="[
                  'px-3 py-2 rounded-lg transition-colors',
                  pageNum === currentPage
                    ? 'bg-primary-500 text-white'
                    : 'border border-slate-300 text-slate-700 hover:bg-slate-100',
                ]"
              >
                {{ pageNum }}
              </button>
            </div>

            <button
              v-if="currentPage < totalPages"
              @click="goToPage(currentPage + 1)"
              class="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Footer />
</template>
<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { router, usePage } from "@inertiajs/vue3";
import { jobCategories } from "@/data/jobs";
import JobCard from "@/Components/JobCard.vue";
import Badge from "@/Components/Badge.vue";
import Button from "@/Components/Button.vue";
import Navbar from "@/Components/Navbar.vue";
import Footer from "@/Components/Footer.vue";

const page = usePage();
const props = defineProps<{
  jobs?: any[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
    current_page: number;
    per_page: number;
  };
}>();

// State
const searchQuery = ref("");
const selectedCategory = ref<string>("");
const selectedJobType = ref<string>("");
const selectedBudgetRange = ref<string>("");
const itemsPerPage = 12;
const currentPage = ref(props.meta?.page ?? props.meta?.current_page ?? 1);

// Transform backend jobs to frontend format
const transformJob = (job: any) => {
  if (!job) return null;
  const tags =
    typeof job.tags === "string"
      ? (() => {
          try {
            return JSON.parse(job.tags || "[]");
          } catch {
            return [];
          }
        })()
      : Array.isArray(job.tags)
        ? job.tags
        : [];
  const categoryObj =
    job.category && typeof job.category === "object"
      ? {
          id: job.category.id,
          name: job.category.name,
          slug: job.category.slug,
        }
      : {
          id: "",
          name: typeof job.category === "string" ? job.category : "",
          slug: "",
        };
  const postedBy =
    job.postedBy && typeof job.postedBy === "object"
      ? {
          id: job.postedBy.id?.toString() || job.user_id?.toString() || "1",
          name: job.postedBy.name || "User",
          avatar:
            job.postedBy.avatar &&
            (job.postedBy.avatar.startsWith("http") ||
              job.postedBy.avatar.startsWith("/"))
              ? job.postedBy.avatar
              : job.postedBy.avatar
                ? `/${job.postedBy.avatar}`
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(job.postedBy.name || "User")}&background=random`,
          rating: 4.8,
        }
      : {
          id: job.user_id?.toString() || "1",
          name: "User",
          avatar: `https://ui-avatars.com/api/?name=User&background=random`,
          rating: 4.8,
        };
  return {
    id: (job.id ?? job.user_id ?? "").toString(),
    title: job.title || "",
    description: job.description || "",
    budget: {
      min: parseFloat(job.budget_min || 0) || 0,
      max: parseFloat(job.budget_max || 0) || 0,
      currency: "USD",
    },
    type: job.type || "fixed",
    category: categoryObj,
    tags: tags,
    postedDate: job.created_at ? new Date(job.created_at) : new Date(),
    postedBy,
    applicants: job.applicants_count ?? job.applicants ?? 0,
    featured: !!job.featured,
    created_at: job.created_at,
  };
};

// Use jobs from props or fallback to empty array, filter nulls
const jobsData = computed(() => {
  const list = Array.isArray(props.jobs) ? props.jobs : [];
  return list
    .map(transformJob)
    .filter((j): j is NonNullable<typeof j> => j != null);
});

// Computed filters
const filteredJobs = computed(() => {
  return jobsData.value.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      job.tags.some((tag: any) =>
        tag.toLowerCase().includes(searchQuery.value.toLowerCase()),
      );

    const categoryName =
      job.category && typeof job.category === "object"
        ? job.category.name
        : job.category || "";
    const matchesCategory =
      !selectedCategory.value || categoryName === selectedCategory.value;

    const matchesJobType =
      !selectedJobType.value || job.type === selectedJobType.value;

    let matchesBudget = true;
    if (selectedBudgetRange.value) {
      if (selectedBudgetRange.value === "small" && job.budget.max >= 2500) {
        matchesBudget = false;
      } else if (
        selectedBudgetRange.value === "medium" &&
        (job.budget.max < 2500 || job.budget.max > 7500)
      ) {
        matchesBudget = false;
      } else if (
        selectedBudgetRange.value === "large" &&
        job.budget.max <= 7500
      ) {
        matchesBudget = false;
      }
    }

    return matchesSearch && matchesCategory && matchesJobType && matchesBudget;
  });
});

// Normalize meta (backend may use snake_case: current_page, per_page, total_pages)
const metaNormalized = computed(() => {
  // const m = props.meta || {};
  return {
    page: props.meta?.page ?? props.meta?.current_page ?? 1,
    limit: props.meta?.limit ?? props.meta?.per_page ?? itemsPerPage,
    total: props.meta?.total ?? 0,
    totalPages: props.meta?.total_pages ?? props.meta?.total_pages ?? 1,
  };
});

// Pagination - use backend pagination if available
const totalPages = computed(() => {
  if (metaNormalized.value.totalPages > 0) {
    return metaNormalized.value.totalPages;
  }
  return Math.ceil(filteredJobs.value.length / itemsPerPage);
});

const paginatedJobs = computed(() => {
  // If we have backend pagination, use filtered jobs directly
  if (props.meta) {
    return filteredJobs.value;
  }
  // Otherwise, do client-side pagination
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  return filteredJobs.value.slice(startIndex, startIndex + itemsPerPage);
});

// Reset filters
const resetFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "";
  selectedJobType.value = "";
  selectedBudgetRange.value = "";
  currentPage.value = 1;
};

// Watch for filter changes to reset pagination and reload
const handleFilterChange = () => {
  currentPage.value = 1;
  reloadJobs();
};

// Reload jobs with filters
const reloadJobs = () => {
  const params: any = {
    page: currentPage.value,
  };

  if (searchQuery.value) params.search = searchQuery.value;
  if (selectedCategory.value) params.category = selectedCategory.value;
  if (selectedJobType.value) params.type = selectedJobType.value;

  router.get("/jobs", params, {
    preserveState: true,
    preserveScroll: true,
  });
};

// Category filter handlers
const setCategoryFilter = (category: string) => {
  selectedCategory.value = category;
  handleFilterChange();
};

const setJobTypeFilter = (jobType: string) => {
  selectedJobType.value = jobType;
  handleFilterChange();
};

const setBudgetFilter = (budget: string) => {
  selectedBudgetRange.value = budget;
  handleFilterChange();
};

// Handle pagination
const goToPage = (page: number) => {
  currentPage.value = page;
  reloadJobs();
};

// Sync filter state from URL (e.g. on load or when navigating back)
watch(
  () => page.url,
  (url) => {
    try {
      const params = new URLSearchParams(url.split("?")[1] || "");
      const cat = params.get("category");
      if (cat !== null) selectedCategory.value = cat;
      const typ = params.get("type");
      if (typ !== null) selectedJobType.value = typ;
      const pg = params.get("page");
      if (pg !== null) currentPage.value = parseInt(pg, 10) || 1;
    } catch {
      /* ignore */
    }
  },
  { immediate: true },
);
</script>
