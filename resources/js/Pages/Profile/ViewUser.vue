<template>
  <Head>
    <title>{{ profileUser?.name || "Profile" }} - JobHub</title>
    <meta name="description" :content="`View ${profileUser?.name}'s profile on JobHub`" />
  </Head>
  <Navbar />
  <div class="bg-slate-50 min-h-[calc(100vh-64px)]">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/dashboard"
        class="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </Link>
      <div v-if="profileUser" class="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div class="bg-gradient-to-br from-primary-500 to-primary-600 h-24" />
        <div class="px-6 pb-6 -mt-12 relative">
          <div class="flex flex-col sm:flex-row sm:items-end gap-4">
            <div class="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-slate-200 shrink-0">
              <img
                v-if="avatarUrl"
                :src="avatarUrl"
                :alt="profileUser.name"
                class="w-full h-full object-cover"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center text-2xl font-bold text-slate-500"
              >
                {{ userInitials }}
              </div>
            </div>
            <div class="flex-1 pt-2 sm:pt-0">
              <h1 class="text-2xl font-bold text-slate-900">{{ profileUser.name }}</h1>
              <p class="text-slate-600">Applicant Profile</p>
            </div>
          </div>
          <div v-if="profileUser.bio" class="mt-6 pt-6 border-t border-slate-200">
            <h2 class="text-sm font-semibold text-slate-800 mb-2">About</h2>
            <p class="text-slate-700 whitespace-pre-line">{{ profileUser.bio }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Link, usePage, Head } from "@inertiajs/vue3";
import Navbar from "@/Components/Navbar.vue";
import Footer from "@/Components/Footer.vue";

const page = usePage();
const profileUser = computed(() => (page.props as any).profileUser || null);

const avatarUrl = computed(() => {
  const av = profileUser.value?.avatar;
  if (!av) return null;
  if (av.startsWith("blob:") || av.startsWith("http") || av.startsWith("/")) return av;
  return `/${av}`;
});

const userInitials = computed(() => {
  const name = profileUser.value?.name || "U";
  const parts = name.split(" ");
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.substring(0, 2).toUpperCase();
});
</script>
