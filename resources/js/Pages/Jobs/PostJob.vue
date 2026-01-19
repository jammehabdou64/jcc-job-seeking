<template>
  <Navbar />
  <div class="bg-slate-50 min-h-[calc(100vh-64px)]">
    <!-- Header -->
    <div class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="text-4xl font-bold text-slate-900 mb-2">Post a New Job</h1>
        <p class="text-lg text-slate-600">
          Fill out the form below to post your job and find the perfect talent
        </p>
      </div>
    </div>

    <!-- Form -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card class="bg-white">
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
          <CardDescription>
            Provide all the necessary information about your job posting
          </CardDescription>
        </CardHeader>

        <form @submit.prevent="submit">
          <CardContent class="space-y-6">
            <!-- Job Title -->
            <div class="space-y-2">
              <Label for="title">Job Title *</Label>
              <Input
                id="title"
                v-model="form.title"
                placeholder="e.g., Senior React Developer"
                required
              />
              <small v-if="form?.errors?.title" class="text-sm text-red-500">
                {{ form?.errors?.title }}
              </small>
            </div>

            <!-- Category -->
            <div class="space-y-2">
              <Label for="category">Category *</Label>
              <select
                id="category"
                v-model="form.category"
                class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="">Select a category</option>
                <option
                  v-for="cat in jobCategories"
                  :key="cat.id"
                  :value="cat.name"
                >
                  {{ cat.name }}
                </option>
              </select>
              <small v-if="form?.errors?.category" class="text-sm text-red-500">
                {{ form?.errors?.category }}
              </small>
            </div>

            <!-- Description -->
            <div class="space-y-2">
              <Label for="description">Job Description *</Label>
              <textarea
                id="description"
                v-model="form.description"
                rows="8"
                class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                placeholder="Describe the job requirements, responsibilities, and what you're looking for..."
                required
              ></textarea>
              <small
                v-if="form?.errors?.description"
                class="text-sm text-red-500"
              >
                {{ form?.errors?.description }}
              </small>
            </div>

            <!-- Job Type -->
            <div class="space-y-2">
              <Label>Job Type *</Label>
              <div class="flex gap-4">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    v-model="form.type"
                    value="fixed"
                    class="w-4 h-4 text-primary-600 focus:ring-primary-500"
                    required
                  />
                  <span class="text-slate-700">Fixed Price</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    v-model="form.type"
                    value="hourly"
                    class="w-4 h-4 text-primary-600 focus:ring-primary-500"
                    required
                  />
                  <span class="text-slate-700">Hourly Rate</span>
                </label>
              </div>
              <small v-if="form?.errors?.type" class="text-sm text-red-500">
                {{ form?.errors?.type }}
              </small>
            </div>

            <!-- Budget -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="budgetMin">Minimum Budget *</Label>
                <Input
                  id="budgetMin"
                  type="number"
                  v-model.number="form.budgetMin"
                  placeholder="0"
                  min="0"
                  required
                />
                <small
                  v-if="form?.errors?.budgetMin"
                  class="text-sm text-red-500"
                >
                  {{ form?.errors?.budgetMin }}
                </small>
              </div>
              <div class="space-y-2">
                <Label for="budgetMax">Maximum Budget *</Label>
                <Input
                  id="budgetMax"
                  type="number"
                  v-model.number="form.budgetMax"
                  placeholder="0"
                  min="0"
                  required
                />
                <small
                  v-if="form?.errors?.budgetMax"
                  class="text-sm text-red-500"
                >
                  {{ form?.errors?.budgetMax }}
                </small>
              </div>
            </div>

            <!-- Tags -->
            <div class="space-y-2">
              <Label for="tags">Skills/Tags (comma-separated)</Label>
              <Input
                id="tags"
                v-model="form.tags"
                placeholder="e.g., React, TypeScript, Node.js"
              />
              <small class="text-sm text-slate-500">
                Separate multiple tags with commas
              </small>
              <small v-if="form?.errors?.tags" class="text-sm text-red-500">
                {{ form?.errors?.tags }}
              </small>
            </div>

            <!-- Featured Job -->
            <div class="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                v-model="form.featured"
                class="w-4 h-4 text-primary-600 focus:ring-primary-500 rounded"
              />
              <Label for="featured" class="cursor-pointer">
                Feature this job (highlighted in listings)
              </Label>
            </div>
          </CardContent>

          <CardFooter class="flex gap-4">
            <Button type="submit" :disabled="form.processing" class="flex-1">
              {{ form.processing ? "Posting..." : "Post Job" }}
            </Button>
            <Button
              type="button"
              variant="outline"
              @click="$inertia.visit('/jobs')"
            >
              Cancel
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import { useForm, Head, router } from "@inertiajs/vue3";
import { jobCategories } from "@/data/jobs";
import Navbar from "@/Components/Navbar.vue";
import Footer from "@/Components/Footer.vue";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

const form = useForm({
  title: "",
  category: "",
  description: "",
  type: "fixed" as "fixed" | "hourly",
  budgetMin: 0,
  budgetMax: 0,
  tags: "",
  featured: false,
});

const submit = () => {
  form.post("/api/jobs", {
    // Controller will handle redirect to dashboard
    // Don't manually redirect to avoid duplicate requests
    onError: (errors) => {
      console.error("Validation errors:", errors);
    },
  });
};
</script>
