<script setup lang="ts">
import { computed, ref } from "vue";
import {
  aggregateByOrganisation,
  categories,
  createEmissionResult,
  initialResults,
  organisations,
  type EmissionResult,
} from "./logic";

const colors = ["#22c55e", "#38bdf8", "#f97316"];
const results = ref<EmissionResult[]>(initialResults.map((result) => ({ ...result })));
const chartType = ref<"donut" | "bar">("donut");
const entityId = ref(organisations[0].id);
const categoryId = ref(2);
const kco2e = ref<number | null>(null);
const feedback = ref("");

const emissions = computed(() => aggregateByOrganisation(results.value, organisations));
const totalEmissions = computed(() =>
  emissions.value.reduce((sum, organisation) => sum + organisation.value, 0),
);
const maxEmployees = Math.max(...organisations.map(({ numberOfEmployees }) => numberOfEmployees));
const selectableCategories = categories.filter(({ categoryId }) => categoryId !== null);

const donutBackground = computed(() => {
  let position = 0;
  const stops = emissions.value.map(({ percentage }, index) => {
    const start = position;
    position += percentage;
    return `${colors[index]} ${start}% ${position}%`;
  });

  return `conic-gradient(${stops.join(", ")})`;
});

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 }).format(value);
}

function addResult() {
  try {
    const result = createEmissionResult(entityId.value, categoryId.value, Number(kco2e.value));
    results.value.push(result);
    const organisation = organisations.find(({ id }) => id === result.entityId);
    feedback.value = `${formatNumber(result.kco2e)} kgCO₂e added to ${organisation?.name}.`;
    kco2e.value = null;
  } catch (error) {
    feedback.value = error instanceof Error ? error.message : "Unable to add this result.";
  }
}
</script>

<template>
  <section class="climate-demo">
    <header class="intro">
      <div>
        <p class="eyebrow">ClimateSeed · Carbon dashboard</p>
        <h2>Organisation emissions overview</h2>
        <p>
          Explore the original local dataset and add a result to see every chart update
          immediately.
        </p>
      </div>
      <div class="total">
        <span>Total recorded</span>
        <strong>{{ formatNumber(totalEmissions) }}</strong>
        <small>kgCO₂e</small>
      </div>
    </header>

    <div class="dashboard">
      <article class="card employees">
        <div class="card-heading">
          <div>
            <p class="eyebrow">Team size</p>
            <h3>Employees by organisation</h3>
          </div>
          <span class="badge">Local data</span>
        </div>

        <div class="employee-bars">
          <div v-for="organisation in organisations" :key="organisation.id" class="employee-row">
            <div class="bar-label">
              <span>{{ organisation.name }}</span>
              <strong>{{ organisation.numberOfEmployees }}</strong>
            </div>
            <div class="bar-track">
              <span
                :style="{
                  width: `${(organisation.numberOfEmployees / maxEmployees) * 100}%`,
                }"
              ></span>
            </div>
          </div>
        </div>
      </article>

      <article class="card emissions-card">
        <div class="card-heading">
          <div>
            <p class="eyebrow">Carbon footprint</p>
            <h3>Emissions by organisation</h3>
          </div>
          <div class="chart-toggle" aria-label="Chart type">
            <button
              type="button"
              :class="{ active: chartType === 'donut' }"
              :aria-pressed="chartType === 'donut'"
              @click="chartType = 'donut'"
            >
              Donut
            </button>
            <button
              type="button"
              :class="{ active: chartType === 'bar' }"
              :aria-pressed="chartType === 'bar'"
              @click="chartType = 'bar'"
            >
              Bars
            </button>
          </div>
        </div>

        <div class="chart-area">
          <div v-if="chartType === 'donut'" class="donut-wrap">
            <div class="donut" :style="{ background: donutBackground }">
              <div>
                <strong>{{ formatNumber(totalEmissions) }}</strong>
                <span>kgCO₂e</span>
              </div>
            </div>
          </div>
          <div v-else class="emission-bars">
            <div v-for="(organisation, index) in emissions" :key="organisation.id">
              <span
                :style="{
                  height: `${Math.max(organisation.percentage, 3)}%`,
                  background: colors[index],
                }"
              ></span>
              <small>{{ organisation.name }}</small>
            </div>
          </div>

          <ul class="legend">
            <li v-for="(organisation, index) in emissions" :key="organisation.id">
              <i :style="{ background: colors[index] }"></i>
              <span>{{ organisation.name }}</span>
              <strong>{{ formatNumber(organisation.value) }}</strong>
              <small>{{ organisation.percentage.toFixed(1) }}%</small>
            </li>
          </ul>
        </div>
      </article>
    </div>

    <article class="card form-card">
      <div>
        <p class="eyebrow">Try the data flow</p>
        <h3>Add an emissions result</h3>
        <p>The record stays in this browser session and updates the visualisation above.</p>
      </div>

      <form @submit.prevent="addResult">
        <label>
          Organisation
          <select v-model.number="entityId">
            <option
              v-for="organisation in organisations"
              :key="organisation.id"
              :value="organisation.id"
            >
              {{ organisation.name }}
            </option>
          </select>
        </label>
        <label>
          Category
          <select v-model.number="categoryId">
            <option
              v-for="category in selectableCategories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }} · {{ category.scope }}
            </option>
          </select>
        </label>
        <label>
          Emissions (kgCO₂e)
          <input
            v-model.number="kco2e"
            type="number"
            min="1"
            step="1"
            placeholder="e.g. 450"
          />
        </label>
        <button type="submit">Add result</button>
      </form>
      <p class="feedback" aria-live="polite">{{ feedback }}</p>
    </article>
  </section>
</template>

<style scoped>
.climate-demo {
  --ink: #173128;
  --muted: #52615b;
  --line: #dbe8e1;
  --green: #0b7045;
  color: var(--ink);
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  display: grid;
  gap: 1.15rem;
  width: 100%;
}

.intro,
.card-heading,
.bar-label,
.legend li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.intro {
  align-items: flex-end;
  padding: 1.5rem;
  border-radius: 1.25rem;
  color: white;
  background:
    radial-gradient(circle at 88% 12%, rgba(94, 234, 212, 0.25), transparent 32%),
    linear-gradient(135deg, #0c3127, #12613e);
}

.intro h2,
.card h3,
.intro p {
  margin: 0;
}

.intro h2 {
  max-width: 17ch;
  font-size: clamp(1.55rem, 3vw, 2.25rem);
  line-height: 1.05;
}

.intro > div > p:last-child {
  max-width: 58ch;
  margin-top: 0.75rem;
  color: #d8eee5;
}

.eyebrow {
  margin: 0 0 0.35rem;
  color: var(--green);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.intro .eyebrow {
  color: #83e8bd;
}

.total {
  min-width: 9rem;
  padding: 0.85rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.1);
}

.total span,
.total small {
  display: block;
  color: #bfe5d6;
  font-size: 0.72rem;
}

.total strong {
  display: block;
  margin: 0.15rem 0;
  font-size: 1.45rem;
}

.dashboard {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  gap: 1.15rem;
}

.card {
  padding: 1.25rem;
  border: 1px solid var(--line);
  border-radius: 1.15rem;
  background: #fff;
  box-shadow: 0 16px 40px rgba(20, 60, 45, 0.07);
}

.card-heading {
  align-items: flex-start;
}

.card h3 {
  font-size: 1.1rem;
}

.badge {
  padding: 0.3rem 0.55rem;
  border-radius: 999px;
  color: #18714c;
  background: #e7f7ef;
  font-size: 0.68rem;
  font-weight: 800;
  white-space: nowrap;
}

.employee-bars {
  display: grid;
  gap: 1.15rem;
  margin-top: 2rem;
}

.bar-label {
  margin-bottom: 0.4rem;
  color: var(--muted);
  font-size: 0.82rem;
}

.bar-label strong {
  color: var(--ink);
}

.bar-track {
  overflow: hidden;
  height: 0.65rem;
  border-radius: 999px;
  background: #edf3ef;
}

.bar-track span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #22c55e, #0e8a57);
}

.chart-toggle {
  display: flex;
  padding: 0.2rem;
  border-radius: 0.65rem;
  background: #edf3ef;
}

.chart-toggle button {
  padding: 0.4rem 0.65rem;
  border: 0;
  border-radius: 0.5rem;
  color: var(--muted);
  background: transparent;
  font: inherit;
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
}

.chart-toggle button.active {
  color: var(--ink);
  background: white;
  box-shadow: 0 2px 8px rgba(23, 49, 40, 0.1);
}

.chart-area {
  display: grid;
  grid-template-columns: minmax(10rem, 0.9fr) minmax(12rem, 1.1fr);
  align-items: center;
  gap: 1.25rem;
  min-height: 14rem;
  margin-top: 1rem;
}

.donut-wrap {
  display: grid;
  place-items: center;
}

.donut {
  display: grid;
  place-items: center;
  width: min(11rem, 100%);
  aspect-ratio: 1;
  border-radius: 50%;
}

.donut > div {
  display: grid;
  place-items: center;
  width: 68%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #fff;
}

.donut strong,
.donut span {
  display: block;
}

.donut strong {
  align-self: end;
  font-size: 1.2rem;
}

.donut span {
  align-self: start;
  color: var(--muted);
  font-size: 0.7rem;
}

.emission-bars {
  display: flex;
  align-items: end;
  justify-content: center;
  gap: 0.65rem;
  height: 12rem;
}

.emission-bars > div {
  display: grid;
  grid-template-rows: 1fr auto;
  align-items: end;
  width: 28%;
  height: 100%;
  text-align: center;
}

.emission-bars span {
  display: block;
  width: 100%;
  min-height: 0.4rem;
  border-radius: 0.5rem 0.5rem 0.15rem 0.15rem;
}

.emission-bars small {
  overflow: hidden;
  margin-top: 0.35rem;
  font-size: 0.62rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.legend {
  display: grid;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.legend li {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding-bottom: 0.65rem;
  border-bottom: 1px solid #edf3ef;
  font-size: 0.78rem;
}

.legend i {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
}

.legend strong {
  font-size: 0.78rem;
}

.legend small {
  grid-column: 2 / -1;
  color: var(--muted);
}

.form-card > div > p:last-child {
  margin: 0.35rem 0 0;
  color: var(--muted);
  font-size: 0.85rem;
}

.form-card form {
  display: grid;
  grid-template-columns: 1fr 1.25fr 1fr auto;
  align-items: end;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.form-card label {
  display: grid;
  gap: 0.35rem;
  color: var(--muted);
  font-size: 0.72rem;
  font-weight: 700;
}

.form-card select,
.form-card input,
.form-card button {
  min-height: 2.65rem;
  border: 1px solid var(--line);
  border-radius: 0.65rem;
  font: inherit;
}

.form-card select,
.form-card input {
  width: 100%;
  padding: 0 0.65rem;
  color: var(--ink);
  background: white;
}

.form-card button {
  padding: 0 1rem;
  border-color: var(--green);
  color: white;
  background: var(--green);
  font-weight: 800;
  cursor: pointer;
}

.form-card button:hover {
  background: #126e47;
}

.feedback {
  min-height: 1.25rem;
  margin: 0.65rem 0 0;
  color: var(--green);
  font-size: 0.78rem;
  font-weight: 700;
}

@media (max-width: 760px) {
  .intro,
  .dashboard,
  .chart-area,
  .form-card form {
    grid-template-columns: 1fr;
  }

  .intro {
    align-items: stretch;
  }

  .total {
    min-width: 0;
  }

  .chart-area {
    min-height: 0;
  }
}
</style>
