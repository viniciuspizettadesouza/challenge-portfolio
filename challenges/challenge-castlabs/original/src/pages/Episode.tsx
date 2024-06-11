import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EPISODE_BY_ID } from "@graphql/queries";
import { useDebouncedEpisodesSearch } from "@/hooks/useDebouncedEpisodesSearch";
import Header from "@components/Header";
import Loading from "@components/Loading";
import Error from "@components/Error";

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
        {loading && <Loading />}
        {error && <Error />}
        <div className="rounded bg-white p-6 shadow-md">
          <h1 className="mb-4 text-3xl font-bold">{episode.title}</h1>
          <p className="mb-4 text-gray-700">{episode.description}</p>
          <p className="mb-4 font-semibold">Series:</p> {episode.series}
          <p className="mb-4 font-semibold">Season:</p>
          {episode.seasonNumber}
          <p className="mb-4 font-semibold">Episode:</p>
          {episode.episodeNumber}
          <p className="mb-4 font-semibold">Release Date:</p>
          {episode.releaseDate}
          <p className="mb-4 font-semibold">IMDB ID:</p> {episode.imdbId}
        </div>
      </div>
    </div>
  );
}
