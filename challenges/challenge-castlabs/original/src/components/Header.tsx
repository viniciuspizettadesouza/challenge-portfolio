import React from "react";

interface HeaderProps {
  search: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header: React.FC<HeaderProps> = ({ search, onSearchChange }) => {
  return (
    <div className="mb-4 flex items-center justify-end bg-blue-500 p-4">
      <input
        type="text"
        placeholder="Search episodes..."
        className="w-1/3 border p-2"
        value={search}
        onChange={onSearchChange}
      />
    </div>
  );
};

export default Header;
