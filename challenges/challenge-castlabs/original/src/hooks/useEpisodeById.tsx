import { useQuery } from "@apollo/client";
import { GET_EPISODE_BY_ID } from "@graphql/queries";

export function useEpisodeById(id: string | undefined) {
  const { data, loading, error } = useQuery(GET_EPISODE_BY_ID, {
    variables: { episodeId: id },
    skip: !id,
  });

  return { loading, error, episode: data?.getEpisodeById };
}
