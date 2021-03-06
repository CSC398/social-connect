import React from "react";
import { TopHeader } from "./TopHeader";
import { Button, CircularProgress } from "@material-ui/core";
import { imagesData } from "../assets/imagesData";
import { LobbyViewStyles } from "../styles/LobbyViewStyles";

export const LobbyView = (props) => {
  const classes = LobbyViewStyles({});

  const {
    gameCode,
    hostName,
    joinName,
    enablePlayButtons,
    role,
    socket,
  } = props;
  const helperText = role === "host" ? "Waiting for another player" : "Waiting for host to start the game";

  socket.on("start game", startGame);
  function startGame() {
    props.goNext("lobby", "game");
  }

  //This is to get the name of the game selected
  const selectedGameData = imagesData.filter(
    (image) => image.title === "Chess"
  );

  return (
    <div>
      <TopHeader />
      <div className={classes.body}>
        <p className={classes.headers}>Game Selection</p>
        <img
          src={selectedGameData[0].img}
          className={classes.gameName}
          alt=""
        ></img>
        <p className={classes.headers}>Game Code</p>
        <div className={classes.subheaders}>
          <p className={classes.greyText}>{gameCode}</p>
        </div>
        <p className={classes.headers}>Players</p>
        <div className={classes.subheaders}>
          <p className={classes.greyText}>{hostName}</p>
          <p className={classes.vs}>vs</p>
          <p className={classes.greyText}>{joinName}</p>
        </div>
        <Button
          className={classes.startGame}
          onClick={() => {
            socket.emit("start game", gameCode);
            props.goNext("lobby", "game");
          }}
          disabled={!enablePlayButtons}
        >
          Start Game
        </Button>
        {!enablePlayButtons && (
          <div className={classes.loadingContainer}>
            <p className={classes.helperText}>{helperText}</p>
            <CircularProgress color="secondary" />
          </div>
        )}
      </div>
    </div>
  );
};
