import { useDebouncedEpisodesSearch } from "@/hooks/useDebouncedEpisodesSearch";
import { Episode } from "@/interfaces";
import { useRefetchStore } from "@/store/index";
import Error from "@components/Error";
import HeaderWithSearch from "@components/HeaderWithSearch";
import Loading from "@components/Loading";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const {
    search,
    loading,
    error,
    data,
    handleSearchChange,
    refetch: refetchEpisodeById,
  } = useDebouncedEpisodesSearch();

  const { refetch, setRefetch } = useRefetchStore();

  useEffect(() => {
    if (refetch) {
      refetchEpisodeById();
      setRefetch(false);
    }
  }, [refetch, refetchEpisodeById, setRefetch]);

  return (
    <div className="flex min-h-screen flex-col">
      <HeaderWithSearch search={search} onSearchChange={handleSearchChange} />

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
