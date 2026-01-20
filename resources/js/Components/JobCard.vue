<template>
  <Link
    :href="`/jobs/${job.id}`"
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
    <div class="flex flex-wrap gap-2 mb-4">
      <Badge v-for="tag in job.tags.slice(0, 3)" :key="tag" :label="tag" />
      <Badge v-if="job.tags.length > 3" :label="`+${job.tags.length - 3}`" />
    </div>

    <!-- Footer -->
    <div class="flex items-end justify-between">
      <div class="flex-1">
        <div class="text-lg font-bold text-slate-900 mb-1">
          {{ budgetDisplay }}
        </div>
        <div class="flex items-center gap-2 text-xs text-slate-500">
          <span>{{ job.applicants }} applicants</span>
          <span>•</span>
          <span>{{ postedTimeAgo }}</span>
        </div>
      </div>

      <!-- Poster avatar -->
      <div class="ml-4 flex-shrink-0">
        <img
          :src="job.postedBy.avatar"
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
import type { Job } from "../data/jobs";
import Badge from "./Badge.vue";

interface Props {
  job: Job;
}

const props = defineProps<Props>();

const budgetDisplay = computed(() => {
  if (props.job.type === "fixed") {
    return `$${props.job.budget.min.toLocaleString()}-$${props.job.budget.max.toLocaleString()}`;
  } else {
    return `$${props.job.budget.min}-$${props.job.budget.max}/hr`;
  }
});

const postedTimeAgo = computed(() => {
    // const now = new Date();
    // const posted = props.job.postedDate;
    // const diffMs = now.getTime() - posted.getTime();
    // const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    // const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    // if (diffDays > 0) {
    //   return `${diffDays}d ago`;
    // } else if (diffHours > 0) {
    //   return `${diffHours}h ago`;
    // } else {
    //   return "Just now";
    // }
    console.log(props.job)
    return props.job.created_at;
});
</script>
