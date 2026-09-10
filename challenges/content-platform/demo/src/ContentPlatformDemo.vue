<script setup lang="ts">
import { ref } from "vue";
import NewsPublishingDemo from "./NewsPublishingDemo.vue";
import SocialFeedDemo from "./SocialFeedDemo.vue";

type Channel = "news" | "social";

const channel = ref<Channel>("news");
</script>

<template>
  <section class="content-platform">
    <header class="content-header">
      <div class="content-brand">
        <span aria-hidden="true">CP</span>
        <div>
          <p>Content &amp; Media</p>
          <h2>Content Platform</h2>
        </div>
      </div>
      <nav aria-label="Content Platform channels">
        <button
          type="button"
          :class="{ active: channel === 'news' }"
          :aria-pressed="channel === 'news'"
          @click="channel = 'news'"
        >
          News
        </button>
        <button
          type="button"
          :class="{ active: channel === 'social' }"
          :aria-pressed="channel === 'social'"
          @click="channel = 'social'"
        >
          Social feed
        </button>
      </nav>
    </header>

    <p class="content-intro">
      Publish local stories, explore editorial perspectives, and review
      browser-only audience engagement.
    </p>

    <NewsPublishingDemo v-if="channel === 'news'" />
    <SocialFeedDemo v-else />
  </section>
</template>

<style scoped>
.content-platform {
  --content-blue: #3156d9;
  width: 100%;
  padding: clamp(.75rem, 2vw, 1.25rem);
  border: 1px solid #dde2ed;
  border-radius: 1.5rem;
  color: #151b2b;
  background: linear-gradient(145deg, #eef1ff, #f8f9fc 42%, #f7eef5);
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
}
.content-header, .content-brand, .content-header nav { display: flex; align-items: center; }
.content-header { justify-content: space-between; gap: 1rem; padding: .35rem .35rem 1rem; }
.content-brand { gap: .75rem; }
.content-brand > span {
  display: grid; place-items: center; width: 2.5rem; height: 2.5rem;
  border-radius: .75rem; color: white;
  background: linear-gradient(145deg, var(--content-blue), #9d386f);
  font-size: .72rem; font-weight: 950; letter-spacing: .05em;
}
.content-brand p, .content-brand h2, .content-intro { margin: 0; }
.content-brand p { color: #59647a; font-size: .62rem; font-weight: 850; letter-spacing: .1em; text-transform: uppercase; }
.content-brand h2 { font-size: 1.25rem; letter-spacing: -.03em; }
.content-header nav { gap: .3rem; padding: .3rem; border-radius: .75rem; background: white; box-shadow: 0 8px 24px rgba(31, 47, 83, .08); }
.content-header nav button {
  padding: .65rem 1rem; border: 0; border-radius: .55rem; color: #4b566d;
  background: transparent; font: inherit; font-size: .78rem; font-weight: 850; cursor: pointer;
}
.content-header nav button.active { color: white; background: var(--content-blue); }
.content-intro { padding: 0 .35rem 1rem; color: #59647a; font-size: .78rem; line-height: 1.5; }
@media (max-width: 38rem) {
  .content-header { align-items: flex-start; flex-direction: column; }
  .content-header nav { width: 100%; }
  .content-header nav button { flex: 1; }
}
</style>
