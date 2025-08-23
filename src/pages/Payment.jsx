import React from "react";
import { GUMROAD_URL } from "../api";

export default function Payment(){
  return (
    <div className="center">
      <div className="card" style={{maxWidth:640}}>
        <h2>Buy access</h2>
        <p>Purchase access to create one clip for $30. After payment you'll receive a QR-code (or session) to continue.</p>
        <div className="row" style={{marginTop:12}}>
          <button className="btn btn-yes" onClick={()=>window.location.href = GUMROAD_URL}>Pay on Gumroad</button>
          <button className="btn" onClick={()=>window.history.back()}>Back</button>
        </div>
      </div>
    </div>
  );
}
