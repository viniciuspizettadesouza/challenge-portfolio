import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="fixed left-0 right-0 top-0 z-10 bg-blue-500 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to={"/"}>
          <h1 className="text-2xl text-white">TV Series Episodes</h1>
        </Link>
      </div>
    </div>
  );
}
