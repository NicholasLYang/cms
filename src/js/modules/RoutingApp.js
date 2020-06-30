import React, { Component } from "react";
import Route from "react-router-dom/Route";
import appHistory from "tools/appHistory";
import MainApp from "./core/components/MainApp";
import SignUpForm from "./core/components/SignUpForm";
import ConnectedRouter from "react-router-redux/ConnectedRouter";
import { Redirect, Switch } from "react-router-dom";
import SectionPage from "./core/components/SectionPage";
import ArticlesPage from "./core/components/ArticlesPage";
import ArticlePage from "./core/components/ArticlePage";
import SearchResultsPage from "./core/components/SearchResultsPage";
import EditArticlePage from "./core/components/EditArticlePage";
import CreateArticlePage from "./core/components/CreateArticlePage";
import CreateSectionPage from "./core/components/CreateSectionPage";
import UserPage from "./core/components/UserPage";
import HomePage from "./HomePage";
import SignInPage from "./core/components/SignInPage";
import SignOutPage from "./core/components/SignOutPage";
import { connect } from "react-redux";
import { createSession } from "./core/actions";
import { bindActionCreators } from 'redux'

class RoutingApp extends Component {

  componentDidMount() {
    if (localStorage.getItem("uid")) {
      this.props.createSession(localStorage.getItem("uid"));
    }
  }

  render() {
    const { session } = this.props;
    return (
      <ConnectedRouter history={appHistory}>
        <MainApp>
          <Switch>
            <Route path="/search/:query" component={SearchResultsPage} />
            <Route exact path="/articles" component={ArticlesPage} />
            <Route
              exact
              path="/articles/new"
              render={() =>
                session ? (
                  <CreateArticlePage />
                ) : (
                  <Redirect
                    to={"/users/sign_in"}
                  />
                )
              }
            />
            <Route
              path="/articles/:slug/edit"
              render={({ match }) =>
                session ? <EditArticlePage /> : <Redirect to="/users/sign_in" />
              }
            />
            <Route path="/articles/:slug" component={ArticlePage} />
            <Route exact path="/sections/new" component={CreateSectionPage} />
            <Route path="/sections" component={SectionPage} />
            <Route exact path="/users/sign_up" component={SignUpForm} />
            <Route exact path="/users/sign_in" component={SignInPage} />
            <Route exact path="/users/sign_out" component={SignOutPage} />
            <Route path="/users/:slug" component={UserPage} />
            <Route exact path="/" component={HomePage} />
          </Switch>
        </MainApp>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = state => ({
  session: state.core.session
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createSession }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RoutingApp);
