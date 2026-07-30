<script setup lang="ts">
import { computed, ref } from "vue";
import {
  events,
  filterEvents,
  findEvent,
  formatEventDate,
  formatEventPrice,
  type EventRecord,
} from "./logic";

import bancoImage from "../../original/backend/public/images/ff38ffc9112a430090f637c3bbc05dcd.jpg";
import blissImage from "../../original/backend/public/images/1612b793167347359651fb0c88cc313d.jpg";
import evoImage from "../../original/backend/public/images/2f0a35c0494d404da53b77b56ae761b5.jpg";
import festivalImage from "../../original/backend/public/images/017ba94beac84f8b93dfa3272c95b132.jpg";
import grandesImage from "../../original/backend/public/images/63b8b74fc2534eae919173f449740a35.jpg";
import jmjImage from "../../original/backend/public/images/222f6d055fe941cc9a0a7882f59107ad.png";
import lamireImage from "../../original/backend/public/images/aab9533ec1ca438d80130a8ebaa372da.jpg";
import maiaImage from "../../original/backend/public/images/7a5f17a359f04bf78d6e2083ac02409f.png";
import tamarizImage from "../../original/backend/public/images/155b5667fdea443486d2cc35bc4d3df4.jpg";
import timeoutImage from "../../original/backend/public/images/253972cbc8ac4a57ab190852e8b955b9.jpg";

const query = ref("");
const selectedSlug = ref("");
const requestedSlug = ref("");
const filtered = computed(() => filterEvents(events, query.value));
const selected = computed(() => (selectedSlug.value ? findEvent(selectedSlug.value) : undefined));
const missing = computed(
  () => Boolean(requestedSlug.value) && !findEvent(requestedSlug.value),
);

type BundledImage = string | { src: string };

const images: Record<string, BundledImage> = {
  "banco-alimentar-contra-fome": bancoImage,
  bliss: blissImage,
  "evo-padel-open": evoImage,
  "festival-f": festivalImage,
  "grandes-escolhas": grandesImage,
  "jmj-2023": jmjImage,
  lamire: lamireImage,
  "maia-jovem-international-tennis-cup": maiaImage,
  "tamariz-summer-fest": tamarizImage,
  "timeout-barcelona": timeoutImage,
};

function imageFor(event: EventRecord) {
  const image = images[event.slug];
  return typeof image === "string" ? image : image.src;
}

function openEvent(event: EventRecord) {
  requestedSlug.value = event.slug;
  selectedSlug.value = event.slug;
}

function openRequestedSlug() {
  selectedSlug.value = findEvent(requestedSlug.value)?.slug ?? "";
}

function goHome() {
  selectedSlug.value = "";
  requestedSlug.value = "";
}
</script>

<template>
  <section class="ticket-demo">
    <header class="ticket-nav">
      <button type="button" class="ticket-brand" @click="goHome">
        <span aria-hidden="true">3</span>
        <strong>3cket</strong>
      </button>
      <nav aria-label="Demo navigation">
        <button type="button" @click="goHome">Events</button>
        <span>Fixture-backed Nuxt adaptation</span>
      </nav>
    </header>

    <main v-if="selected" class="event-detail">
      <button type="button" class="back-link" @click="goHome">← All events</button>
      <section class="detail-heading">
        <div>
          <span>{{ selected.category }}</span>
          <h2>{{ selected.name }}</h2>
          <p>{{ selected.location.name }}, {{ selected.location.country }}</p>
        </div>
        <button type="button">Buy tickets <b>→</b></button>
      </section>
      <img :src="imageFor(selected)" :alt="`${selected.name} event artwork`" />
      <section class="detail-copy">
        <article>
          <p>Event details</p>
          <h3>A local presentation of the original dynamic route</h3>
          <span>
            This maintained page uses the imported event fixture directly. It preserves
            the original selection and detail workflow without requiring the Express
            service on localhost.
          </span>
        </article>
        <dl>
          <div><dt>Category</dt><dd>{{ selected.category }}</dd></div>
          <div><dt>Dates</dt><dd>{{ formatEventDate(selected.starts_at) }}–{{ formatEventDate(selected.ends_at) }}</dd></div>
          <div><dt>Location</dt><dd>{{ selected.location.name }}, {{ selected.location.country }}</dd></div>
          <div><dt>Price</dt><dd>{{ formatEventPrice(selected) }}</dd></div>
        </dl>
      </section>
    </main>

    <main v-else-if="missing" class="event-missing">
      <span>404</span>
      <h2>Event not found</h2>
      <p>The fixture has no event with slug “{{ requestedSlug }}”.</p>
      <button type="button" @click="goHome">Return to events</button>
    </main>

    <template v-else>
      <section class="ticket-hero">
        <div>
          <p>Live experiences · Local fixture</p>
          <h2>Find your next event.</h2>
          <span>Ten original records, one responsive grid, and no backend process.</span>
        </div>
        <strong aria-hidden="true">03</strong>
      </section>

      <main class="events-view">
        <section class="event-tools">
          <label>
            <span>Search events</span>
            <input v-model="query" placeholder="Name, category, city or country" />
          </label>
          <form @submit.prevent="openRequestedSlug">
            <label>
              <span>Preview dynamic slug</span>
              <input v-model="requestedSlug" placeholder="evo-padel-open" />
            </label>
            <button type="submit">Open route</button>
          </form>
        </section>

        <header class="events-heading">
          <div><p>Discover</p><h3>All events</h3></div>
          <span>{{ filtered.length }} of {{ events.length }} events</span>
        </header>

        <div v-if="filtered.length" class="event-grid">
          <article v-for="event in filtered" :key="event.id">
            <button type="button" @click="openEvent(event)">
              <div class="event-image">
                <img :src="imageFor(event)" :alt="`${event.name} artwork`" />
                <span>{{ event.category }}</span>
              </div>
              <div class="event-card-copy">
                <small>{{ formatEventDate(event.starts_at) }}</small>
                <h4>{{ event.name }}</h4>
                <p>{{ event.location.name }}, {{ event.location.country }}</p>
                <strong>{{ formatEventPrice(event) }}</strong>
              </div>
            </button>
          </article>
        </div>
        <div v-else class="empty-events">
          <h4>No events found</h4>
          <button type="button" @click="query = ''">Clear search</button>
        </div>
      </main>
    </template>

    <footer><strong>3cket</strong><span>Challenge solution preserved from branch 3cket</span></footer>
  </section>
</template>

<style scoped>
.ticket-demo {
  --ticket-blue: #2d58ff;
  --ticket-ink: #121725;
  width: 100%; overflow: hidden; border: 1px solid #dee2ed; border-radius: 1.25rem;
  color: var(--ticket-ink); background: #f6f7fb; font-family: Inter, ui-sans-serif, system-ui, sans-serif;
}
button, input { font: inherit; }
.ticket-nav, .ticket-nav nav, .ticket-brand, .detail-heading, .events-heading, footer {
  display: flex; align-items: center;
}
.ticket-nav {
  justify-content: space-between; gap: 1rem; padding: .85rem clamp(1rem, 4vw, 2rem);
  border-bottom: 1px solid #e4e7ef; background: white;
}
.ticket-brand { gap: .5rem; padding: 0; border: 0; color: var(--ticket-ink); background: transparent; cursor: pointer; }
.ticket-brand span {
  display: grid; place-items: center; width: 2rem; height: 2rem; border-radius: .55rem;
  color: white; background: var(--ticket-blue); font-size: 1.1rem; font-weight: 950;
}
.ticket-brand strong { font-size: 1rem; letter-spacing: -.04em; }
.ticket-nav nav { gap: .7rem; }.ticket-nav nav button { border: 0; background: transparent; font-weight: 800; cursor: pointer; }
.ticket-nav nav span { color: #72798a; font-size: .65rem; }
.ticket-hero {
  display: grid; grid-template-columns: 1fr auto; align-items: end; min-height: 20rem;
  padding: clamp(2rem, 6vw, 4.5rem); color: white;
  background: radial-gradient(circle at 80% 20%, #7b9aff, transparent 32%), linear-gradient(135deg, #152864, #2d58ff);
}
.ticket-hero p, .events-heading p, .detail-copy article > p {
  margin: 0 0 .5rem; color: #b9c8ff; font-size: .66rem; font-weight: 900;
  letter-spacing: .12em; text-transform: uppercase;
}
.ticket-hero h2 { max-width: 11ch; margin: 0; font-size: clamp(2.8rem, 7vw, 5rem); line-height: .92; letter-spacing: -.06em; }
.ticket-hero div > span { display: block; margin-top: 1rem; color: #dce3ff; }
.ticket-hero > strong { font-size: clamp(5rem, 15vw, 11rem); line-height: .7; opacity: .15; }
.events-view, .event-detail { padding: clamp(1.2rem, 4vw, 2.5rem); }
.event-tools { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.event-tools label > span { display: block; margin-bottom: .4rem; color: #646d80; font-size: .65rem; font-weight: 800; }
.event-tools input {
  width: 100%; box-sizing: border-box; padding: .75rem .85rem; border: 1px solid #d1d7e3;
  border-radius: .5rem; color: var(--ticket-ink); background: white;
}
.event-tools form { display: grid; grid-template-columns: 1fr auto; gap: .5rem; align-items: end; }
.event-tools form button, .event-missing button {
  padding: .75rem .9rem; border: 0; border-radius: .5rem; color: white;
  background: var(--ticket-blue); font-weight: 850; cursor: pointer;
}
.events-heading { justify-content: space-between; margin: 2rem 0 1rem; }
.events-heading h3 { margin: 0; font-size: 1.65rem; }.events-heading > span { color: #6d7587; font-size: .7rem; }
.event-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.event-grid article { overflow: hidden; border: 1px solid #e0e4ec; border-radius: .8rem; background: white; box-shadow: 0 8px 25px rgba(24,33,57,.05); }
.event-grid article > button { width: 100%; padding: 0; border: 0; color: inherit; background: transparent; text-align: left; cursor: pointer; }
.event-image { position: relative; height: 9rem; overflow: hidden; background: #dfe4f3; }
.event-image img { width: 100%; height: 100%; object-fit: cover; transition: transform .25s ease; }
.event-grid button:hover img { transform: scale(1.04); }
.event-image span {
  position: absolute; left: .7rem; bottom: .7rem; padding: .3rem .5rem; border-radius: 999px;
  color: white; background: rgba(18,23,37,.78); font-size: .58rem; font-weight: 900; text-transform: uppercase;
}
.event-card-copy { padding: 1rem; }.event-card-copy small { color: var(--ticket-blue); font-weight: 900; text-transform: uppercase; }
.event-card-copy h4 { min-height: 2.4em; margin: .5rem 0; font-size: 1rem; line-height: 1.2; }
.event-card-copy p { margin: 0; color: #697184; font-size: .7rem; }
.event-card-copy strong { display: block; margin-top: .8rem; font-size: .8rem; }
.back-link { margin-bottom: 1rem; padding: 0; border: 0; color: var(--ticket-blue); background: transparent; font-weight: 850; cursor: pointer; }
.detail-heading { justify-content: space-between; gap: 1rem; margin-bottom: 1rem; }
.detail-heading span { color: var(--ticket-blue); font-size: .65rem; font-weight: 900; text-transform: uppercase; }
.detail-heading h2 { margin: .35rem 0; font-size: clamp(2rem, 6vw, 4rem); line-height: .95; letter-spacing: -.05em; }
.detail-heading p { margin: 0; color: #6b7384; }
.detail-heading > button { padding: .75rem 1rem; border: 0; border-radius: .5rem; color: white; background: var(--ticket-blue); font-weight: 850; }
.event-detail > img { width: 100%; height: clamp(14rem, 40vw, 28rem); border-radius: .8rem; object-fit: cover; }
.detail-copy { display: grid; grid-template-columns: 1.2fr .8fr; gap: 2rem; padding: 2rem 0; }
.detail-copy h3 { margin: 0 0 .7rem; font-size: 1.5rem; }.detail-copy article > span { color: #697184; line-height: 1.65; }
.detail-copy dl { margin: 0; }.detail-copy dl div { display: grid; grid-template-columns: .7fr 1.3fr; gap: 1rem; padding: .7rem 0; border-bottom: 1px solid #dfe3eb; }
.detail-copy dt { color: #697184; font-size: .68rem; }.detail-copy dd { margin: 0; font-size: .75rem; font-weight: 800; }
.event-missing { min-height: 28rem; padding: 4rem 1rem; text-align: center; }
.event-missing > span { color: var(--ticket-blue); font-size: 5rem; font-weight: 950; opacity: .2; }
.event-missing h2 { margin: -.8rem 0 .5rem; font-size: 2.5rem; }.event-missing p { color: #6b7384; }
.empty-events { padding: 3rem; border-radius: .7rem; background: white; text-align: center; }
.empty-events button { border: 0; color: var(--ticket-blue); background: transparent; font-weight: 850; cursor: pointer; }
footer { justify-content: space-between; padding: 1rem 2rem; color: white; background: var(--ticket-ink); }
footer span { color: #aeb6c8; font-size: .65rem; }
@media (max-width: 760px) {
  .event-grid { grid-template-columns: 1fr 1fr; }
  .event-tools, .detail-copy { grid-template-columns: 1fr; }
  .ticket-nav nav span { display: none; }
}
@media (max-width: 500px) {
  .event-grid { grid-template-columns: 1fr; }
  .event-tools form { grid-template-columns: 1fr; }
  .detail-heading { align-items: flex-start; flex-direction: column; }
  .ticket-hero > strong { display: none; }
}
</style>
