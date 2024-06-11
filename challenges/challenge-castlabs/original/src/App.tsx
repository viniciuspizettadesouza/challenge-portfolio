import { useState, useCallback } from "react";
import { useQuery } from "@apollo/client";
import { LIST_EPISODES } from "./graphql/queries";
import { Episode, Episodes, SearchEpisode } from "./interfaces";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";

function App() {
  const [search, setSearch] = useState("");
  const { data, loading, error, refetch } = useQuery<Episodes, SearchEpisode>(
    LIST_EPISODES,
    {
      variables: { search },
    },
  );

  const debouncedSearch = useCallback(
    debounce((value) => {
      refetch({ search: value });
    }, 250),
    [],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        placeholder="Search episodes..."
        className="border p-2 w-full mb-4"
        value={search}
        onChange={handleSearchChange}
      />
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
  );
}

export default App;
