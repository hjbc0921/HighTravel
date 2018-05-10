import React, { PropTypes } from 'react'
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`
const routes = [
 {
  path:  "/",
  exact: true,
  sidebar: () => <div>home!</div>,
  main: () => <h2>Home</h2>
 },
 {
  path: "/",
  sidebar: () => <div>money!</div>,
  main: () => <h2>Money</h2>
 },
 {
  path: "/",
  sidebar: () => <div>map!</div>,
  main: () => <h2>Map</h2>
 },
 { 
  path: "/",
  sidebar: () => <div>rules!</div>,
  main: () => <h2>Rules</h2>
 },
 {
  path: "/",
  sidebar: () => <div>photo! </div>,
  main: () => <h2>Photo</h2>
 },
 { 
  path: "/",
  sidebar: () => <div>diary! </div>,
  main: () => <h2>Diary </h2>
 }
]; 

const Sidebar = () => {
  <Router>
  <div style ={{ display: "flex"}}>
   <div
     style={{
       padding: "10px",
       width: "40%",
       background:"#f0f0f0"
    }}
  >
   <ul style={{ listStyleType: "none", padding: 0}}>
     <li>
       <Link to="/"> Home </Link>
     </li>
     <li>
       <Link to="/ "> Money </Link>
     </li>
     <li>
       <Link to=" /"> Map </Link>
     </li>
     <li>
       <Link to=" /">Rules </Link>
     </li>
     <li>
       <Link to=" /">Photo </Link>
     </li>
     <li>
       <Link to=" /">Diary </Link>
     </li>
   </ul>
   {routes.map((route, index) => (
     <Route
      key ={index}
      path={route.path}
      exact={route.exact}
      component={route.sidebar}
    />
   ))}
  </div>

  <div style ={{ flex :1, padding: "10px"}}>
   {routes.map((route, index) => (
    <Route
      key={index}
      path={route.path}
      exact={route.exact}
      component={route.main}
     />
   ))}
  </div>
 </div>
</Router>
};

export default Sidebar
