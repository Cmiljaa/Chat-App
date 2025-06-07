<template>
	<form action="" @submit.prevent="registerUser" class="max-w-md mx-auto mt-10 p-6 bg-blue-50 rounded-lg shadow-md">
		<h1 class="text-3xl font-medium text-black mb-8 text-center">Sign Up</h1>

		<div class="space-y-6">
			<div class="space-y-6">
				<div class="relative mt-6">
					<label for="nickname" class="block mb-1 text-base text-black">
						Nickname
					</label>
					<input type="nickname" id="nickname" name="nickname" placeholder=" " required v-model="nickname"
						class="w-full px-4 py-2 text-black placeholder-transparent bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
				</div>

				<div class="relative mt-6">
					<label for="email" class="block mb-1 text-base text-black">
						Email
					</label>
					<input type="email" id="email" name="email" placeholder=" " required v-model="email"
						class="w-full px-4 py-2 text-black placeholder-transparent bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
				</div>

				<div class="relative mt-6">
					<label for="password" class="block mb-1 text-base text-black">
						Password
					</label>
					<input type="password" id="password" name="password" placeholder=" " required v-model="password"
						class="w-full px-4 py-2 text-black placeholder-transparent bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
				</div>
				<div class="relative mt-6">
					<label for="repeat_password" class="block mb-1 text-base text-black">
						Repeat Password
					</label>
					<input type="password" id="repeat_password" name="repeat_password" placeholder=" " required
						class="w-full px-4 py-2 text-black placeholder-transparent bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
				</div>

				<button type="submit"
					class="w-full py-2 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition">
					Submit
				</button>
			</div>
		</div>
	</form>
	<div>
		<p v-if="authError" class="text-center mt-5 text-xl text-red-600">
			{{ authError }} !
		</p>
	</div>
</template>
