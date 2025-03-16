import { LobbyPlayer } from "@/types/player";
import { Navigate, useLocation } from "@tanstack/react-router";
import React, { createContext, useContext, useState } from "react";

export type ExposedGame = {
  pin: string;
  players: LobbyPlayer[];
  inGame: boolean;
};

const ExpoedGameContext = createContext<
  ExposedGame & { setState: React.Dispatch<React.SetStateAction<ExposedGame>> }
>({
  pin: "",
  players: [],
  inGame: false,
  setState: () => {},
});

export const useExposedGame = () => useContext(ExpoedGameContext);

type Props = {
  children: React.ReactNode;
};

export default function ExposedGameWrapper({ children }: Props) {
  const [state, setState] = useState<ExposedGame>({
    inGame: false,
    pin: "",
    players: [],
  });
  const path = useLocation();

  if (!state.inGame && path.pathname.includes("active")) {
    return <Navigate to="/error" />;
  }

  return (
    <ExpoedGameContext.Provider value={{ ...state, setState }}>
      {children}
    </ExpoedGameContext.Provider>
  );
}
