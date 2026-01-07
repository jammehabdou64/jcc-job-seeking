<template>
  <section class="bg-gradient-to-r from-primary-600 to-primary-700 py-16 px-4">
    <div class="max-w-4xl mx-auto text-center text-white">
      <h2 class="text-4xl font-bold mb-4">Ready to Get Started?</h2>
      <p class="text-lg mb-8 opacity-90">
        Join thousands of professionals finding their perfect match on JobHub
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/jobs">
          <Button variant="secondary" size="lg"> Browse Jobs </Button>
        </Link>
        <Link href="/post-job">
          <Button variant="secondary" size="lg"> Post a Job </Button>
        </Link>
      </div>
    </div>
  </section>
</template>

<script setup="ts"></script>
