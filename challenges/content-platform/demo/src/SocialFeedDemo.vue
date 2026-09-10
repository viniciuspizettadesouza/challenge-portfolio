<script setup lang="ts">
import { ref } from "vue";
import {
  displayedLikes,
  posts,
  togglePostVote,
  type SocialPost,
} from "./socialLogic";

const votes = ref<Record<number, boolean>>({});
const artworkLabels: Record<
  SocialPost["artwork"],
  [title: string, subtitle: string, symbol: string]
> = {
  launch: ["We are hiring", "Build what matters", "🚀"],
  meeting: ["Better together", "Ideas · People · Product", "◌"],
  wellbeing: ["Move. Breathe. Reset.", "Healthy teams do better work", "↗"],
  coding: ["const future = create();", "SHIP / LEARN / REPEAT", "</>"],
  mobile: ["Mobile makers wanted", "Join the crew", "▯"],
};

function vote(postId: number) {
  votes.value = togglePostVote(votes.value, postId);
}

function likeCount(post: SocialPost) {
  return new Intl.NumberFormat("en-GB").format(
    displayedLikes(post, Boolean(votes.value[post.id])),
  );
}
</script>

<template>
  <section class="lago-demo">
    <header class="lago-nav">
      <div class="lago-brand" aria-label="Lagoasoft social">
        <span class="lago-brand__camera" aria-hidden="true"><i></i></span>
        <strong>Lagoa Social</strong>
      </div>
      <div class="lago-nav__icons" aria-hidden="true">
        <span>⌂</span><span>♡</span><span class="lago-avatar lago-avatar--small">L</span>
      </div>
    </header>

    <div class="lago-intro">
      <div>
        <p>React voting challenge · 2019</p>
        <h2>A local social feed with independent likes</h2>
      </div>
      <span>Browser-only state</span>
    </div>

    <div class="lago-feed">
      <article v-for="post in posts" :key="post.id" class="lago-post">
        <header class="lago-post__header">
          <span class="lago-avatar" aria-hidden="true">L</span>
          <div>
            <strong>{{ post.nickname }}</strong>
            <small>Florianópolis, Brazil</small>
          </div>
          <span class="lago-more" aria-hidden="true">•••</span>
        </header>

        <div
          :class="`lago-art lago-art--${post.artwork}`"
          role="img"
          :aria-label="artworkLabels[post.artwork][0]"
        >
          <span class="lago-art__glow"></span>
          <div class="lago-art__content">
            <span class="lago-art__symbol">{{ artworkLabels[post.artwork][2] }}</span>
            <strong>{{ artworkLabels[post.artwork][0] }}</strong>
            <small>{{ artworkLabels[post.artwork][1] }}</small>
          </div>
          <span class="lago-art__grid"></span>
        </div>

        <div class="lago-post__body">
          <div class="lago-actions">
            <button
              type="button"
              :class="{ 'is-liked': votes[post.id] }"
              :aria-label="votes[post.id] ? `Unlike ${post.caption}` : `Like ${post.caption}`"
              :aria-pressed="Boolean(votes[post.id])"
              @click="vote(post.id)"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21.2l7.7-7.7 1.1-1.1a5.5 5.5 0 0 0 0-7.8Z"
                  :fill="votes[post.id] ? 'currentColor' : 'none'"
                  stroke="currentColor"
                  stroke-width="1.8"
                />
              </svg>
            </button>
            <span aria-hidden="true">○</span><span aria-hidden="true">⌁</span>
          </div>
          <p class="lago-likes"><strong>{{ likeCount(post) }}</strong> likes</p>
          <p class="lago-caption"><strong>{{ post.nickname }}</strong> {{ post.caption }}</p>
          <time>{{ post.date }}</time>
        </div>
      </article>
    </div>
  </section>
</template>

<style src="./social-styles.css"></style>
