<template>
  <footer class="bg-slate-900 text-slate-100 mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
        <!-- Brand -->
        <div class="md:col-span-1">
          <div class="flex items-center gap-2 mb-4">
            <div
              class="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-500 rounded-lg flex items-center justify-center text-white font-bold"
            >
              J
            </div>
            <span class="text-lg font-bold">JobHub</span>
          </div>
          <p class="text-slate-400 text-sm">
            The modern platform connecting talented freelancers with innovative
            companies worldwide.
          </p>
        </div>

        <!-- For Freelancers -->
        <div>
          <h3 class="text-white font-semibold mb-4">For Freelancers</h3>
          <ul class="space-y-2">
            <li>
              <Link
                href="/jobs"
                class="text-slate-400 hover:text-white transition-colors"
              >
                Find Jobs
              </Link>
            </li>
            <li>
              <RouterLink
                href="/dashboard"
                class="text-slate-400 hover:text-white transition-colors"
              >
                Dashboard
              </RouterLink>
            </li>
            <li>
              <a
                href="#"
                class="text-slate-400 hover:text-white transition-colors"
                >My Applications</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-slate-400 hover:text-white transition-colors"
                >Skills</a
              >
            </li>
          </ul>
        </div>

        <!-- For Employers -->
        <div>
          <h3 class="text-white font-semibold mb-4">For Employers</h3>
          <ul class="space-y-2">
            <li>
              <RouterLink
                href="/post-job"
                class="text-slate-400 hover:text-white transition-colors"
              >
                Post a Job
              </RouterLink>
            </li>
            <li>
              <a
                href="#"
                class="text-slate-400 hover:text-white transition-colors"
                >Find Talent</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-slate-400 hover:text-white transition-colors"
                >Projects</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-slate-400 hover:text-white transition-colors"
                >Pricing</a
              >
            </li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h3 class="text-white font-semibold mb-4">Company</h3>
          <ul class="space-y-2">
            <li>
              <a
                href="#"
                class="text-slate-400 hover:text-white transition-colors"
                >About Us</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-slate-400 hover:text-white transition-colors"
                >Blog</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-slate-400 hover:text-white transition-colors"
                >Privacy Policy</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-slate-400 hover:text-white transition-colors"
                >Terms of Service</a
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-slate-800 pt-8">
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p class="text-slate-400 text-sm">
            © 2024 JobHub. All rights reserved.
          </p>
          <div class="flex gap-6">
            <a
              href="#"
              class="text-slate-400 hover:text-white transition-colors"
            >
              <span class="sr-only">Twitter</span>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                ></path>
              </svg>
            </a>
            <a
              href="#"
              class="text-slate-400 hover:text-white transition-colors"
            >
              <span class="sr-only">LinkedIn</span>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M16.338 16.338H13.67V12.16c0-.995-.017-2.292-1.194-2.292-1.195 0-1.38.932-1.38 1.893v4.577H8.265V9.359h2.551v.873h.036c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.701zM5.337 7.433c-.84 0-1.526-.68-1.526-1.52s.686-1.52 1.526-1.52c.846 0 1.528.68 1.528 1.52 0 .84-.682 1.52-1.528 1.52zm1.261 8.905H4.076V9.359h2.522v6.979zM17.715 0h-15.5C1.073 0 0 1.073 0 2.403v15.194C0 18.927 1.073 20 2.215 20h15.5c1.142 0 2.215-1.073 2.215-2.403V2.403C19.93 1.073 18.857 0 17.715 0z"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </a>
            <a
              href="#"
              class="text-slate-400 hover:text-white transition-colors"
            >
              <span class="sr-only">Facebook</span>
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M20 10a10 10 0 11-20 0 10 10 0 0120 0zm-8-3a1 1 0 10-2 0v3H6a1 1 0 100 2h4v3a1 1 0 102 0v-3h4a1 1 0 100-2h-4V7z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Link } from "@inertiajs/vue3";
</script>
