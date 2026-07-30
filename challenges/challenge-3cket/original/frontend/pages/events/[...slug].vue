<script setup lang="ts">
import { EventData } from "~/utils/types/index";

const route = useRoute();
const event = ref<EventData>();

function formatDate(datetime: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const locale = "en-US";
  return new Date(datetime).toLocaleDateString(locale, options);
}

const { data, pending, error } = await useFetch<{ data: EventData }>(
  `http://localhost:3001/events/${route.params.slug}`,
);

if (data.value) {
  event.value = data.value.data;
}
</script>

<template>
  <div v-if="pending" class="loading">Loading...</div>

  <EventNotFound v-if="error" />

  <div v-if="event" class="min-h-screen px-4 py-8">
    <section class="mb-4 flex flex-wrap items-center justify-between">
      <h1 class="order-1 w-full text-3xl font-semibold sm:w-auto">
        {{ event.name }}
      </h1>
      <button
        class="order-2 mt-2 w-full rounded bg-blue-500 p-2 text-white sm:mt-0 sm:w-32"
      >
        Buy Tickets
        <Icon name="mdi:chevron-right" class="" />
      </button>
    </section>

    <div
      class="h-64 bg-cover bg-center md:h-96"
      :style="{
        backgroundImage: `url('${event.theme.background_image.url}')`,
      }"
    ></div>

    <div class="rounded-lg bg-white p-6 shadow-md">
      <p class="mb-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        vehicula sapien euismod tempor tristique. Fusce in ultrices lorem. Morbi
        egestas venenatis dolor, nec faucibus ante iaculis hendrerit.
        Suspendisse malesuada finibus laoreet. Integer orci sem, egestas sed
        blandit at, mollis et nibh. Integer et mattis lectus. Maecenas in ornare
        lorem. Praesent fermentum pellentesque tortor, nec faucibus lectus
        semper quis. Mauris mi dui, elementum nec metus quis, semper blandit
        orci. Sed facilisis eleifend ex, id hendrerit velit maximus a.
      </p>

      <p class="mb-3">
        Phasellus dui felis, semper ac risus vitae, porttitor vestibulum ex.
        Phasellus ac semper arcu. Donec et tellus et ipsum pulvinar gravida.
        Quisque non sem ullamcorper orci vulputate ultricies vitae vitae diam.
        Vivamus quis cursus lorem. Vivamus commodo diam at lectus convallis
        suscipit. Nullam dignissim vestibulum nibh sollicitudin pellentesque.
        Maecenas ante tortor, pulvinar eu ipsum suscipit, sollicitudin sodales
        mauris. Curabitur pharetra metus mauris, nec viverra ipsum fringilla ac.
      </p>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <img
            v-if="event.theme.background_image.url"
            :src="event.theme.background_image.url"
            alt="Event Image"
            class="w-full rounded-lg"
          />
          <div v-else class="h-40 w-full rounded-lg bg-gray-300"></div>
        </div>

        <section>
          <p><strong>Category:</strong> {{ event.category }}</p>
          <p><strong>Status:</strong> {{ event.status }}</p>
          <p>
            <strong>Location:</strong> {{ event.location.name }},
            {{ event.location.country }}
          </p>
          <p><strong>Starts At:</strong> {{ formatDate(event.starts_at) }}</p>
          <p><strong>Ends At:</strong> {{ formatDate(event.ends_at) }}</p>
          <p>
            <strong>Price Range:</strong>
            {{ event.price_range.minimum.amount }} -
            {{ event.price_range.maximum.amount }}
            {{ event.price_range.minimum.currency }}
          </p>

          <button
            class="mt-2 flex w-full max-w-[10rem] items-center justify-center rounded bg-blue-500 p-2 text-white sm:w-36"
          >
            Buy Tickets
            <Icon name="mdi:chevron-right" class="" />
          </button>
        </section>
      </div>
    </div>
  </div>
</template>
