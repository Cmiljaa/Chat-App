<template>
	<div v-show="visible" class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/10">

		<div class="bg-white rounded-xl w-72 p-4 shadow-xl">
			<ul class="text-sm text-gray-800 divide-y divide-gray-200">
				<li class="py-2 text-gray-500 cursor-default">
					Sent
						1_000_000)) }}
				</li>
				<li class="py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
					📋 <span>Copy</span>
				</li>
				<li class="py-2 hover:bg-red-100 text-red-600 cursor-pointer flex items-center gap-2">
					🗑️ <span>Delete</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import type { Message } from '../interfaces/message';

const props = defineProps<{
	message: Message | null,
	visible: boolean
}>();


</script>
