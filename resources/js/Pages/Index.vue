<template>
  <Head>
    <title>Welcome</title>
    <meta name="description" content="Your page description" />
  </Head>
  <Navbar />
  <div>
    <!-- Hero Section -->
    <HeroSection />
    <!-- Featured Categories -->
    <FeaturedCategories :job-categories="jobCategories" />
    <!-- How It Works -->
    <section class="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
          <p class="text-lg text-slate-600">Simple steps to get started</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div
              class="w-16 h-16 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4"
            >
              1
            </div>
            <h3 class="text-lg font-semibold text-slate-900 mb-2">Sign Up</h3>
            <p class="text-slate-600">
              Create your account in seconds and complete your profile
            </p>
          </div>

          <div class="text-center">
            <div
              class="w-16 h-16 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4"
            >
              2
            </div>
            <h3 class="text-lg font-semibold text-slate-900 mb-2">
              Browse or Post
            </h3>
            <p class="text-slate-600">
              Find projects or post your own job to find talent
            </p>
          </div>

          <div class="text-center">
            <div
              class="w-16 h-16 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4"
            >
              3
            </div>
            <h3 class="text-lg font-semibold text-slate-900 mb-2">
              Connect & Collaborate
            </h3>
            <p class="text-slate-600">
              Message, negotiate, and agree on project details
            </p>
          </div>

          <div class="text-center">
            <div
              class="w-16 h-16 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4"
            >
              4
            </div>
            <h3 class="text-lg font-semibold text-slate-900 mb-2">Get Paid</h3>
            <p class="text-slate-600">
              Secure payment processing and fast withdrawals
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-20 px-4 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-slate-900 mb-4">
            Loved by Professionals
          </h2>
          <p class="text-lg text-slate-600">See what our users have to say</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="testimonial in testimonials"
            :key="testimonial.id"
            class="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-8 border border-slate-200"
          >
            <div class="flex gap-1 mb-4">
              <span
                v-for="i in testimonial.rating"
                :key="i"
                class="text-yellow-400 text-lg"
                >★</span
              >
            </div>
            <p class="text-slate-700 leading-relaxed mb-6 italic">
              "{{ testimonial.content }}"
            </p>
            <div class="flex items-center gap-4">
              <img
                :src="testimonial.avatar"
                :alt="testimonial.name"
                class="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p class="font-semibold text-slate-900">
                  {{ testimonial.name }}
                </p>
                <p class="text-sm text-slate-600">{{ testimonial.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <CTASection />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { Link, Head } from "@inertiajs/vue3";
import Header from "@/Components/Header.vue";
import { Button } from "@/Components/ui/button";
import { jobCategories, testimonials } from "../data/jobs";
import {
  ServerIcon,
  LockClosedIcon,
  CircleStackIcon,
  CodeBracketIcon,
  ArrowRightIcon,
} from "@heroicons/vue/24/outline";
import Navbar from "@/Components/Navbar.vue";
import Footer from "@/Components/Footer.vue";
import HeroSection from "@/Components/HeroSection.vue";
import CTASection from "@/Components/CTASection.vue";
import FeaturedCategories from "@/Components/FeaturedCategories.vue";
</script>
