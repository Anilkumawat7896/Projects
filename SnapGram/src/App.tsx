import "./globals.css";
import { Routes, Route } from "react-router-dom";
import SingInForm from "./_auth/forms/SingInForm";
import SingUpForm from "./_auth/forms/SingUpForm";
import AuthLayout from "./_auth/AuthLayout";
import { Home } from "./_root/pages";
import RootLayout from "./_root/RootLayout";
import { Toaster } from "@/components/ui/toaster"
function App() {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes  */}
        <Route element={<AuthLayout />}>
          <Route path="/sing-in" element={<SingInForm />} />
          <Route path="/sing-up" element={<SingUpForm />} />
        </Route>
        {/* Private routes  */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
}

export default App;
