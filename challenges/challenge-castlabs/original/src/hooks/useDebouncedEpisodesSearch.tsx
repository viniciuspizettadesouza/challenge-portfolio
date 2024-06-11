import { useState, useCallback } from "react";
import { useQuery } from "@apollo/client";
import { LIST_EPISODES } from "@graphql/queries";
import debounce from "lodash.debounce";
import { Episodes, SearchEpisode } from "@/interfaces";

export function useDebouncedEpisodesSearch() {
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
    [refetch],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  return { search, loading, error, data, handleSearchChange };
}
