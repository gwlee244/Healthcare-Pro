import React from "react";
import "./DoctorCard.css";

function DoctorCard(props) {
  return (
    <div className="card">
      <div className="img-container">
        <ul>
          <li>
            <strong>Name:</strong> {props.name}
          </li>
          <li>
            <strong>Field:</strong> {props.field}
          </li>
          <li>
            <strong>Education:</strong> {props.schools}
          </li>
          <li>
            <strong>Work Experience: </strong> {props.work}
          </li>
          <li>
          <strong>Office Information: </strong> {props.office}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DoctorCard;
