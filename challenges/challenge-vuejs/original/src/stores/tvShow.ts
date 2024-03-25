import { defineStore } from 'pinia';

interface TVShow {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  averageRuntime: number;
  premiered: string;
  ended: string;
  officialSite: string | null;
  schedule: {
    time: string;
    days: string[];
  };
  rating: {
    average: number | null;
  };
  weight: number;
  network: {
    id: number;
    name: string;
    country: {
      name: string;
      code: string;
      timezone: string;
    };
    officialSite: string | null;
  };
  webChannel: string | null;
  dvdCountry: string | null;
  externals: {
    tvrage: string | null;
    thetvdb: number;
    imdb: string;
  };
  image: {
    medium: string;
    original: string;
  };
  summary: string;
  updated: number;
  _links: {
    self: {
      href: string;
    };
    previousepisode: {
      href: string;
    };
  };
}

interface Episode {
  id: number;
  url: string;
  name: string;
  season: number;
  number: number;
  type: string;
  airdate: string;
  airtime: string;
  airstamp: string;
  runtime: number;
  rating: {
    average: number | null;
  };
  image: {
    medium: string;
    original: string;
  };
  summary: string;
  _links: {
    self: {
      href: string;
    };
    show: {
      href: string;
    };
  };
}

export const useTVShowStore = defineStore({
  id: 'tvShow',
  state: (): {
    tvShow: TVShow;
    episodes: Episode[];
  } => ({
    tvShow: {} as TVShow,
    episodes: [] as Episode[]
  }),
  actions: {
    async fetchTVShow() {
      const response = await fetch('http://api.tvmaze.com/shows/6771');
      const data = await response.json();
      this.tvShow = data
    },
    async fetchEpisodes() {
      const response = await fetch('http://api.tvmaze.com/shows/6771/episodes');
      const data = await response.json();
      this.episodes = data;
    },
    async fetchTVShowAndEpisodes() {
      await Promise.all([this.fetchTVShow(), this.fetchEpisodes()]);
    }
  }
});
