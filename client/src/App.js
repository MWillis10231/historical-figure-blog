import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import BlogHub from './components/BlogHub/BlogHub';
import Error from './components/Error/Error';
import LogIn from './components/Login/LogIn';
import { selectBlogStatus } from './features/blog/blogSlice';

function App() {
  const blogStatus = useSelector(selectBlogStatus);
  const [error, setError] =  useState(false)

  useEffect(() => {
    if (blogStatus === "failed") {
      setError(true)
    } else {
      setError(false)
    }
  }, [blogStatus])


  return (
    <Router>
      <Switch>
        <Route path="/blog/">
          {error ? <Error/> : <BlogHub />}
        </Route>
        <Route path="/">
          <LogIn />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
