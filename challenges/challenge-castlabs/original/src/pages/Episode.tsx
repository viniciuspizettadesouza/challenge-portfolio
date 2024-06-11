import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EPISODE_BY_ID } from "../graphql/queries";

export default function Episode() {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery(GET_EPISODE_BY_ID, {
    variables: { episodeId: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading episode details.</p>;

  const episode = data?.getEpisodeById;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{episode.title}</h1>
      <p>{episode.description}</p>
      <p>Series: {episode.series}</p>
      <p>Season: {episode.seasonNumber}</p>
      <p>Episode: {episode.episodeNumber}</p>
      <p>Release Date: {episode.releaseDate}</p>
      <p>IMDB ID: {episode.imdbId}</p>
    </div>
  );
}
