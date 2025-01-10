import React, { useState, useRef } from "react";
import { useIsShown } from "@/lib/hooks/useIsShown";
import Dropdown from "../../UI-components/Dropdown";
import { capitaliseString } from "@/app/utils/formatHelpers";
import { queriesAPI } from "./CoinsTable";

export const TableTitle = ({
  value,
  handleSortChange,
}: {
  value: string;
  handleSortChange: any;
}) => {
  const [show, handleIsShown] = useIsShown();
  const [selectedQuery, setSelectedQuery] = useState<string>(value);
  const listRef = useRef(null);
  const filteredQueries = queriesAPI.filter((q:string) => q !== value);
  const handleQueryChange = (v: string) => {
    setSelectedQuery(v);
    handleSortChange(v);
    handleIsShown();
  };

  return (
    <div className="relative flex items-center gap-4 text-2xl">
      TOP 50 <span className="text-lg">BY </span>
      <div className="hover:cursor-pointer" onClick={handleIsShown}>{capitaliseString(selectedQuery)}</div>
      <Dropdown ref={listRef} show={show} feature="table dropdown">
        {show &&
          filteredQueries.map((q: string) => (
            <li key={q} onClick={()=> handleQueryChange(q)} className="text-base hover:text-common-cyan hover:cursor-pointer">{capitaliseString(q)}</li>
          ))}
      </Dropdown>
    </div>
  );
};
