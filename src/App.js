import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav>
        <a href="/">Manage</a>
        <a href="/">Preview</a>
      </nav>
      <div className="crud-area">
        <section>
          <h2>Shows</h2>
          <div>
            <div>
              Show 1 <button>(delete)</button>
            </div>
            <div>
              Show 2 <button>(delete)</button>
            </div>
          </div>
        </section>
        <main>
          <h2>New/Edit Show</h2>
          <div>
            <label htmlFor="name-input">Name:</label>
            <input id="name-input" type="text"/>
          </div>
          <div>
            <label htmlFor="rating-input">Rating:</label>
            <input id="rating-input" type="text"/>
          </div>
          <div>
            <label htmlFor="image-url-input">Image URL:</label>
            <input id="image-url-input" type="text"/>
          </div>
          <button>Save</button>
        </main>
      </div>
    </div>
  );
}

export default App;
