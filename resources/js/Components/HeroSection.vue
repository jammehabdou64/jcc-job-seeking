<template>
  <section
    class="bg-gradient-to-br from-slate-50 via-primary-50 to-slate-100 py-20 md:py-32 px-4"
  >
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div class="space-y-8">
          <div class="space-y-4">
            <Badge label="🚀 Now Hiring" variant="accent" size="md" />
            <h1
              class="text-5xl md:text-6xl font-bold text-slate-900 leading-tight"
            >
              Find Your Next
              <span
                class="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent"
              >
                Great Opportunity
              </span>
            </h1>
            <p class="text-xl text-slate-600 leading-relaxed">
              Connect with top talent or discover amazing freelance projects.
              Join thousands of professionals on JobHub.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-4">
            <Link href="/jobs" class="w-full sm:w-auto">
              <Button variant="primary" size="lg" full-width>
                Browse Jobs
              </Button>
            </Link>
            <Link href="/post-job" class="w-full sm:w-auto">
              <Button variant="outline" size="lg" full-width>
                Post a Job
              </Button>
            </Link>
          </div>

          <div class="flex items-center gap-8 pt-4">
            <div>
              <div class="text-3xl font-bold text-slate-900">50K+</div>
              <p class="text-slate-600">Jobs Posted</p>
            </div>
            <div>
              <div class="text-3xl font-bold text-slate-900">100K+</div>
              <p class="text-slate-600">Freelancers</p>
            </div>
            <div>
              <div class="text-3xl font-bold text-slate-900">$500M+</div>
              <p class="text-slate-600">Paid Out</p>
            </div>
          </div>
        </div>

        <div class="hidden md:block">
          <div class="relative">
            <div
              class="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-400 rounded-2xl blur-3xl opacity-20 -z-10"
            ></div>
            <div class="bg-white rounded-2xl p-8 shadow-2xl">
              <div class="space-y-6">
                <div class="flex items-center gap-4">
                  <div
                    class="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-lg font-bold"
                  >
                    📊
                  </div>
                  <div>
                    <p class="font-semibold text-slate-900">10 new jobs</p>
                    <p class="text-sm text-slate-600">matching your skills</p>
                  </div>
                </div>
                <div class="flex items-center gap-4">
                  <div
                    class="w-12 h-12 rounded-full bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center text-white text-lg font-bold"
                  >
                    💰
                  </div>
                  <div>
                    <p class="font-semibold text-slate-900">
                      Competitive rates
                    </p>
                    <p class="text-sm text-slate-600">$50-100/hour average</p>
                  </div>
                </div>
                <div class="flex items-center gap-4">
                  <div
                    class="w-12 h-12 rounded-full bg-gradient-to-br from-success-500 to-success-600 flex items-center justify-center text-white text-lg font-bold"
                  >
                    ✅
                  </div>
                  <div>
                    <p class="font-semibold text-slate-900">Secure payments</p>
                    <p class="text-sm text-slate-600">Protected milestones</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { Link } from "@inertiajs/vue3";
import Button from "./Button.vue";
import Badge from "./Badge.vue";
</script>
