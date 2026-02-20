<template>
  <nav class="sticky top-0 z-50 bg-white border-b border-slate-200">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <Link href="/" class="flex items-center gap-2 group">
          <div
            class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center text-white font-bold"
          >
            J
          </div>
          <span class="text-xl font-bold text-slate-900 hidden sm:inline"
            >JobHub</span
          >
        </Link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <Link
            href="/jobs"
            class="text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200"
          >
            Browse Jobs
          </Link>
          <template v-if="isAuthenticated">
            <Link
              href="/dashboard"
              class="text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link
              v-if="canPostJob"
              href="/jobs/create"
              class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 font-medium transition-colors duration-200"
            >
              Post a Job
            </Link>
            <!-- User Menu -->
            <div class="relative group">
              <button
                class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div
                  class="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-semibold text-sm"
                >
                  <img
                    v-if="userAvatarUrl"
                    :src="userAvatarUrl"
                    :alt="auth?.name"
                    class="w-full h-full object-cover"
                  />
                  <span v-else>{{ userInitials }}</span>
                </div>
                <span class="text-slate-700 font-medium">{{
                  auth?.name || 'User'
                }}</span>
                <svg
                  class="w-4 h-4 text-slate-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <!-- Dropdown Menu -->
              <div
                class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
              >
                <div class="py-2">
                  <Link
                    href="/dashboard"
                    class="block px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    class="block px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Profile
                  </Link>
                  <div class="border-t border-slate-200 my-2"></div>
                  <Link
                    href="/logout"
                    class="block px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <Link
              href="/login"
              class="text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              href="/register"
              class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 font-medium transition-colors duration-200"
            >
              Sign Up
            </Link>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden flex flex-col gap-1.5 p-2"
          @click="toggleMobileMenu"
          aria-label="Toggle menu"
        >
          <span
            class="w-6 h-0.5 bg-slate-900 rounded transition-all duration-300"
            :class="{ 'rotate-45 translate-y-2': mobileMenuOpen }"
          ></span>
          <span
            class="w-6 h-0.5 bg-slate-900 rounded transition-all duration-300"
            :class="{ 'opacity-0': mobileMenuOpen }"
          ></span>
          <span
            class="w-6 h-0.5 bg-slate-900 rounded transition-all duration-300"
            :class="{ '-rotate-45 -translate-y-2': mobileMenuOpen }"
          ></span>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-300 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div
          v-if="mobileMenuOpen"
          class="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-slate-200 shadow-lg"
        >
          <div class="flex flex-col gap-2 p-4">
            <Link
              href="/jobs"
              class="px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg font-medium transition-colors duration-200"
              @click="closeMobileMenu"
            >
              Browse Jobs
            </Link>
            <template v-if="isAuthenticated">
              <Link
                href="/dashboard"
                class="px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg font-medium transition-colors duration-200"
                @click="closeMobileMenu"
              >
                Dashboard
              </Link>
              <Link
                v-if="canPostJob"
                href="/jobs/create"
                class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 font-medium transition-colors duration-200"
                @click="closeMobileMenu"
              >
                Post a Job
              </Link>
              <Link
                href="/profile"
                class="px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg font-medium transition-colors duration-200"
                @click="closeMobileMenu"
              >
                Profile
              </Link>
              <div class="border-t border-slate-200 my-2"></div>
              <div class="px-4 py-2 text-slate-700 font-medium">
                {{ auth?.name || 'User' }}
              </div>
              <Link
                href="/logout"
                class="px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg font-medium transition-colors duration-200"
                @click="closeMobileMenu"
              >
                Logout
              </Link>
            </template>
            <template v-else>
              <Link
                href="/login"
                class="px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg font-medium transition-colors duration-200"
                @click="closeMobileMenu"
              >
                Login
              </Link>
              <Link
                href="/register"
                class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 font-medium transition-colors duration-200"
                @click="closeMobileMenu"
              >
                Sign Up
              </Link>
            </template>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Link, usePage } from "@inertiajs/vue3";
import { ref, computed } from "vue";

const page = usePage();
const auth: Record<string, any> = page.props.auth || {};


// Check if user is authenticated (auth is the user object when logged in)
const isAuthenticated = computed(() => {
  return !!auth?.id;
});

const mobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};

const userInitials = computed(() => {
  if (!auth?.name) return "U";
  const names = auth.name.split(" ");
  if (names.length >= 2) {
    return (names[0][0] + names[1][0]).toUpperCase();
  }
  return auth.name.substring(0, 2).toUpperCase();
});

const userAvatarUrl = computed(() => {
  const a = auth?.avatar;
  if (!a) return null;
  if (typeof a === "string" && (a.startsWith("http") || a.startsWith("/")))
    return a;
  return `/${a}`;
});

const canPostJob = computed(() => auth?.role !== "employee");
</script>
