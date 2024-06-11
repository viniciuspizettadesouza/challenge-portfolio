import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EPISODE_BY_ID } from "@graphql/queries";
import Header from "@components/Header";
import { useDebouncedEpisodesSearch } from "@/hooks/useDebouncedEpisodesSearch";

export default function Episode() {
  const { search, handleSearchChange } = useDebouncedEpisodesSearch();
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery(GET_EPISODE_BY_ID, {
    variables: { episodeId: id },
  });

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-lg text-red-500">
        Error loading episode details.
      </p>
    );

  const episode = data?.getEpisodeById;

  return (
    <div className="flex min-h-screen flex-col">
      <Header search={search} onSearchChange={handleSearchChange} />

      <div className="container mx-auto mt-16 p-4">
        <div className="rounded bg-white p-6 shadow-md">
          <h1 className="mb-4 text-3xl font-bold">{episode.title}</h1>
          <p className="mb-4 text-gray-700">{episode.description}</p>
          <div className="mb-4">
            <span className="font-semibold">Series:</span> {episode.series}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Season:</span>{" "}
            {episode.seasonNumber}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Episode:</span>{" "}
            {episode.episodeNumber}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Release Date:</span>{" "}
            {episode.releaseDate}
          </div>
          <div className="mb-4">
            <span className="font-semibold">IMDB ID:</span> {episode.imdbId}
          </div>
        </div>
      </div>
    </div>
  );
}
