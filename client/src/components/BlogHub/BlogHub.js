import React, { useEffect } from "react";
import BlogPostList from "../BlogPostList/BlogPostList";
import BlogNavigationBar from "../BlogNavigationBar/BlogNavigationBar";
import About from "../About/About"
import BlogPostSingle from "../BlogPostSingle/BlogPostSingle";
import "./BlogHub.css";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import BlogPostCreate from "../BlogPostCreate/BlogPostCreate";
import { useDispatch, useSelector } from "react-redux";
import { getUser, selectUserData, selectUserFromServer, selectUserLoggedIn } from "../../features/user/userSlice";

export default function BlogHub() {
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const admin = useSelector(selectUserData).admin
  const serverCheck = useSelector(selectUserFromServer);
  const userLoggedIn = useSelector(selectUserLoggedIn)

  useEffect(() => {
    if (serverCheck === false && userLoggedIn === false) {
      dispatch(getUser())
    }
  }, [dispatch, serverCheck, userLoggedIn])

  console.log(serverCheck)
  console.log(userLoggedIn)

  return (
    <React.Fragment>
      <BlogNavigationBar />
      <Switch>
        <Route path={`${match.url}/new/`}>
          {admin ? <BlogPostCreate /> : <Redirect to="/"/>}
        </Route>
        <Route path={`${match.url}/about/`} component={About} exact />
        <Route path={`${match.url}/:blogPostId/`} component={BlogPostSingle} exact />
        <Route path={`${match.url}/`} component={BlogPostList} exact />
      </Switch>
    </React.Fragment>
  );
}
