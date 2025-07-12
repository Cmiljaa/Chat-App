<template>
	<div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
		<div class="bg-[#1f1f1f] text-white w-full max-w-md mx-4 p-6 rounded-2xl shadow-xl relative">
			<button
				class="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-400 hover:text-white text-2xl sm:text-3xl leading-none focus:outline-none cursor-pointer"
				@click="closeModal">
				&times;
			</button>

			<slot></slot>
		</div>
	</div>
</template>


<script setup lang="ts">

defineProps<{ isOpen: boolean }>();
const emit = defineEmits(['update:isOpen']);

const closeModal = () => {
	emit('update:isOpen', false);
};
</script>