import { gql } from "@apollo/client";

export const ON_CREATE_EPISODE_SUBSCRIPTION = gql`
  subscription OnCreateEpisode {
    onCreateEpisode {
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
