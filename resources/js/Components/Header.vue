<template>
  <div>
    <header class="w-full h-16 border-b bg-white">
      <div class="container mx-auto flex h-full items-center">
        <Link class="flex items-center space-x-2" href="/"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-server h-6 w-6"
          >
            <rect width="20" height="8" x="2" y="2" rx="2" ry="2"></rect>
            <rect width="20" height="8" x="2" y="14" rx="2" ry="2"></rect>
            <line x1="6" x2="6.01" y1="6" y2="6"></line>
            <line x1="6" x2="6.01" y1="18" y2="18"></line>
          </svg>
          <span class="font-bold">JCC Framework</span>
        </Link>
        <nav class="ml-auto flex gap-4 sm:gap-6">
          <a
            class="text-sm font-medium hover:underline underline-offset-4"
            href="https://github.com/jammehabdou64/new-jcc-express-mvc-app"
            target="_blank"
            >Docs</a
          >
          <Link
            class="text-sm font-medium hover:underline underline-offset-4"
            href="login"
            >Login</Link
          >
          <Link
            class="text-sm font-medium hover:underline underline-offset-4"
            href="/register"
            >Register</Link
          >
        </nav>
      </div>
    </header>
  </div>
</template>
<script setup>
import { Link } from "@inertiajs/vue3";
</script>
