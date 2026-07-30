"use client";

import { useContext } from "react";
import CardStrains from "./CardStrains";
import { StrainContext } from "../contexts/strain.context";
import { ContentNode } from "../interfaces/strains.interface";
import Pagination from "./Pagination";

const ListStrains: React.FC = () => {
  const { state, setValue } = useContext(StrainContext);
  let nodes: ContentNode[] = [];

  if (state.strains) {
    console.log("state.strains", state);
    nodes = state.strains.nodes;
  } else {
    nodes = state.contentNodes.nodes;
  }
  console.log("state", state);

  const totalPages = Math.ceil(
    state.contentNodes.extra?.queryAnalyzer.keysCount / 12
  );

  return (
    <section className="w-full bg-zinc-100 px-5 py-10">
      <Pagination totalPages={totalPages} />

      <div className="mx-auto grid w-full max-w-screen-2xl gap-6 gap-y-10 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {nodes.map((strain: ContentNode) => (
          <CardStrains key={strain.id} strain={strain} />
        ))}
      </div>

      <Pagination totalPages={totalPages} />
    </section>
  );
};

export default ListStrains;
