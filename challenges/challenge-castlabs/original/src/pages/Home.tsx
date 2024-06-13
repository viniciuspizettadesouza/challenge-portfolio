import { useDebouncedEpisodesSearch } from "@/hooks/useDebouncedEpisodesSearch";
import { Episode } from "@/interfaces";
import Error from "@components/Error";
import Header from "@components/Header";
import Loading from "@components/Loading";
import { Link } from "react-router-dom";

export default function Home() {
  const { search, loading, error, data, handleSearchChange } =
    useDebouncedEpisodesSearch();

  return (
    <div className="flex min-h-screen flex-col">
      <Header search={search} onSearchChange={handleSearchChange} />

      <main className="container mx-auto mt-16 flex-grow overflow-auto p-4">
        {loading && <Loading />}
        {error && <Error />}
        <ul>
          {data?.listEpisodes?.map((episode: Episode) => (
            <li key={episode.id} className="border-b p-2">
              <Link to={`/episode/${episode.id}`}>
                {episode.title} (Season {episode.seasonNumber}, Episode{" "}
                {episode.episodeNumber})
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
