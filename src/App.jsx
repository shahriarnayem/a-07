import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./App.css";

import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import Footer from "./Components/Footer";
import Friends from "./Components/Friends";
import FriendDetail from "./Components/FriendDetail";
import Timeline from "./Components/Timeline";
import Stats from "./Components/Stats";
import NotFound from "./Components/NotFound";

const HomePage = () => {
  return (
    <>
      <Banner />
      <Friends />
    </>
  );
};

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f9fbfd]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "friends", element: <Friends /> },
      { path: "friend/:id", element: <FriendDetail /> },
      { path: "timeline", element: <Timeline /> },
      { path: "stats", element: <Stats /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;