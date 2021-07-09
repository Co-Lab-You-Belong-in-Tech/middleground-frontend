import React from "react";
import "./LegendMarker.css";
import CenterLogo from "./../resources/center_mini.png";
import LeftLogo from "./../resources/left_mini.png";
import RightLogo from "./../resources/right_mini.png";

function LegendMarker() {
  return (
    <div class="legend">
      <h2>Legend</h2>
      <div class="lean-legend">
        <img src={LeftLogo} alt="Left Leaning Legend" />
        <p>Left Leaning</p>
      </div>
      <div class="lean-legend">
        <img src={CenterLogo} alt="Center Legend" />
        <p>Center</p>
      </div>
      <div class="lean-legend">
        <img src={RightLogo} alt="Right Leaning Legend" />
        <p>Right Leaning</p>
      </div>
    </div>
  );
}
export default LegendMarker;
