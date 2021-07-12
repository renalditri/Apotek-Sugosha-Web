import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { authenticationService } from "../services/authentication"

function Logout(props) {
  if(authenticationService.currentUser) {
    authenticationService.logout();
    window.location.reload();
  }
  
  return (
    <Redirect to={{ pathname: '/', state: { from: props.location } }} />
  );
}
export default Logout;
