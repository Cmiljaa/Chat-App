<template>
	<form action="" class="max-w-md mx-auto mt-20 p-6 bg-blue-50 rounded-lg shadow-md">
		<h1 class="text-3xl font-medium text-black mb-8 text-center">Sign In</h1>

		<div class="space-y-6">
			<div class="space-y-6">
				<div class="relative mt-6">
					<label for="email" class="block mb-1 text-base text-black">
						Email
					</label>
					<input type="email" id="email" name="email" placeholder=" " required
						class="w-full px-4 py-2 text-black placeholder-transparent bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
				</div>

				<div class="relative mt-6">
					<label for="password" class="block mb-1 text-base text-black">
						Password
					</label>
					<input type="password" id="password" name="password" placeholder=" " required
						class="w-full px-4 py-2 text-black placeholder-transparent bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
				</div>

				<button type="submit"
					class="w-full py-2 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition">
					Submit
				</button>
			</div>
		</div>
	</form>
</template>

<script setup lang="ts">

</script>