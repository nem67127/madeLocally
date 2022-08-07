import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import HomePage from "./components/Homepage";
import SignIn from "./components/SignIn";
import Events from "./components/Events";
import EventDetails from "./components/EventDetails";
import ProfileForm from "./components/ProfileForm";
import Profile from "./components/Profile";
import GlobalStyles from "./GlobalStyles";
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Auth0ProviderWithHistory>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/events" element={<Events />} />
            <Route path="/event/:eventId" element={<EventDetails />} />
            <Route path="/profile-f/:profileId" element={<ProfileForm />} />
            <Route path="/profile/:profileId" element={<Profile />} />
          </Routes>
        </Auth0ProviderWithHistory>
      </Router>
    </>
  );
};

export default App;
