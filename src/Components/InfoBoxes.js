import React from "react";
import "./InfoBoxes.css";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBoxes(props) {
  return (
    <>
      <Card className="infobox">
        <CardContent>
          {/* {title} */}
          <div color="textSecondary" className="infobox__title">{props.title}</div>

          {/* {number of cases} */}
          <h2 className="infobox__cases">{props.cases} <small>Today</small></h2>

          {/* {total} */}
          <div color="textSecondary" className="infobox__total">{props.total} Total</div>
        </CardContent>
      </Card>
    </>
  );
}

export default InfoBoxes;
