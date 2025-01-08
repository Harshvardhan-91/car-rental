import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Models from "./Pages/Models";
import Testimonials from "./Pages/Testimonials";
import Navbar from "./components/Navbar/Navbar";
import Team from "./Pages/Team";
import Contact from "./Pages/Contact";
import Errorpage from "./Pages/Errorpage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import LearnMore from "./Pages/LearnMore";
import Booking from "./components/Booking/Booking";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Loading from "./components/Loading/Loading"; // Importing the Loading component

function App() {
  const [loading, setLoading] = useState(false); // State to manage loading globally

  return (
    <BrowserRouter>
      <Navbar />
      {loading && <Loading />} {/* Conditionally render Loading component */}
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/models" element={<Models />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login setLoading={setLoading} />} /> {/* Pass setLoading as prop */}
        <Route path="/register" element={<Register setLoading={setLoading} />} /> {/* Pass setLoading as prop */}
        <Route path="/learnmore" element={<LearnMore />} />
        <Route path="*" element={<Errorpage />} />

        <Route
          path="/booking"
          element={
            <ProtectedRoute setLoading={setLoading}> {/* Pass setLoading as prop */}
              <Booking setLoading={setLoading} /> {/* Pass setLoading as prop */}
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
