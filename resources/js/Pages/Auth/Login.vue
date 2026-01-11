<template>
  <Head>
    <title>Login - JobHub</title>
    <meta name="description" content="Login to your JobHub account" />
  </Head>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-primary-50 to-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
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
        <h2 class="text-3xl font-bold text-slate-900">Welcome back</h2>
        <p class="mt-2 text-sm text-slate-600">
          Sign in to your account to continue
        </p>
      </div>

      <!-- Login Card -->
      <Card class="bg-white shadow-xl border-0">
        <CardHeader class="space-y-1 pb-4">
          <CardTitle class="text-2xl text-center">Sign in</CardTitle>
          <CardDescription class="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <!-- Error Alert -->
        <div
          v-if="form.errors && Object.keys(form.errors).length > 0"
          class="mx-6 mb-4"
        >
          <div class="bg-red-50 border border-red-200 rounded-lg p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg
                  class="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
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
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
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
                {{
                  Array.isArray(form.errors.email)
                    ? form.errors.email[0]
                    : form.errors.email
                }}
              </p>
            </div>

            <!-- Password Field -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <Label for="password" class="text-slate-700 font-medium">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  class="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <Input
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  v-model="form.password"
                  placeholder="Enter your password"
                  class="pl-10 pr-10"
                  :class="{ 'border-red-500': form.errors?.password }"
                  required
                  autocomplete="current-password"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg
                    v-if="showPassword"
                    class="h-5 w-5 text-slate-400 hover:text-slate-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.736m0 0L21 21"
                    />
                  </svg>
                  <svg
                    v-else
                    class="h-5 w-5 text-slate-400 hover:text-slate-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
              <p v-if="form.errors?.password" class="text-sm text-red-600 mt-1">
                {{
                  Array.isArray(form.errors.password)
                    ? form.errors.password[0]
                    : form.errors.password
                }}
              </p>
            </div>

            <!-- Remember Me -->
            <div class="flex items-center">
              <input
                id="remember"
                type="checkbox"
                v-model="form.remember"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-slate-300 rounded"
              />
              <Label for="remember" class="ml-2 block text-sm text-slate-700">
                Remember me
              </Label>
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
              <span
                v-if="form.processing"
                class="flex items-center justify-center"
              >
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
                Signing in...
              </span>
              <span v-else>Sign in</span>
            </Button>

            <div class="text-center text-sm">
              <span class="text-slate-600">Don't have an account? </span>
              <Link
                href="/register"
                class="font-medium text-primary-600 hover:text-primary-700"
              >
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>

      <!-- Social Login (Optional) -->
      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-slate-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-slate-50 text-slate-500"
              >Or continue with</span
            >
          </div>
        </div>

        <div class="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            class="w-full inline-flex justify-center py-2 px-4 border border-slate-300 rounded-lg shadow-sm bg-white text-sm font-medium text-slate-500 hover:bg-slate-50"
          >
            <svg class="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span class="ml-2">Google</span>
          </button>

          <button
            type="button"
            class="w-full inline-flex justify-center py-2 px-4 border border-slate-300 rounded-lg shadow-sm bg-white text-sm font-medium text-slate-500 hover:bg-slate-50"
          >
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              />
            </svg>
            <span class="ml-2">GitHub</span>
          </button>
        </div>
      </div>
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

const showPassword = ref(false);

const form = useForm({
  email: "",
  password: "",
  remember: false,
});

const submit = () => {
  form.post("/auth/login", {
    onFinish: () => {
      form.reset("password");
    },
  });
};
</script>
