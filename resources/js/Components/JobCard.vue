<template>
  <Link
    :href="jobUrl"
    class="block bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-primary-300 transition-all duration-300 group"
  >
    <!-- Featured badge -->
    <div v-if="job.featured" class="mb-3">
      <Badge label="Featured" variant="accent" />
    </div>

    <!-- Header -->
    <div class="mb-3">
      <h3
        class="text-lg font-semibold text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-2"
      >
        {{ job.title }}
      </h3>
      <p class="text-sm text-slate-600 mt-1">{{ job.category?.name }}</p>
    </div>

    <!-- Description -->
    <p class="text-slate-600 text-sm mb-4 line-clamp-2">
      {{ job.description }}
    </p>

    <!-- Tags -->
    <div v-if="(job.tags?.length ?? 0) > 0" class="flex flex-wrap gap-2 mb-4">
      <Badge v-for="tag in (job.tags || []).slice(0, 3)" :key="tag" :label="tag" />
      <Badge v-if="(job.tags?.length ?? 0) > 3" :label="`+${(job.tags?.length ?? 0) - 3}`" />
    </div>

    <!-- Footer -->
    <div class="flex items-end justify-between">
      <div class="flex-1">
        <div class="text-lg font-bold text-slate-900 mb-1">
          {{ budgetDisplay }}
        </div>
        <div class="flex items-center gap-2 text-xs text-slate-500">
          <span>{{ applicantsCount }} applicants</span>
          <span>•</span>
          <span>{{ timeDisplay || "" }}</span>
        </div>
      </div>

      <!-- Poster avatar -->
      <div v-if="job.postedBy" class="ml-4 shrink-0">
        <img
          :src="avatarUrl"
          :alt="job.postedBy.name"
          class="w-10 h-10 rounded-full object-cover ring-2 ring-slate-200"
        />
      </div>
    </div>
  </Link>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Link } from "@inertiajs/vue3";
import Badge from "./Badge.vue";

interface Props {
  job: {
    id?: number;
    slug?: string;
    title?: string;
    description?: string;
    budget_min?: number | string;
    budget_max?: number | string;
    type?: string;
    tags?: string[];
    category?: { name?: string };
    postedBy?: { name?: string; avatar?: string | null };
    applicants_count?: number;
    applicants?: number;
    featured?: boolean;
    created_at?: string;
  };
}

const props = defineProps<Props>();

const jobUrl = computed(() => {
  const slug = (props.job as any).slug;
  const id = (props.job as any).id;
  return slug ? `/jobs/${slug}` : id ? `/jobs/${id}` : "#";
});

const budgetDisplay = computed(() => {
  // Support both backend (budget_min/max) and legacy (budget.min/max) shapes
  const budget = props.job as any;
  const min = parseFloat(String(budget.budget_min ?? budget.budget?.min ?? 0));
  const max = parseFloat(String(budget.budget_max ?? budget.budget?.max ?? 0));
  if (props.job.type === "hourly") {
    return `$${min}-$${max}/hr`;
  }
  return `$${min.toLocaleString()}-$${max.toLocaleString()}`;
});

const applicantsCount = computed(
  () => (props.job as any).applicants_count ?? (props.job as any).applicants ?? 0
);

const avatarUrl = computed(() => {
  const av = props.job.postedBy?.avatar;
  if (!av) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(props.job.postedBy?.name || "User")}&background=random`;
  }
  if (av.startsWith("http") || av.startsWith("/")) return av;
  return `/${av}`;
});

const timeDisplay = computed(() => {
  const created = (props.job as any).created_at;
  const posted = (props.job as any).postedDate;
  if (typeof created === "string") return created;
  if (posted instanceof Date) return posted.toLocaleDateString();
  if (typeof posted === "string") return posted;
  return "";
});
</script>
