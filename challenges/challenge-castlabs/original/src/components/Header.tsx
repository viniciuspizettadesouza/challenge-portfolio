interface HeaderProps {
  search: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header: React.FC<HeaderProps> = ({ search, onSearchChange }) => {
  return (
    <div className="fixed left-0 right-0 top-0 z-10 bg-blue-500 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl text-white">TV Series Episodes</h1>
        <input
          type="text"
          placeholder="Search episodes..."
          className="w-1/3 border p-2"
          value={search}
          onChange={onSearchChange}
        />
      </div>
    </div>
  );
};

export default Header;
