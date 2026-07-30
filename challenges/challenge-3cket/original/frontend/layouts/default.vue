<template>
  <UContainer>
    <header>
      <nav class="flex justify-center py-5">
        <NuxtLink to="/">
          <NuxtImg
            src="/icon.svg"
            alt="Icon"
            width="100"
            height="100"
            class="py-2"
          />
        </NuxtLink>
      </nav>
    </header>

    <slot />

    <footer>
      <nav class="flex justify-center py-5">
        <NuxtLink to="/">
          <NuxtImg
            src="/icon.svg"
            alt="Icon"
            width="100"
            height="100"
            class="py-2"
          />
        </NuxtLink>
      </nav>
    </footer>
  </UContainer>
</template>
