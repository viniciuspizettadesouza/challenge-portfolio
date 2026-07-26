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

export const ON_DELETE_EPISODE_SUBSCRIPTION = gql`
  subscription OnDeleteEpisode {
    onDeleteEpisode
  }
`;

export const ON_UPDATE_EPISODE_SUBSCRIPTION = gql`
  subscription OnUpdateEpisode {
    onUpdateEpisode {
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
