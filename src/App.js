import React, { Component } from 'react'
import ManagePage from './Pages/ManagePage'
import PreviewPage from './Pages/PreviewPage'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <nav>
            <Link to="/">Manage</Link>
            <Link to="/preview">Preview</Link>
          </nav>
          <Route exact path="/" component={ManagePage} />
          <Route path="/preview" component={PreviewPage} />
        </Router>
      </div>
    )
  }
}
