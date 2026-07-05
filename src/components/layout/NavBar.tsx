import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
  }`;

export function NavBar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-2 gap-y-1 px-4 py-3 sm:px-6">
        <span className="mr-4 text-sm font-semibold text-gray-900 sm:text-base">
          Поиск по базе знаний
        </span>
        <NavLink to="/" end className={linkClass}>
          Документы
        </NavLink>
        <NavLink to="/search" className={linkClass}>
          Поиск
        </NavLink>
        <NavLink to="/ask" className={linkClass}>
          Вопрос-ответ
        </NavLink>
      </nav>
    </header>
  );
}
