<template>
  <div class="error flex h-screen flex-col items-center">
    <h1 class="my-5 text-4xl font-semibold">
      Event not found, do you want to return to the main page?
    </h1>
    <button
      @click="navigateTo('/')"
      class="mt-4 w-1/3 rounded bg-blue-500 px-4 py-2 text-white"
    >
      Back
    </button>
  </div>
</template>
