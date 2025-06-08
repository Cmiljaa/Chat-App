<template>
	<div class="flex-col min-h-screen">
		<NavBar></NavBar>

		<RouterView></RouterView>
	</div>

</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue';

</script>
