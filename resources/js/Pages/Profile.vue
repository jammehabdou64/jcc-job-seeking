<template>
  <Head>
    <title>Profile - JobHub</title>
    <meta name="description" content="Manage your JobHub profile" />
  </Head>
  <Navbar />
  <div class="bg-slate-50 min-h-[calc(100vh-64px)]">
    <!-- Header -->
    <div class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 class="text-4xl font-bold text-slate-900 mb-2">Profile Settings</h1>
        <p class="text-lg text-slate-600">
          Manage your account information and preferences
        </p>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Sidebar Navigation -->
        <div class="lg:col-span-1">
          <Card class="bg-white sticky top-20">
            <CardContent class="p-0">
              <nav class="space-y-1 p-4">
                <button
                  @click="activeTab = 'profile'"
                  :class="[
                    'w-full text-left px-4 py-3 rounded-lg font-medium transition-colors',
                    activeTab === 'profile'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-slate-600 hover:bg-slate-100',
                  ]"
                >
                  Profile Information
                </button>
                <button
                  @click="activeTab = 'password'"
                  :class="[
                    'w-full text-left px-4 py-3 rounded-lg font-medium transition-colors',
                    activeTab === 'password'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-slate-600 hover:bg-slate-100',
                  ]"
                >
                  Change Password
                </button>
                <button
                  @click="activeTab = 'notifications'"
                  :class="[
                    'w-full text-left px-4 py-3 rounded-lg font-medium transition-colors',
                    activeTab === 'notifications'
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-slate-600 hover:bg-slate-100',
                  ]"
                >
                  Notifications
                </button>
              </nav>
            </CardContent>
          </Card>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Profile Information Tab -->
          <Card v-show="activeTab === 'profile'" class="bg-white">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your account's profile information
              </CardDescription>
            </CardHeader>
            <form @submit.prevent="updateProfile">
              <CardContent class="space-y-4">
                <!-- Avatar -->
                <div class="flex items-center gap-6">
                  <div class="relative">
                    <div
                      class="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-2xl overflow-hidden"
                    >
                      <img
                        v-if="avatarUrl"
                        :src="avatarUrl"
                        alt="Profile"
                        class="w-full h-full object-cover"
                      />
                      <span v-else>{{ userInitials }}</span>
                    </div>
                    <input
                      ref="avatarInputRef"
                      type="file"
                      accept="image/jpeg,image/png,image/gif"
                      class="hidden"
                      @change="onAvatarSelected"
                    />
                    <button
                      type="button"
                      class="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border border-slate-200 hover:bg-slate-50 cursor-pointer"
                      @click="triggerAvatarInput"
                    >
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
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-slate-900">
                      Profile Picture
                    </p>
                    <p class="text-xs text-slate-500">
                      JPG, PNG or GIF. Max size 2MB
                    </p>
                  </div>
                </div>

                <!-- Name -->
                <div class="space-y-2">
                  <Label for="name">Full Name</Label>
                  <Input
                    id="name"
                    v-model="profileForm.name"
                    placeholder="John Doe"
                    :class="{ 'border-red-500': profileForm.errors?.name }"
                  />
                  <p
                    v-if="profileForm.errors?.name"
                    class="text-sm text-red-600"
                  >
                    {{ profileForm.errors.name }}
                  </p>
                </div>

                <!-- Email -->
                <div class="space-y-2">
                  <Label for="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    v-model="profileForm.email"
                    placeholder="name@example.com"
                    :class="{ 'border-red-500': profileForm.errors?.email }"
                  />
                  <p
                    v-if="profileForm.errors?.email"
                    class="text-sm text-red-600"
                  >
                    {{ profileForm.errors.email }}
                  </p>
                </div>

                <!-- Bio -->
                <div class="space-y-2">
                  <Label for="bio">Bio</Label>
                  <textarea
                    id="bio"
                    v-model="profileForm.bio"
                    rows="4"
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    placeholder="Tell us about yourself..."
                  ></textarea>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  :disabled="profileForm.processing"
                  class="w-full sm:w-auto"
                >
                  {{ profileForm.processing ? "Saving..." : "Save Changes" }}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <!-- Change Password Tab -->
          <Card v-show="activeTab === 'password'" class="bg-white">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Ensure your account is using a strong password
              </CardDescription>
            </CardHeader>
            <form @submit.prevent="updatePassword">
              <CardContent class="space-y-4">
                <!-- Current Password -->
                <div class="space-y-2">
                  <Label for="currentPassword">Current Password</Label>
                  <div class="relative">
                    <Input
                      id="currentPassword"
                      :type="showCurrentPassword ? 'text' : 'password'"
                      v-model="passwordForm.currentPassword"
                      :class="{
                        'border-red-500': passwordForm.errors?.currentPassword,
                      }"
                    />
                    <button
                      type="button"
                      @click="showCurrentPassword = !showCurrentPassword"
                      class="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <svg
                        v-if="showCurrentPassword"
                        class="h-5 w-5 text-slate-400"
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
                        class="h-5 w-5 text-slate-400"
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
                  <p
                    v-if="passwordForm.errors?.currentPassword"
                    class="text-sm text-red-600"
                  >
                    {{ passwordForm.errors.currentPassword }}
                  </p>
                </div>

                <!-- New Password -->
                <div class="space-y-2">
                  <Label for="newPassword">New Password</Label>
                  <div class="relative">
                    <Input
                      id="newPassword"
                      :type="showNewPassword ? 'text' : 'password'"
                      v-model="passwordForm.password"
                      :class="{
                        'border-red-500': passwordForm.errors?.password,
                      }"
                    />
                    <button
                      type="button"
                      @click="showNewPassword = !showNewPassword"
                      class="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <svg
                        v-if="showNewPassword"
                        class="h-5 w-5 text-slate-400"
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
                        class="h-5 w-5 text-slate-400"
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
                  <p
                    v-if="passwordForm.errors?.password"
                    class="text-sm text-red-600"
                  >
                    {{ passwordForm.errors.password }}
                  </p>
                </div>

                <!-- Confirm Password -->
                <div class="space-y-2">
                  <Label for="confirmPassword">Confirm New Password</Label>
                  <div class="relative">
                    <Input
                      id="confirmPassword"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      v-model="passwordForm.passwordConfirmation"
                      :class="{
                        'border-red-500':
                          passwordForm.errors?.passwordConfirmation,
                      }"
                    />
                    <button
                      type="button"
                      @click="showConfirmPassword = !showConfirmPassword"
                      class="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <svg
                        v-if="showConfirmPassword"
                        class="h-5 w-5 text-slate-400"
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
                        class="h-5 w-5 text-slate-400"
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
                  <p
                    v-if="passwordForm.errors?.passwordConfirmation"
                    class="text-sm text-red-600"
                  >
                    {{ passwordForm.errors.passwordConfirmation }}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  :disabled="passwordForm.processing"
                  class="w-full sm:w-auto"
                >
                  {{
                    passwordForm.processing ? "Updating..." : "Update Password"
                  }}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <!-- Notifications Tab -->
          <Card v-show="activeTab === 'notifications'" class="bg-white">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <form @submit.prevent="saveNotifications">
              <CardContent class="space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-slate-900">
                      Email Notifications
                    </p>
                    <p class="text-sm text-slate-500">
                      Receive email updates about your jobs and applications
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    v-model="notifications.email"
                    class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-slate-300 rounded"
                  />
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-slate-900">Job Alerts</p>
                    <p class="text-sm text-slate-500">
                      Get notified when new jobs match your skills
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    v-model="notifications.jobAlerts"
                    class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-slate-300 rounded"
                  />
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-slate-900">
                      Application Updates
                    </p>
                    <p class="text-sm text-slate-500">
                      Updates on your job applications
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    v-model="notifications.applicationUpdates"
                    class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-slate-300 rounded"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  :disabled="notificationsForm.processing"
                  class="w-full sm:w-auto"
                >
                  {{
                    notificationsForm.processing
                      ? "Saving..."
                      : "Save Preferences"
                  }}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useForm, usePage, Head } from "@inertiajs/vue3";
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
import { toast } from "vue-sonner";

const page = usePage();
const auth: Record<string, any> = page.props.auth || {};

const activeTab = ref<"profile" | "password" | "notifications">("profile");

const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

const avatarInputRef = ref<HTMLInputElement | null>(null);
const avatarPreview = ref<string | null>(auth?.avatar || null);

const profileForm = useForm({
  name: auth?.name || "",
  email: auth?.email || "",
  bio: auth?.bio || "",
  avatar: null as File | null,
});

const passwordForm = useForm({
  currentPassword: "",
  password: "",
  passwordConfirmation: "",
});

const notifications = ref({
  email: auth?.email_notifications ?? true,
  jobAlerts: auth?.job_alerts ?? true,
  applicationUpdates: auth?.application_updates ?? true,
});

const notificationsForm = useForm({
  email_notifications: auth?.email_notifications ?? true,
  job_alerts: auth?.job_alerts ?? true,
  application_updates: auth?.application_updates ?? true,
});

const saveNotifications = () => {
  notificationsForm.email_notifications = notifications.value.email;
  notificationsForm.job_alerts = notifications.value.jobAlerts;
  notificationsForm.application_updates =
    notifications.value.applicationUpdates;
  notificationsForm.put("/profile/notifications", {
    preserveScroll: true,
  });
};

const userInitials = computed(() => {
  if (!auth?.name) return "U";
  const names = auth.name.split(" ");
  if (names.length >= 2) {
    return (names[0][0] + names[1][0]).toUpperCase();
  }
  return auth.name.substring(0, 2).toUpperCase();
});

const avatarUrl = computed(() => {
  const a = avatarPreview.value || auth?.avatar;
  if (!a) return null;
  // blob URLs (e.g. from URL.createObjectURL) and absolute URLs must be used as-is
  if (typeof a === "string" && (a.startsWith("blob:") || a.startsWith("http") || a.startsWith("/")))
    return a;
  return `/${a}`;
});

const triggerAvatarInput = () => {
  avatarInputRef.value?.click();
};

const onAvatarSelected = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file && file.size <= 2 * 1024 * 1024) {
    profileForm.avatar = file;
    avatarPreview.value = URL.createObjectURL(file);
  } else if (file && file.size > 2 * 1024 * 1024) {
    alert("Image must be 2MB or smaller");
  }
  input.value = "";
};

const updateProfile = () => {
  const options = {
    preserveScroll: true,
    forceFormData: true,
    onSuccess: () => {
      toast.success("Profile updated successfully");
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  };
  // Use POST when avatar is present (PUT + multipart can fail with express-fileupload)
  if (profileForm.avatar) {
    profileForm.post(`/profile/${auth?.id}`, options);
  } else {
    profileForm.put(`/profile/${auth?.id}`, options);
  }
};

const updatePassword = () => {
  passwordForm.put(`/profile/password/${auth?.id}`, {
    preserveScroll: true,
    onSuccess: () => {
      passwordForm.reset();
    },
  });
};
</script>
