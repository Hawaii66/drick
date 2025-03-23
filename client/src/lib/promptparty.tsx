import { LobbyPlayer } from "@/types/player";
import { Navigate, useLocation } from "@tanstack/react-router";
import React, { createContext, useContext, useState } from "react";

export type PromptPartyGame = {
  pin: string;
  players: LobbyPlayer[];
  inGame: boolean;
};

const PromptPartyGameContext = createContext<
  PromptPartyGame & {
    setState: React.Dispatch<React.SetStateAction<PromptPartyGame>>;
  }
>({
  pin: "",
  players: [],
  inGame: false,
  setState: () => {},
});

export const usePromptPartyGame = () => useContext(PromptPartyGameContext);

type Props = {
  children: React.ReactNode;
};

export default function PromptPartyGameWrapper({ children }: Props) {
  const [state, setState] = useState<PromptPartyGame>({
    inGame: false,
    pin: "",
    players: [],
  });
  const path = useLocation();

  if (!state.inGame && path.pathname.includes("active")) {
    return <Navigate to="/error" />;
  }

  return (
    <PromptPartyGameContext.Provider value={{ ...state, setState }}>
      {children}
    </PromptPartyGameContext.Provider>
  );
}
