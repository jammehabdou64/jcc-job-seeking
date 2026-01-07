<template>
  <Head>
    <title>Welcome</title>
    <meta name="description" content="Your page description" />
  </Head>
  <div class="flex flex-col min-h-screen">
    <div class="flex">
      <!-- Sidebar -->
      <aside class="hidden md:flex w-64 flex-col h-screen bg-muted border-r">
        <div class="p-4 border-b">
          <h2 class="text-xl font-bold">Dashboard</h2>
        </div>

        <div class="p-4 border-t absolute bottom-0">
          <Link href="/logout" class="text-gray-800"> Logout </Link>
        </div>
      </aside>

      <!-- Main content -->
      <main class="flex-1 p-6 overflow-auto">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-2xl font-bold">Welcome {{ auth?.name }}</h1>
          <Link href="/logout"> Logout </Link>
        </div>

        <!-- Stats cards -->
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card v-for="stat in stats" :key="stat.title">
            <CardHeader class="flex flex-row items-center justify-between pb-2">
              <CardTitle class="text-sm font-medium">{{
                stat.title
              }}</CardTitle>
              <component
                :is="stat.icon"
                class="h-4 w-4 text-muted-foreground"
              />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">{{ stat.value }}</div>
              <p class="text-xs text-muted-foreground">{{ stat.change }}</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  </div>
</template>
<script setup lang="ts">
import { usePage, Head, Link } from "@inertiajs/vue3";
import {
  ServerIcon,
  FileTextIcon,
  DatabaseIcon,
  UsersIcon,
  SettingsIcon,
  BarChartIcon,
  ClockIcon,
} from "lucide-vue-next";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

const auth: Record<string, any> = usePage().props.auth || {};

const stats = [
  {
    title: "Total Users",
    value: "1,234",
    change: "+12% from last month",
    icon: UsersIcon,
  },
  {
    title: "API Requests",
    value: "45.2k",
    change: "+8% from last month",
    icon: ServerIcon,
  },
  {
    title: "Response Time",
    value: "42ms",
    change: "-3ms from last month",
    icon: ClockIcon,
  },
  {
    title: "Active Projects",
    value: "12",
    change: "+2 from last month",
    icon: BarChartIcon,
  },
];
</script>
