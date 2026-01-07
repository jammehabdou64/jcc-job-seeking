<template>
  <Head>
    <title>Register</title>
    <meta name="description" content="Your page description" />
  </Head>
  <Header />
  <div
    class="container mx-auto flex items-center justify-center min-h-[calc(100vh-4rem)] py-12"
  >
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription
          >Enter your information to create an account</CardDescription
        >
      </CardHeader>
      <form @submit.prevent="submit">
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <Label for="name">Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              v-model="form.name"
              required
            />
            <small v-if="form?.errors?.name" class="text-sm text-red-500">
              {{ form?.errors?.name }}</small
            >
          </div>
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
            <Label for="password">Password</Label>
            <Input
              id="password"
              type="password"
              v-model="form.password"
              required
            />
            <small v-if="form?.errors?.password" class="text-sm text-red-500">
              {{ form?.errors?.password }}</small
            >
          </div>
          <div class="space-y-2">
            <Label for="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              v-model="form.confirmPassword"
              required
            />
            <small
              v-if="form?.errors?.confirmPassword"
              class="text-sm text-red-500"
            >
              {{ form?.errors?.confirmPassword }}</small
            >
          </div>
        </CardContent>
        <CardFooter class="flex flex-col space-y-4">
          <Button type="submit" class="w-full" :disabled="form.processing">
            {{ form.processing ? "Creating account..." : "Register" }}
          </Button>
          <div class="text-center text-sm">
            Already have an account?
            <Link href="/login" class="text-primary hover:underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Link, useForm, Head } from "@inertiajs/vue3";
import Header from "@/Components/Header.vue";
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
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const submit = () => {
  form.post("/auth/register");
};
</script>
