<template>
  <Head>
    <title>Forgot Password - JobHub</title>
    <meta name="description" content="Reset your JobHub password" />
  </Head>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-primary-50 to-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Logo and Header -->
      <div class="text-center">
        <Link href="/" class="inline-flex items-center gap-2 mb-6">
          <div
            class="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
          >
            J
          </div>
          <span class="text-2xl font-bold text-slate-900">JobHub</span>
        </Link>
        <h2 class="text-3xl font-bold text-slate-900">Forgot your password?</h2>
        <p class="mt-2 text-sm text-slate-600">
          No worries! Enter your email and we'll send you reset instructions.
        </p>
      </div>

      <!-- Forgot Password Card -->
      <Card class="bg-white shadow-xl border-0">
        <CardHeader class="space-y-1 pb-4">
          <CardTitle class="text-2xl text-center">Reset Password</CardTitle>
          <CardDescription class="text-center">
            Enter your email address and we'll send you a link to reset your password
          </CardDescription>
        </CardHeader>

        <!-- Success Message -->
        <div v-if="status" class="mx-6 mb-4">
          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-green-800">
                  {{ status }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Error Alert -->
        <div v-if="form.errors && Object.keys(form.errors).length > 0" class="mx-6 mb-4">
          <div class="bg-red-50 border border-red-200 rounded-lg p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">
                  Please correct the following errors:
                </h3>
                <div class="mt-2 text-sm text-red-700">
                  <ul class="list-disc list-inside space-y-1">
                    <li v-for="(error, field) in form.errors" :key="field">
                      {{ Array.isArray(error) ? error[0] : error }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form @submit.prevent="submit">
          <CardContent class="space-y-4 pt-6">
            <!-- Email Field -->
            <div class="space-y-2">
              <Label for="email" class="text-slate-700 font-medium">
                Email address
              </Label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    class="h-5 w-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                <Input
                  id="email"
                  type="email"
                  v-model="form.email"
                  placeholder="name@example.com"
                  class="pl-10"
                  :class="{ 'border-red-500': form.errors?.email }"
                  required
                  autocomplete="email"
                />
              </div>
              <p v-if="form.errors?.email" class="text-sm text-red-600 mt-1">
                {{ Array.isArray(form.errors.email) ? form.errors.email[0] : form.errors.email }}
              </p>
            </div>
          </CardContent>

          <CardFooter class="flex flex-col space-y-4 pt-6">
            <Button
              type="submit"
              variant="primary"
              class="w-full"
              :disabled="form.processing"
              size="lg"
            >
              <span v-if="form.processing" class="flex items-center justify-center">
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </span>
              <span v-else>Send reset link</span>
            </Button>

            <div class="text-center text-sm">
              <Link
                href="/login"
                class="font-medium text-primary-600 hover:text-primary-700"
              >
                ← Back to login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Link, useForm, Head } from "@inertiajs/vue3";
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

const props = defineProps<{
  status?: string;
}>();

const form = useForm({
  email: "",
});

const submit = () => {
  form.post("/auth/forgot-password", {
    onSuccess: () => {
      form.reset();
    },
  });
};
</script>

