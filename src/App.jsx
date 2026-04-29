import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Banner from './Components/Banner'
import Footer from './Components/Footer'
import Friends from './Components/Friend'
import FriendDetail from './Components/FriendDetail'
import Timeline from './Components/Timeline'
import Stats from './Components/Stats'
import NotFound from './Components/NotFound'

function Home() {
  return (
    <>
      <Banner />
      <Friends />
    </>
  )
}

function App() {
  return (
    <RouterProvider router={createBrowserRouter([
      {
        path: "/",
        element: (
          <>
            <Navbar />
            <main className="min-h-screen">
              <Outlet />
            </main>
            <Footer />
          </>
        ),
        children: [
          { index: true, element: <Home /> },
          { path: "friends", element: <Friends /> },
          { path: "friend/:id", element: <FriendDetail /> },
          { path: "timeline", element: <Timeline /> },
          { path: "stats", element: <Stats /> },
          { path: "*", element: <NotFound /> },
        ]
      }
    ])} 
  />
  );
}

export default App