import { Link } from "react-router-dom";
import Header from "@components/Header";
import { useDebouncedEpisodesSearch } from "@/hooks/useDebouncedEpisodesSearch";
import { Episode } from "@/interfaces";

export default function Home() {
  const { search, loading, error, data, handleSearchChange } =
    useDebouncedEpisodesSearch();

  return (
    <div className="flex min-h-screen flex-col">
      <Header search={search} onSearchChange={handleSearchChange} />

      <div className="container mx-auto mt-16 flex-grow overflow-auto p-4">
        {loading && <p>Loading...</p>}
        {error && <p>Error loading episodes.</p>}
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
      </div>
    </div>
  );
}
