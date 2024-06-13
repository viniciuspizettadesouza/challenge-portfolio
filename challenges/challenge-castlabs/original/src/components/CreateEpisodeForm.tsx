import { useRefetchStore } from "@/store/index";
import { useMutation } from "@apollo/client";
import { CREATE_EPISODE } from "@graphql/queries";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function CreateEpisodeForm() {
  const [createEpisode] = useMutation(CREATE_EPISODE);
  const setRefetch = useRefetchStore((state) => state.setRefetch);

  const [newEpisode, setNewEpisode] = useState({
    id: uuidv4(),
    series: "",
    title: "",
    description: "",
    seasonNumber: 0,
    episodeNumber: 0,
    releaseDate: "",
    imdbId: "",
  });

  const handleCreateEpisode = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    try {
      await createEpisode({
        variables: {
          episode: newEpisode,
        },
      });

      setNewEpisode({
        id: uuidv4(),
        series: "",
        title: "",
        description: "",
        seasonNumber: 0,
        episodeNumber: 0,
        releaseDate: "",
        imdbId: "",
      });
      setRefetch(true);
    } catch (error) {
      console.error("Error creating episode:", error);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setNewEpisode((prevEpisode) => ({
      ...prevEpisode,
      [name]: value,
    }));
  };

  return (
    <section className="mt-4">
      <h2 className="text-xl font-bold mb-2">Create New Episode:</h2>
      <form onSubmit={handleCreateEpisode}>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600">
            Series:
          </label>
          <input
            type="text"
            name="series"
            value={newEpisode.series}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600">
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={newEpisode.title}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600">
            Description:
          </label>
          <textarea
            name="description"
            value={newEpisode.description}
            onChange={handleInputChange}
            rows={2}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">
              Season Number:
            </label>
            <input
              type="number"
              name="seasonNumber"
              value={newEpisode.seasonNumber}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">
              Episode Number:
            </label>
            <input
              type="number"
              name="episodeNumber"
              value={newEpisode.episodeNumber}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600">
            Release Date:
          </label>
          <input
            type="date"
            name="releaseDate"
            value={newEpisode.releaseDate}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600">
            IMDB ID:
          </label>
          <input
            type="text"
            name="imdbId"
            value={newEpisode.imdbId}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Create Episode
        </button>
      </form>
    </section>
  );
}
