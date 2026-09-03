<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import {
  categories,
  createArticle,
  filterArticles,
  initialArticles,
  visibleArticles,
  type Article,
  type ArticleDraft,
  type Category,
} from "./logic";

type View = "home" | "article" | "profile" | "write";

const articles = ref<Article[]>(initialArticles.map((article) => ({ ...article })));
const selectedCategories = ref<Category[]>([]);
const visibleLimit = ref(4);
const view = ref<View>("home");
const selectedArticle = ref<Article | null>(null);
const authenticated = ref(false);
const feedback = ref("");
const imagePreview = ref("");
const imageName = ref("");
const demoUser = {
  name: "Alex Morgan",
  givenName: "Alex",
  email: "alex.morgan@example.test",
  role: "Demo author",
};
const draft = reactive<ArticleDraft>({
  title: "",
  description: "",
  category: "",
  content: "",
});

const filtered = computed(() => filterArticles(articles.value, selectedCategories.value));
const displayed = computed(() =>
  visibleArticles(articles.value, selectedCategories.value, visibleLimit.value),
);
const canLoadMore = computed(() => displayed.value.length < filtered.value.length);

function navigate(nextView: View) {
  view.value = nextView;
  feedback.value = "";
}

function toggleCategory(category: Category) {
  selectedCategories.value = selectedCategories.value.includes(category)
    ? selectedCategories.value.filter((item) => item !== category)
    : [...selectedCategories.value, category];
  visibleLimit.value = 4;
}

function openArticle(article: Article) {
  selectedArticle.value = article;
  navigate("article");
}

function login() {
  authenticated.value = true;
  feedback.value = "Local demo session started.";
}

function logout() {
  authenticated.value = false;
  navigate("home");
}

function openProtected(nextView: "profile" | "write") {
  if (!authenticated.value) {
    feedback.value = "Start the local demo session to access this view.";
    return;
  }
  navigate(nextView);
}

function submitArticle() {
  try {
    if (!imagePreview.value) {
      throw new Error("Select an image for the article.");
    }
    const article = createArticle(draft, demoUser.name, articles.value.length + 1);
    articles.value.unshift(article);
    selectedArticle.value = article;
    Object.assign(draft, { title: "", description: "", category: "", content: "" });
    URL.revokeObjectURL(imagePreview.value);
    imagePreview.value = "";
    imageName.value = "";
    feedback.value = "Article added to this browser session.";
    view.value = "article";
  } catch (error) {
    feedback.value = error instanceof Error ? error.message : "Unable to create this article.";
  }
}

function selectImage(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  if (imagePreview.value) URL.revokeObjectURL(imagePreview.value);
  imagePreview.value = URL.createObjectURL(file);
  imageName.value = file.name;
  feedback.value = "";
}
</script>

<template>
  <section class="sword-demo">
    <header class="sword-nav">
      <button type="button" class="brand" @click="navigate('home')">
        <span aria-hidden="true">S</span>
        <strong>Sword Health</strong>
        <small>News platform</small>
      </button>
      <nav aria-label="Demo account">
        <template v-if="authenticated">
          <button type="button" @click="openProtected('write')">Write</button>
          <button type="button" @click="openProtected('profile')">Profile</button>
          <button type="button" class="avatar-button" @click="openProtected('profile')">
            <span>AM</span>
            <i>{{ demoUser.givenName }}</i>
          </button>
          <button type="button" class="outline-button" @click="logout">Log out</button>
        </template>
        <button v-else type="button" class="primary-button" @click="login">
          Start demo session
        </button>
      </nav>
    </header>

    <p v-if="feedback" class="feedback" aria-live="polite">{{ feedback }}</p>

    <main v-if="view === 'home'">
      <section class="hero">
        <div>
          <p>Movement health · Ideas and practice</p>
          <h2>Clinical insight for a world without pain</h2>
          <span>
            Explore product, care, and technology perspectives from a local,
            deterministic news feed.
          </span>
          <button type="button" @click="openArticle(articles[0])">Read featured story</button>
        </div>
        <div class="hero-art" aria-hidden="true">
          <i></i><i></i><i></i>
          <strong>MOVE</strong>
        </div>
      </section>

      <section class="category-bar">
        <div>
          <p>Explore topics</p>
          <strong>Categories</strong>
        </div>
        <button
          v-for="category in categories"
          :key="category"
          type="button"
          :class="{ selected: selectedCategories.includes(category) }"
          :aria-pressed="selectedCategories.includes(category)"
          @click="toggleCategory(category)"
        >
          {{ category }}
        </button>
      </section>

      <section class="articles-section">
        <header>
          <div>
            <p>Latest thinking</p>
            <h3>News &amp; perspectives</h3>
          </div>
          <span>{{ filtered.length }} articles</span>
        </header>
        <div class="article-grid">
          <article v-for="(article, index) in displayed" :key="article.id">
            <div :class="`article-art article-art--${index % 4}`">
              <span>{{ article.category }}</span>
              <strong>{{ article.id }}</strong>
            </div>
            <div class="article-copy">
              <small>{{ article.category }}</small>
              <h4>{{ article.title }}</h4>
              <p>{{ article.description }}</p>
              <button type="button" @click="openArticle(article)">Read more →</button>
            </div>
          </article>
        </div>
        <button
          v-if="canLoadMore"
          type="button"
          class="load-more"
          @click="visibleLimit += 2"
        >
          Load more articles
        </button>
        <p v-if="filtered.length === 0" class="empty">No articles match these categories.</p>
      </section>
    </main>

    <main v-else-if="view === 'article' && selectedArticle" class="article-view">
      <button type="button" class="back-button" @click="navigate('home')">← Back to news</button>
      <div class="article-hero">
        <span>{{ selectedArticle.category }}</span>
        <h2>{{ selectedArticle.title }}</h2>
        <p>{{ selectedArticle.description }}</p>
      </div>
      <article>
        <div class="author">
          <span>{{ selectedArticle.author.split(' ').map((part) => part[0]).join('') }}</span>
          <div><strong>{{ selectedArticle.author }}</strong><small>Contributing author</small></div>
        </div>
        <p>{{ selectedArticle.content }}</p>
        <p>
          Meaningful health experiences combine good evidence with clear communication.
          This maintained demo keeps the original article navigation entirely local.
        </p>
      </article>
    </main>

    <main v-else-if="view === 'profile'" class="profile-view">
      <button type="button" class="back-button" @click="navigate('home')">← Back to news</button>
      <section>
        <span class="profile-avatar">AM</span>
        <p>Local demo profile</p>
        <h2>{{ demoUser.name }}</h2>
        <a :href="`mailto:${demoUser.email}`">{{ demoUser.email }}</a>
        <small>{{ demoUser.role }} · No external Auth0 request</small>
      </section>
    </main>

    <main v-else class="write-view">
      <button type="button" class="back-button" @click="navigate('home')">← Back to news</button>
      <section>
        <header><p>Author workspace</p><h2>Write a new article</h2></header>
        <form @submit.prevent="submitArticle">
          <label>Title<input v-model="draft.title" placeholder="Article title" /></label>
          <label>
            Small description
            <textarea v-model="draft.description" rows="3" placeholder="A short summary"></textarea>
          </label>
          <label>
            Pick one image
            <input type="file" accept="image/*" @change="selectImage" />
            <small v-if="imageName">{{ imageName }} · local preview only</small>
          </label>
          <figure v-if="imagePreview" class="article-image-preview">
            <img :src="imagePreview" alt="Selected article preview" />
          </figure>
          <label>
            Category
            <select v-model="draft.category">
              <option value="">Select a category</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </label>
          <label>
            Content
            <textarea v-model="draft.content" rows="6" placeholder="Write your article"></textarea>
          </label>
          <button type="submit" class="primary-button">Publish to demo session</button>
        </form>
      </section>
    </main>

    <footer><strong>Sword Health</strong><span>Safe local portfolio adaptation</span></footer>
  </section>
</template>

<style scoped>
.sword-demo {
  --blue: #3156d9;
  --navy: #16204a;
  --cyan: #8ee8ef;
  --ink: #171b2c;
  --muted: #697184;
  width: 100%;
  overflow: hidden;
  border: 1px solid #e4e7ef;
  border-radius: 1.25rem;
  color: var(--ink);
  background: #fafbfe;
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
}

button { font: inherit; }
.sword-nav, .sword-nav nav, .brand, .category-bar, .articles-section > header,
.author, footer { display: flex; align-items: center; }
.sword-nav {
  justify-content: space-between; gap: 1rem; padding: .85rem clamp(1rem, 4vw, 2rem);
  border-bottom: 1px solid #e8eaf0; background: white;
}
.brand { gap: .55rem; padding: 0; border: 0; color: var(--navy); background: transparent; cursor: pointer; }
.brand > span {
  display: grid; place-items: center; width: 2rem; height: 2rem; border-radius: .55rem;
  color: white; background: linear-gradient(145deg, var(--blue), #52b9dd); font-weight: 900;
}
.brand strong { font-size: .82rem; }.brand small { padding-left: .55rem; border-left: 1px solid #ddd; color: var(--muted); }
.sword-nav nav { justify-content: flex-end; gap: .45rem; }
.sword-nav nav button, .back-button {
  padding: .55rem .7rem; border: 0; color: var(--navy); background: transparent;
  font-size: .7rem; font-weight: 800; cursor: pointer;
}
.primary-button, .sword-nav nav .primary-button {
  padding: .65rem .9rem; border: 0; border-radius: .45rem; color: white;
  background: var(--blue); font-weight: 800; cursor: pointer;
}
.avatar-button span {
  display: grid; place-items: center; width: 1.8rem; height: 1.8rem; border-radius: 50%;
  color: white; background: var(--navy); font-size: .62rem;
}
.avatar-button { display: flex; align-items: center; gap: .4rem; }.avatar-button i { font-style: normal; }
.outline-button { border: 1px solid #dfe3ee !important; border-radius: .4rem; }
.feedback { margin: 0; padding: .65rem 2rem; color: #18573e; background: #e8fbf2; font-size: .7rem; font-weight: 800; }
.hero {
  display: grid; grid-template-columns: 1.15fr .85fr; gap: 1rem; align-items: center;
  min-height: 24rem; padding: clamp(2rem, 6vw, 4rem); color: white;
  background: linear-gradient(135deg, #10183d, #244a9a);
}
.hero p, .articles-section header p, .write-view header p {
  margin: 0 0 .45rem; color: var(--cyan); font-size: .68rem; font-weight: 900;
  letter-spacing: .12em; text-transform: uppercase;
}
.articles-section header p { color: #2452a6; }
.hero h2 { max-width: 15ch; margin: 0; font-size: clamp(2rem, 5vw, 3.7rem); line-height: .98; }
.hero div > span { display: block; max-width: 55ch; margin-top: 1rem; color: #d9e5ff; font-size: .85rem; line-height: 1.6; }
.hero button { margin-top: 1.3rem; padding: .7rem 1rem; border: 0; border-radius: .45rem; color: var(--navy); background: var(--cyan); font-weight: 900; cursor: pointer; }
.hero-art {
  position: relative; display: grid; place-items: center; aspect-ratio: 1; overflow: hidden;
  border-radius: 50%; background: linear-gradient(145deg, var(--cyan), #5978ee);
}
.hero-art i { position: absolute; width: 65%; height: 18%; border: 2px solid rgba(255,255,255,.55); border-radius: 999px; transform: rotate(-25deg); }
.hero-art i:nth-child(2) { transform: rotate(35deg); }.hero-art i:nth-child(3) { transform: rotate(90deg); }
.hero-art strong { z-index: 1; font-size: clamp(1.5rem, 5vw, 3rem); letter-spacing: .2em; }
.category-bar { flex-wrap: wrap; gap: .5rem; padding: 1rem clamp(1rem, 4vw, 2rem); background: white; }
.category-bar > div { margin-right: auto; }.category-bar p, .category-bar strong { display: block; margin: 0; }
.category-bar p { color: var(--muted); font-size: .62rem; }.category-bar strong { font-size: .85rem; }
.category-bar button {
  padding: .5rem .7rem; border: 1px solid #dce1ed; border-radius: 999px;
  color: var(--blue); background: white; font-size: .68rem; font-weight: 800; cursor: pointer;
}
.category-bar button.selected { color: white; border-color: var(--blue); background: var(--blue); }
.articles-section { padding: clamp(1.5rem, 4vw, 2.5rem); }
.articles-section > header { justify-content: space-between; margin-bottom: 1rem; }
.articles-section header h3 { margin: 0; font-size: 1.5rem; }.articles-section header > span { color: var(--muted); font-size: .7rem; }
.article-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
.article-grid article { display: grid; grid-template-columns: .8fr 1.2fr; overflow: hidden; border: 1px solid #e3e7f0; border-radius: .75rem; background: white; }
.article-art { position: relative; display: grid; place-items: center; min-height: 14rem; color: white; background: linear-gradient(145deg,#3156d9,#8ee8ef); }
.article-art--1 { background: linear-gradient(145deg,#442887,#ed79a4); }.article-art--2 { background: linear-gradient(145deg,#0c665e,#8ee8c0); }.article-art--3 { background: linear-gradient(145deg,#bd5a27,#f4c56a); }
.article-art span { position: absolute; top: .8rem; left: .8rem; font-size: .58rem; font-weight: 900; text-transform: uppercase; }
.article-art strong { font-size: 2.2rem; opacity: .85; }
.article-copy { padding: 1rem; }.article-copy small { color: var(--blue); font-weight: 900; text-transform: uppercase; }
.article-copy h4 { margin: .45rem 0; line-height: 1.15; }.article-copy p { color: var(--muted); font-size: .72rem; line-height: 1.5; }
.article-copy button { padding: 0; border: 0; color: var(--blue); background: transparent; font-size: .7rem; font-weight: 900; cursor: pointer; }
.load-more { display: block; margin: 1.4rem auto 0; padding: .7rem 1rem; border: 0; border-radius: .45rem; color: white; background: var(--blue); font-weight: 800; cursor: pointer; }
.empty { padding: 2rem; color: var(--muted); text-align: center; }
.article-view, .profile-view, .write-view { min-height: 35rem; padding: clamp(1.5rem, 5vw, 3rem); }
.article-hero { max-width: 50rem; margin: 1rem auto 2rem; padding: 2rem; border-radius: 1rem; color: white; background: linear-gradient(135deg,var(--navy),var(--blue)); }
.article-hero span { color: var(--cyan); font-size: .65rem; font-weight: 900; text-transform: uppercase; }
.article-hero h2 { max-width: 20ch; font-size: clamp(2rem,5vw,3.5rem); line-height: 1; }.article-hero p { color: #dce6ff; line-height: 1.6; }
.article-view > article { max-width: 42rem; margin: auto; }.article-view > article > p { color: #4f5668; line-height: 1.8; }
.author { gap: .7rem; margin-bottom: 1.5rem; }.author > span, .profile-avatar { display: grid; place-items: center; width: 3rem; height: 3rem; border-radius: 50%; color: white; background: var(--blue); font-weight: 900; }
.author div { display: grid; }.author small { color: var(--muted); }
.profile-view section { display: grid; justify-items: center; gap: .45rem; max-width: 30rem; margin: 3rem auto; padding: 3rem; border-radius: 1rem; background: white; box-shadow: 0 18px 50px rgba(22,32,74,.1); }
.profile-view p { color: var(--blue); font-weight: 900; text-transform: uppercase; }.profile-view h2 { margin: .3rem; }.profile-view a { color: var(--blue); }.profile-view small { color: var(--muted); }
.write-view > section { max-width: 38rem; margin: 1rem auto; padding: 1.5rem; border-radius: 1rem; background: white; }
.write-view header h2 { margin: 0 0 1rem; }.write-view form, .write-view label { display: grid; gap: .5rem; }
.write-view form { gap: .9rem; }.write-view label { color: var(--muted); font-size: .7rem; font-weight: 800; }
.write-view input, .write-view textarea, .write-view select { padding: .75rem; border: 1px solid #dfe3ec; border-radius: .45rem; font: inherit; }
.write-view label small { color: var(--blue); font-weight: 700; }
.article-image-preview { margin: 0; overflow: hidden; border-radius: .6rem; background: #eef1f8; }
.article-image-preview img { display: block; width: 100%; max-height: 16rem; object-fit: cover; }
footer { justify-content: space-between; padding: 1rem 2rem; color: #cbd3e9; background: var(--navy); font-size: .68rem; }
@media (max-width: 760px) {
  .brand small, .avatar-button i { display: none; }.hero { grid-template-columns: 1fr; }.hero-art { max-width: 16rem; margin: auto; }
  .article-grid { grid-template-columns: 1fr; }.article-grid article { grid-template-columns: .7fr 1.3fr; }
}
@media (max-width: 500px) {
  .sword-nav { align-items: flex-start; flex-direction: column; }.sword-nav nav { flex-wrap: wrap; justify-content: flex-start; }
  .article-grid article { grid-template-columns: 1fr; }.article-art { min-height: 10rem; }
}
</style>
