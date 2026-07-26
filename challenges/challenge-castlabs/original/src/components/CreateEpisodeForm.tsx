import { useRefetchStore } from "@/store/index";
import { useMutation } from "@apollo/client";
import FormField from "@components/FormField";
import { CREATE_EPISODE } from "@graphql/mutations";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CheckSubscriptions from "./CheckSubscriptions";

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

  const formFields = [
    {
      label: "Series:",
      name: "series",
      type: "text" as const,
    },
    {
      label: "Title:",
      name: "title",
      type: "text" as const,
    },
    {
      label: "Description:",
      name: "description",
      type: "textarea" as const,
    },
    {
      label: "Season Number:",
      name: "seasonNumber",
      type: "number" as const,
    },
    {
      label: "Episode Number:",
      name: "episodeNumber",
      type: "number" as const,
    },
    {
      label: "Release Date:",
      name: "releaseDate",
      type: "date" as const,
    },
    {
      label: "IMDB ID:",
      name: "imdbId",
      type: "text" as const,
    },
  ];

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
        {formFields.map((field) => (
          <FormField
            key={field.name}
            label={field.label}
            name={field.name}
            value={newEpisode[field.name as keyof typeof newEpisode]}
            onChange={handleInputChange}
            type={field.type}
            rows={field.type === "textarea" ? 2 : undefined}
            required
          />
        ))}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Create Episode
        </button>
      </form>

      <CheckSubscriptions />
    </section>
  );
}
