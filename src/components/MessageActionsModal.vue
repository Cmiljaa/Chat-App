<template>
	<div v-show="visible" class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/10"
		@click="emits('close-modal')">

		<div class="bg-white rounded-xl w-72 p-4 shadow-xl">
			<ul class="text-sm text-gray-800 divide-y divide-gray-200">
				<li class="py-2 text-gray-700 cursor-default">
					{{ props.message ? dayjs(props.message.createdAt.seconds * 1000 +
						Math.floor(props.message.createdAt.nanoseconds / 1_000_000)).format('MMM D, YYYY, HH:mm') :
						'Unknown' }}
				</li>
				<li class="py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
					@click="emits('copy-message')">
					📋 <span>Copy</span>
				</li>
				<li class="py-2 hover:bg-red-100 text-red-600 cursor-pointer flex items-center gap-2">
					class="py-2 hover:bg-red-100 text-red-600 cursor-pointer flex items-center gap-2"
					@click="emits('delete-message')">
					🗑️ <span>Delete</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import type { Message } from '../interfaces/message';
import type { ComputedRef } from 'vue';

const props = defineProps<{
	message: Message | null,
	visible: boolean
}>();

const emits = defineEmits(['copy-message', 'delete-message', 'close-modal']);

</script>
