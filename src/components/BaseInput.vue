<template>
	<div class="relative mt-2">
		<label :for="id" class="block mb-0.5 text-sm text-black">
			{{ label }}
		</label>
		<input :type="type" :id="id" :name="name" :value="modelValue" required @input="onInput"
			class="w-full px-3 py-1.5 text-lg text-black placeholder-transparent bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
		<p class="text-red-500 text-base mt-1">
			{{ error }}
		</p>
	</div>
</template>

<script setup lang="ts">

import { defineProps, defineEmits } from 'vue';

defineProps({
	modelValue: String,
	type: {
		type: String,
		default: 'text'
	},
	id: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	label: {
		type: String,
		required: true
	},
	error: {
		required: false
	},
});

const emit = defineEmits(['update:modelValue']);

const onInput = (event: Event) => {
	const target = event.target as HTMLInputElement;
	emit('update:modelValue', target.value);
}

</script>