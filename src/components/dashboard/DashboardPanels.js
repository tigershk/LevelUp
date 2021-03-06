import React from "react";
import { Link } from "react-router-dom";

let level=0;

class DashboardPanels extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      userStats: "",
      gamer_info: "",
      fortniteUserData: {},
      userPosts: [],
      posts: [],
      replies: [],
      level: 0
    };
    this.gamerRank = this.gamerRank.bind(this);
    this.fetchUserInfo = this.fetchUserInfo.bind(this);
    this.fetchUserPosts = this.fetchUserPosts.bind(this);
    this.searchGame = this.searchGame.bind(this);
    this.searchTwitch = this.searchTwitch.bind(this);
    this.gamerLevel = this.gamerLevel.bind(this)
  }

  componentDidMount() {
    const userData = initialUser;
    this.setState({
      user: userData
    });

    if (userData) {
      this.props.setAuthState(userData);
    }

    

    // Fetch Twitch favourites if not in redux.state
    if (userData && this.props.fetchTwitchFavourite) {
      if (this.props.twitchFavourite.length === 0) {
        this.props.fetchTwitchFavourite(userData.userId);
      }
    }

    // Fetch user info
    this.fetchUserInfo(userData);
    this.fetchUserPosts(userData);

    // fetch user posts
    fetch(`/api/gamer/post/${userData.userId}`)
      .then(response => response.json())
      .then(json => {
        this.setState({ posts: json.posts, replies: json.replies });
      });

    // Games Info
    if (userData && this.props.fetchGameFavourite) {
      this.props.fetchGameFavourite(userData.userId);
    }

    // Fetch user data && Fortnite data
    let tempData;
    this.props
      .fetchGamerInfo(userData.userId)
      .then(data1 => fetch(`/api/fortnite/${data1.profile.fortnitename}`))
      .then(response => response.json())
      .then(data2 => {
        if (data2.username != "NulL") {
          this.setState({
            fortniteUserData: data2
          });
        }
      });
    // }

    // Fetch user info
    this.fetchUserInfo(userData);
    this.fetchUserPosts(userData);

    // fetch user posts
    fetch(`/api/gamer/post/${userData.userId}`)
      .then(response => response.json())
      .then(json => {
        this.setState({ posts: json.posts, replies: json.replies });
      });

    // Games Info
    if (userData && this.props.fetchGameFavourite) {
      this.props.fetchGameFavourite(userData.userId);
    }

    console.log("user data", userData)

  }

  gamerRank() {
    const g_level = this.state.userStats.totalposts;
    console.log(this.state.userStats.totalposts);

    if (g_level < 10) {
      return "Noob";
    } else if (g_level < 20) {
      return "Challenger";
    } else if (g_level < 30) {
      return "Champion";
    } else {
      return "Legend";
    }
  }
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps) {
  //     // Gamer rank
  //     const level = this.state.userStats.gamer_level;
  //     this.gamerRank(level);
  //   }
  // }

  fetchUserInfo(userData) {
    fetch(`/api/profile/${userData.username}`)
      .then(response => response.json())
      .then(json => {
        this.setState({ userStats: json });
        console.log("fetchhh")
      });
  }

  fetchUserPosts(userData) {
    fetch(`/api/userposts/${userData.userId}`)
      .then(response => response.json())
      .then(json => {
        this.setState({ userPosts: json.slice(0, 5) });
      });
  }

  searchGame(event, title) {
    this.props.searchClickedGame(title);
    this.props.searchClickedGame(title);
  }


  gamerLevel(totalposts) {

    let level = parseInt(totalposts / 5);
    if (level > 100)
      level = 100
    this.setState({ level })
    console.log("totalposts", totalposts)
  }

  searchTwitch(event, title) {
    this.props.setTwitchStreamer(title);
  }



  render() {
    const { twitchFavourite, gameFavourite, userDataStore } = this.props;
    const { userStats, userPosts } = this.state;
    // console.log("fort", this.state.fortniteUserData);
    level = parseInt(userStats.totalposts / 5);
    if (level > 100)
      level = 100

    return (
      <div className="dashboard__panels">
        {/* Level */}
        <div className="dashboard__panels--item">
          <h3 className="dashboard__panels--heading">Level</h3>
          <div className="dashboard__panels--points">
            {level}
          </div>
          <p className="dashboard__panels--text dashboard__panels--text--large">
            Your LevelUp rank is{" "}
            <strong className="rank__level">{this.gamerRank()}</strong>
          </p>
          <p className="dashboard__panels--text">
            This shows your overall rank related with the games you play and
            your levelUp points.
              </p>
        </div>

        {/* Total posts */}
        <div className="dashboard__panels--item">
          <h3 className="dashboard__panels--heading">Total Posts</h3>
          <div className="dashboard__panels--points">
            {userStats.totalposts}
          </div>
          <p className="dashboard__panels--text">
            This shows the total amount of post in all forums.
          </p>
                </div>

                {/* Last posts */}
                <div className="dashboard__panels--item">
                    <h3 className="dashboard__panels--heading">Last 5 posts</h3>
                    <div className="dashboard__panels--latest-post">
                        <ul className="dashboard__panels--latest-posts-list">
                            {
                                userPosts.length > 0
                                    ? userPosts.map(post => {
                                        return (
                                            <li className="dashboard__panels--latest-posts-item" key={post.id}>
                                                <Link to={"/posts/" + post.id}>
                                                
                                                    <div>{post.body.substring(0,25)}</div>
                                                    
                                                </Link>
                                            </li>
                                        )
                                    })
                                    : ""
                            }
                        </ul>
                    </div>
                    <p className="dashboard__panels--text">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis.</p>
                </div>
                {/* <div className="dashboard__panels--item">
                    <div className="dashboard__fortnite">
                        <h3 className="dashboard__panels--heading">Fortnite Stats</h3>
                        {this.state.fortniteUserData.totals ?
                            <div className="dashboard__panels--points">

                                <h5 className="dashboard__panels--fortnite-user">{this.state.fortniteUserData.username}</h5>
                                <h5 className="dashboard__panels--fortnite-platform">{this.state.fortniteUserData.platform.toUpperCase()}</h5>
                                <h5 className="dashboard__panels--fortnite-platform">{this.state.fortniteUserData.totals.wins > 50 ? "Level: FORTIFIED" : "Level: Bricklayer"}</h5>




                                <p className="dashboard__panels--fortnite-para">Total Wins: {this.state.fortniteUserData.totals.wins}</p>
                                <p className="dashboard__panels--fortnite-para">Total Kills: {this.state.fortniteUserData.totals.kills}</p>
                                <p className="dashboard__panels--fortnite-para">Score: {this.state.fortniteUserData.totals.score}</p>
                            </div> :
                            null}
                    </div>
                </div> */}

        {/* Twitch Favs */}
        <div className="dashboard__panels--item">
          <h3 className="dashboard__panels--heading">
            Twitch Favourites Players
          </h3>
          <ul className="dashboard__panels--twitch-list">
            {twitchFavourite.map(fav => {
              return (
                <li key={fav.twitch_name}>
                  <Link to="/twitch">
                    <img
                      src={fav.twitch_image}
                      className="dashboard__panels--twitch-list--img"
                      onClick={event =>
                        this.searchTwitch(event, fav.twitch_name)
                      }
                    />
                  </Link>
                  {fav.twitch_name}{" "}
                </li>
              );
            })}
          </ul>
          <p className="dashboard__panels--text">
            Twitch users added to Favourites will show up here.
          </p>
        </div>

        {/* Fav games */}
        <div className="dashboard__panels--item">
          <h3 className="dashboard__panels--heading">Favourite Games</h3>
          <ol className="dashboard__panels--twitch-list">
            {gameFavourite.map(fav => {
              return (
                <li
                  onClick={event => this.searchGame(event, fav.title)}
                  key={fav.title}
                >
                  {" "}
                  <Link to="/search"> {fav.title} </Link>{" "}
                </li>
              );
            })}
          </ol>
          <p className="dashboard__panels--text">
            Games added to Favourites will show up here.
          </p>
        </div>


        <div className="dashboard__panels--item">
          <div>
            <h3 className="dashboard__panels--heading">Fortnite</h3>
            {this.state.fortniteUserData.totals ? (
              <div className="dashboard__fortnite">
                <h5 className="dashboard__panels--fortnite-user">
                  {this.state.fortniteUserData.username}
                </h5>
                <h5 className="dashboard__panels--fortnite-platform">
                  {this.state.fortniteUserData.platform.toUpperCase()}
                </h5>
                <h5 className="dashboard__panels--fortnite-platform">
                  {this.state.fortniteUserData.totals.wins > 50
                    ? "Level: FORTIFIED"
                    : "Level: Bricklayer"}
                </h5>

                <p className="dashboard__panels--fortnite-para">
                  Total Wins: {this.state.fortniteUserData.totals.wins}
                </p>
                <p className="dashboard__panels--fortnite-para">
                  Total Kills: {this.state.fortniteUserData.totals.kills}
                </p>
                <p className="dashboard__panels--fortnite-para">
                  Score: {this.state.fortniteUserData.totals.score}
                </p>
              </div>
            ) : (
                <h5 className="dashboard__panels--text">
                  Enter your Fortnite username in the account section to see your
                  Fortnite stats right here!
              </h5>
              )}
          </div>
        </div>

      </div>
    );
  }
}
export default DashboardPanels;
