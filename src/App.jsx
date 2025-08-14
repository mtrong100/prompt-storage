import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AuthRoute from "./components/AuthRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignIn from "./pages/Auth/SignIn";
import NotFound from "./pages/NotFound";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-900">
          <Navbar />
          <div className="container p-5 mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route
                path="/create"
                element={
                  <AuthRoute>
                    <CreatePost />
                  </AuthRoute>
                }
              />
              <Route
                path="/edit/:id"
                element={
                  <AuthRoute>
                    <EditPost />
                  </AuthRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>

        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#1f2937",
              color: "#f3f4f6",
              border: "1px solid #374151",
            },
          }}
        />
      </AuthProvider>
    </Router>
  );
}

export default App;
