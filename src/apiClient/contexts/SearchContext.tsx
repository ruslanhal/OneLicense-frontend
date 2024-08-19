
import React, { createContext, useState, useContext, ReactNode } from 'react';


interface SearchContextType {
  searchText: string;
  setSearchText: (text: string) => void;
  cartLength:number,
  setCartLength:(item:number)=>void;

  cartListId: string[],
  setCartListId: (items:string[])=>void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [cartLength, setCartLength]=useState<number>(0);
  const [cartListId, setCartListId]=useState<string[]>([]);

  return (
    <SearchContext.Provider value={{ searchText, setSearchText, cartLength, setCartLength, cartListId, setCartListId}}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
