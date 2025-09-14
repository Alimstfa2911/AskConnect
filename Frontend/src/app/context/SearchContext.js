"use client";
import { createContext, useState, useContext } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [keyword, setKeyword] = useState("");

  return (
    <SearchContext.Provider value={{ results, setResults, keyword, setKeyword }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
