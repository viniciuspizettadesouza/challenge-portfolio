import { gql } from "@apollo/client";

export const LIST_EPISODES = gql`
  query ListEpisodes($search: String) {
    listEpisodes(search: $search) {
      id
      series
      title
      description
      seasonNumber
      episodeNumber
      releaseDate
      imdbId
    }
  }
`;

export const GET_EPISODE_BY_ID = gql`
  query GetEpisodeById($episodeId: String!) {
    getEpisodeById(episodeId: $episodeId) {
      id
      title
      series
      description
      seasonNumber
      episodeNumber
      releaseDate
      imdbId
    }
  }
`;

export const CREATE_EPISODE = gql`
  mutation CreateEpisode($episode: EpisodeInput!) {
    createEpisode(episode: $episode) {
      id
      series
      title
      description
      seasonNumber
      episodeNumber
      releaseDate
      imdbId
    }
  }
`;

export const DELETE_EPISODE = gql`
  mutation DeleteEpisode($episodeId: String!) {
    deleteEpisode(episodeId: $episodeId)
  }
`;
