import { gql } from '@apollo/client';

export const LIST_EPISODES = gql`
  query ListEpisodes($search: String) {
    listEpisodes(search: $search) {
      id
      title
      series
      seasonNumber
      episodeNumber
    }
  }
`;