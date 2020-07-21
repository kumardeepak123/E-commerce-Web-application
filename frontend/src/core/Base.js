import React from "react";
import Menu from "./menu";

const Base = ({
  title = "My title",
  description = "My description",
  className = "bg-dark  text-white p-4",
  children,
  
}) => (


  <div>
       <Menu/>
    <div className="container-fluid">
      <div className="jumbotron bg-success text-white text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer  className="footer bg-success mt- auto py-3" >
      <div className="container-fluid bg-succes  text-white  text-center">
        <h4> if u have any doubt feel free to reach out!</h4>
        <button className="btn-warning btn-lg">Contact us</button>
      </div>
      <div className="container-fluid">
        <span className="text-muted">an Amazing Mern bootcsmp</span>
      </div>
    </footer>
  </div>
);

export default Base;
