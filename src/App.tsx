import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/layout/NavBar";
import { DocumentsPage } from "./pages/DocumentsPage";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <Routes>
          <Route path="/" element={<DocumentsPage />} />
        </Routes>
      </main>
    </div>
  );
}
