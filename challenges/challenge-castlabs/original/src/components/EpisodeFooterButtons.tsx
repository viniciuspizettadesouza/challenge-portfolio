import { useMutation } from "@apollo/client";
import { DELETE_EPISODE } from "@graphql/mutations";
import { Link, useNavigate } from "react-router-dom";

interface EpisodeFooterButtonsProps {
  id?: string;
}

export default function EpisodeFooterButtons({
  id,
}: EpisodeFooterButtonsProps) {
  const navigate = useNavigate();
  const [deleteEpisode] = useMutation(DELETE_EPISODE);

  const handleDeleteEpisode = () => {
    deleteEpisode({
      variables: {
        episodeId: id,
      },
    })
      .then(() => {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((error) => {
        console.error("Error deleting episode:", error);
      });
  };

  return (
    <section className="mt-4 flex flex-col items-end">
      <Link
        to={`/createEpisode`}
        className="bg-blue-500 mb-2 w-1/2 hover:bg-blue-600 text-center text-white font-semibold py-2 px-4 rounded-md"
      >
        Create Episode
      </Link>
      <button
        onClick={handleDeleteEpisode}
        className="bg-red-500 w-1/2 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
      >
        Delete Episode
      </button>
    </section>
  );
}
