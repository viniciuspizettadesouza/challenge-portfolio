import { useState, useCallback, ReactNode } from "react";
import { useQuery } from "@apollo/client";
import { LIST_EPISODES } from "@graphql/queries";
import { Episodes, SearchEpisode } from "../interfaces";
import debounce from "lodash.debounce";
import Header from "@components/Header";

interface MainLayoutProps {
  children: (props: {
    data: Episodes | undefined;
    loading: boolean;
    error: any;
  }) => ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
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

  return (
    <div className="flex min-h-screen flex-col">
      <Header search={search} onSearchChange={handleSearchChange} />
      <div className="container mx-auto mt-16 flex-grow overflow-auto p-4">
        {children({ data, loading, error })}
      </div>
    </div>
  );
};

export default MainLayout;
