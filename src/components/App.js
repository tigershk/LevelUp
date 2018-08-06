import React from "react";

import { Switch, Route, Link } from "react-router-dom";
import HomeRoute from "../routes/HomeRoute";
import SearchContainer from "../containers/SearchContainer";
import NewsContainer from "../containers/NewsContainer";
import Forums from "./Forums";
import Header from "../components/Header";
import TwitchRoute from "../routes/TwitchRoute";
import SearchGamesRoute from "../routes/SearchGamesRoute";
import ForumsRoute from "../routes/ForumsRoute";
import DashboardRoute from "../routes/DashboardRoute";
import NewsRoute from "../routes/NewsRoute";
import TopGamesRoute from "../routes/TopGamesRoute";
import PostsContainer from "../containers/PostsContainer";

import "../../styles/index.scss";

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/homepage" render={() => <HomeRoute />} />
          <Route exact path="/search" render={() => <SearchContainer />} />
          <Route exact path="/news" render={() => <NewsContainer />} />
          <Route exact path="/dashboard" render={() => <DashboardRoute />} />
          <Route path="/forum/:id" component={Forums} />
          <Route path="/search" render={() => <SearchGamesRoute />} />
          <Route path="/dashboard" render={() => <DashboardRoute />} />
          <Route path="/twitch" render={() => <TwitchRoute />} />
          <Route path="/posts/:id" component={PostsContainer} />
          <Route path="/forum" render={() => <ForumsRoute />} />
          <Route path="/news" render={() => <NewsRoute />} />
          <Route path="/the-fort" render={() => <TopGamesRoute />} />
          <Route path="/retroclub" render={() => <RetroRoute />} />
        </Switch>
      </div>
    );
  }
}

export default App;
