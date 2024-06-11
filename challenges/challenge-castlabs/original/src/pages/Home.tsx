import { Link } from "react-router-dom";
import MainLayout from "@layouts/MainLayout";
import { Episode } from "@/interfaces";

function App() {
  return (
    <MainLayout>
      {({ data, loading, error }) => (
        <>
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
        </>
      )}
    </MainLayout>
  );
}

export default App;
