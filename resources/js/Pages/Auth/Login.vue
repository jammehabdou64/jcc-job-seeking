<template>
  <Head>
    <title>Login</title>
    <meta name="description" content="Your page description" />
  </Head>
  <Header />
  <div
    class="container mx-auto flex items-center justify-center min-h-[calc(100vh-4rem)] py-12"
  >
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription
          >Enter your credentials to access your account</CardDescription
        >
      </CardHeader>
      <form @submit.prevent="submit">
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              v-model="form.email"
              required
            />
            <small v-if="form?.errors?.email" class="text-sm text-red-500">
              {{ form?.errors?.email }}</small
            >
          </div>
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <Label for="password">Password</Label>
              <Link
                href="/forgot-password"
                class="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              v-model="form.password"
              required
            />
          </div>
        </CardContent>
        <CardFooter class="flex flex-col space-y-4">
          <Button type="submit" class="w-full" :disabled="form.processing">
            {{ form.processing ? "Logging in..." : "Login" }}
          </Button>
          <div class="text-center text-sm">
            Don't have an account?
            <Link href="/register" class="text-primary hover:underline">
              Register
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  </div>
</template>

<script setup lang="ts">
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
import Header from "@/Components/Header.vue";
const form = useForm({
  email: "",
  password: "",
});

const submit = () => {
  form.post("/auth/login");
};
</script>
