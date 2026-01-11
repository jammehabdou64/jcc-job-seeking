<template>
  <Head>
    <title>Home - JobHub</title>
    <meta name="description" content="Your job seeking dashboard" />
  </Head>
  <Navbar />
  <div class="bg-slate-50 min-h-[calc(100vh-64px)]">
    <!-- Header -->
    <div class="bg-white border-b border-slate-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="text-4xl font-bold text-slate-900 mb-2">
          Welcome back, {{ auth?.user?.name || "User" }}!
        </h1>
        <p class="text-lg text-slate-600">
          Here's what's happening with your jobs and applications
        </p>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card
          v-for="stat in stats"
          :key="stat.label"
          class="bg-white hover:shadow-md transition-shadow"
        >
          <CardContent class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-slate-600 mb-1">{{ stat.label }}</p>
                <p class="text-3xl font-bold text-slate-900">
                  {{ stat.value }}
                </p>
              </div>
              <div class="text-4xl">{{ stat.icon }}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card class="bg-white">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent class="space-y-3">
            <Link href="/post-job" class="block">
              <Button variant="primary" class="w-full justify-start">
                <svg
                  class="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Post a New Job
              </Button>
            </Link>
            <Link href="/jobs" class="block">
              <Button variant="outline" class="w-full justify-start">
                <svg
                  class="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Browse Jobs
              </Button>
            </Link>
            <Link href="/dashboard" class="block">
              <Button variant="outline" class="w-full justify-start">
                <svg
                  class="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                View Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>

        <!-- Recent Activity -->
        <Card class="bg-white">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div
                v-for="activity in recentActivity"
                :key="activity.id"
                class="flex items-start gap-3"
              >
                <div
                  class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0"
                >
                  <span class="text-lg">{{ activity.icon }}</span>
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-slate-900">
                    {{ activity.title }}
                  </p>
                  <p class="text-xs text-slate-600">{{ activity.time }}</p>
                </div>
              </div>
              <div
                v-if="recentActivity.length === 0"
                class="text-center py-8 text-slate-500"
              >
                No recent activity
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Featured Jobs -->
      <Card class="bg-white">
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle>Featured Jobs</CardTitle>
            <Link href="/jobs" class="text-sm text-primary-600 hover:underline">
              View All
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <JobCard v-for="job in featuredJobs" :key="job.id" :job="job" />
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Link, usePage, Head } from "@inertiajs/vue3";
import { jobsData } from "@/data/jobs";
import Navbar from "@/Components/Navbar.vue";
import Footer from "@/Components/Footer.vue";
import JobCard from "@/Components/JobCard.vue";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

const page = usePage();
const auth: Record<string, any> = page.props.auth || {};

const stats = computed(() => [
  {
    label: "Active Jobs",
    value: "3",
    icon: "📋",
  },
  {
    label: "Applications",
    value: "12",
    icon: "📬",
  },
  {
    label: "Saved Jobs",
    value: "5",
    icon: "💾",
  },
  {
    label: "Profile Views",
    value: "47",
    icon: "👁️",
  },
]);

const featuredJobs = computed(() => {
  return jobsData.filter((job) => job.featured).slice(0, 3);
});

const recentActivity = computed(() => [
  {
    id: 1,
    title: "New application received",
    time: "2 hours ago",
    icon: "📬",
  },
  {
    id: 2,
    title: "Job posted successfully",
    time: "1 day ago",
    icon: "✅",
  },
  {
    id: 3,
    title: "Profile updated",
    time: "3 days ago",
    icon: "✏️",
  },
]);
</script>
