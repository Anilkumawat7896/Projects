import "./globals.css";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes  */}
        <Route path="/sing-in" element={<SinginForm />} />
        {/* Private routes  */}
        <Route index element={<Home />} />
      </Routes>
    </main>
  );
}

export default App;
