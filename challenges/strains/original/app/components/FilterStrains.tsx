"use client";

import { StrainContext } from "../contexts/strain.context";
import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { getClient } from "../lib/getClient";
import { buttons, SearchStrainByString } from "@/app/lib/constants";
import FilterByInitial from "./FilterByInitial";

const FilterStrains = () => {
  const { state, setValue } = useContext(StrainContext);
  const [strainType, setStrainType] = useState("");

  const client = getClient();
  const { loading, error, data } = useQuery(SearchStrainByString, {
    fetchPolicy: "no-cache",
    variables: {
      languageCode: "DEFAULT",
      search: "",
      after: null,
      limit: 12,
      titleStartsWith: "",
    },
    client,
    onCompleted: (data) => {
      setValue(data);
    },
  });

  const handleOptionChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log("handleOptionChange", (event.target as HTMLInputElement).value);
    setStrainType((event.target as HTMLInputElement).value);
  };

  return (
    <section className="mx-auto mb-10 grid w-full max-w-screen-2xl gap-y-10 px-5">
      <FilterByInitial />

      <div className="flex">
        <div className="flex w-1/2 gap-2">
          {buttons.map((button, index) => (
            <label key={index}>
              <input
                type="radio"
                value={button}
                checked={button === strainType}
                onChange={handleOptionChange}
                className="absolute opacity-0"
              />
              <div
                className={`inline-flex items-center justify-center gap-2.5 rounded-lg border border-violet-300 bg-violet-300 px-6 py-2.5 hover:bg-violet-400 hover:text-white ${
                  button === strainType ? "bg-violet-300" : "bg-white"
                }`}
              >
                <span className="text-xs leading-relaxed">{button}</span>
              </div>
            </label>
          ))}
        </div>
        <div className="flex w-1/2 justify-end">
          <button
            className="text-xs leading-relaxed text-neutral-950 underline"
            value="0"
            onClick={handleOptionChange}
          >
            <span>Clear on selection</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FilterStrains;
