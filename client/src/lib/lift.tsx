import { LobbyPlayer } from "@/types/player";
import { Navigate, useLocation } from "@tanstack/react-router";
import React, { createContext, useContext, useState } from "react";

export type LiftGame = {
  pin: string;
  players: LobbyPlayer[];
  inGame: boolean;
};

const LiftGameContext = createContext<
  LiftGame & {
    setState: React.Dispatch<React.SetStateAction<LiftGame>>;
  }
>({
  pin: "",
  players: [],
  inGame: false,
  setState: () => {},
});

export const useLiftGame = () => useContext(LiftGameContext);

type Props = {
  children: React.ReactNode;
};

export default function LiftGameWrapper({ children }: Props) {
  const [state, setState] = useState<LiftGame>({
    inGame: false,
    pin: "",
    players: [],
  });
  const path = useLocation();

  if (!state.inGame && path.pathname.includes("active")) {
    return <Navigate to="/error" />;
  }

  return (
    <LiftGameContext.Provider value={{ ...state, setState }}>
      {children}
    </LiftGameContext.Provider>
  );
}
