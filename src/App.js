import logo from './logo.svg';
import './App.css';

import axios from "axios";

import SearchIcon from "@material-ui/icons/Search";

import { useEffect, useRef, useState } from 'react'

function App() {

  const [loading, setLoading] = useState(false)
  const [universities, setUniversities] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const loadUniversities = async (value) => {
    setLoading(true);
    const response = await axios.get("https://cors-anywhere.herokuapp.com/http://universities.hipolabs.com/search?country=" + searchTerm);
    setUniversities(response.data);
    setLoading(false);
  }

  return (
    <div className="App">
      <h2>UNIVERSITY FINDER</h2>
      <input type="text" placeholder="Search Country..." onChange={event => { setSearchTerm(event.target.value) }} />
      <div className="searchIcon"><SearchIcon id="searchBtn" onClick={loadUniversities} /></div>

      <p class="solid"></p>

      <h3>Results (showing {universities.length} results)</h3>
      {loading ? (
        <h4>Loading...</h4>
      ) : (
        <div className="univResult">
          {universities.map((value, key) => {
            return (
              <a className="universityName" href={value.web_pages} target="_blank">
                <p>{value.name}</p>
              </a>
            );
          })}
        </div>
      )}

    </div>
  );

}

export default App;
