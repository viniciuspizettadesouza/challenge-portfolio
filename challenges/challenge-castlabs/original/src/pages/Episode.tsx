import { useDebouncedEpisodesSearch } from "@/hooks/useDebouncedEpisodesSearch";
import { useEpisodeById } from "@/hooks/useEpisodeById";
import useOMDBMovie from "@/hooks/useOMDBMovie";
import EpisodeFooterButtons from "@components/EpisodeFooterButtons";
import Error from "@components/Error";
import Header from "@components/Header";
import Loading from "@components/Loading";
import { useParams } from "react-router-dom";

export default function Episode() {
  const { id } = useParams<{ id: string }>();
  const { search, handleSearchChange } = useDebouncedEpisodesSearch();
  const {
    episode,
    loading: episodeLoading,
    error: episodeError,
  } = useEpisodeById(id);

  const { movie } = useOMDBMovie(episode?.imdbId);

  if (episodeLoading) return <Loading />;
  if (episodeError) return <Error />;

  return (
    <div className="flex min-h-screen flex-col">
      <Header search={search} onSearchChange={handleSearchChange} />

      <main className="container mx-auto mt-16 flex-grow">
        <article className="p-4">
          {episode && (
            <section className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-3xl font-bold mb-4">{episode.title}</h1>
              <p className="text-gray-700 mb-4">{episode.description}</p>
              {movie?.Poster && (
                <figure className="mb-4">
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                  <figcaption className="mt-2 text-sm text-gray-500">
                    Poster: {movie.Title}
                  </figcaption>
                </figure>
              )}
              <dl className="mb-4">
                <dt className="font-semibold">Series:</dt>
                <dd>{episode.series}</dd>
                <dt className="font-semibold">Season:</dt>
                <dd>{episode.seasonNumber}</dd>
                <dt className="font-semibold">Episode:</dt>
                <dd>{episode.episodeNumber}</dd>
                <dt className="font-semibold">Release Date:</dt>
                <dd>{episode.releaseDate}</dd>
                <dt className="font-semibold">IMDB ID:</dt>
                <dd>{episode.imdbId}</dd>
              </dl>

              <EpisodeFooterButtons id={id} />
            </section>
          )}
        </article>
      </main>
    </div>
  );
}
