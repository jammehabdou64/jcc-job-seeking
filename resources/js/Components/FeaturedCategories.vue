<template>
  <section class="py-20 px-4 bg-white">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-slate-900 mb-4">
          Popular Categories
        </h2>
        <p class="text-lg text-slate-600">
          Find jobs in your area of expertise
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Link
          v-for="category in jobCategories"
          :key="category.id"
          href="/jobs"
          class="group bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-8 hover:shadow-lg hover:from-white hover:to-slate-50 transition-all duration-300 border border-slate-200"
        >
          <div class="text-4xl mb-3 group-hover:scale-110 transition-transform">
            {{ category.icon }}
          </div>
          <h3
            class="text-lg font-semibold text-slate-900 group-hover:text-primary-600 transition-colors"
          >
            {{ category.name }}
          </h3>
          <p class="text-slate-600 mt-2">{{ category.jobCount }} active jobs</p>
        </Link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Link } from "@inertiajs/vue3";

interface Category {
  id: string;
  name: string;
  icon: string;
  jobCount: number;
}

const props = defineProps<{
  jobCategories: Category[];
}>();
</script>
