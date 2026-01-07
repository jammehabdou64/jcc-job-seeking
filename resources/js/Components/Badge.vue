<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  label: string
  variant?: 'default' | 'primary' | 'accent' | 'success' | 'outline'
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'sm',
})

const badgeClasses = computed(() => {
  const baseClasses =
    'inline-flex items-center font-medium rounded-full whitespace-nowrap transition-colors'

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  }

  const variantClasses = {
    default: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
    primary: 'bg-primary-100 text-primary-700 hover:bg-primary-200',
    accent: 'bg-accent-100 text-accent-700 hover:bg-accent-200',
    success: 'bg-success-100 text-success-700 hover:bg-success-200',
    outline: 'border border-slate-300 text-slate-700 hover:bg-slate-50',
  }

  return `${baseClasses} ${sizeClasses[props.size]} ${variantClasses[props.variant]}`
})
</script>

<template>
  <span :class="badgeClasses">
    {{ label }}
  </span>
</template>
