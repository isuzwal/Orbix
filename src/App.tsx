import { Routes, Route } from "react-router";
import Screen from "./dashbord-layout/layout";
import Home from "./pages/home-view";
import LoginPage from "./auth/login-view";
import SignupPage from "./auth/signup.view";
import DashbordPage from "./pages/dashbord-view";
import AppLayout from "./dashbord-layout/dashbord-view-layout";
import YoutubePage from "./pages/dashbord-pages/youtbue-view";
import Twitterpage from "./pages/dashbord-pages/twitter-view";
import SoptifyPage from "./pages/dashbord-pages/spotify-view";
import Page from "./pages/hash-page/share-page"

import Notesview from "./pages/dashbord-pages/notes-view";
import Imagesview from "./pages/dashbord-pages/images-view";
import BlogPage from "./pages/dashbord-pages/blogs-view";
function App() {

  return (
    <Routes>
      <Route path="/" element={<Screen />} />
      <Route index element={<Home />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      {/*Dashbord after login*/}
      <Route path="/dashbord" element={<AppLayout />}>
        <Route index element={<DashbordPage />} />
       
        <Route path="/dashbord/blogs" element={<BlogPage />} />
        <Route path="/dashbord/twitter" element={<Twitterpage />} />
        <Route path="/dashbord/youtube" element={<YoutubePage />} />
        <Route path="/dashbord/soptify" element={<SoptifyPage />} />
        <Route path="/dashbord/notes" element={<Notesview />} />
        <Route path="/dashbord/images" element={<Imagesview />} />
      </Route>
        <Route path="/share-content/:shareLink" element={<Page />} />
    </Routes>
  );
}

export default App;
