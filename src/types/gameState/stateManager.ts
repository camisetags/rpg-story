import { GameState } from "./interfacest";


let initialState: GameState = {
  currentState: "explore_village",
  inventory: [],
  skills: [],
  eventHistory: [],
  completedNodes: [],
  gameProgress: {}
};


export const loadGameState = (): GameState => {
  if (typeof window !== "undefined") {
    const savedState = localStorage.getItem("gameState");
    if (savedState) {
      return JSON.parse(savedState) as GameState;
    }
  }
  return initialState;
};


export const saveGameState = (state: GameState) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("gameState", JSON.stringify(state));
  }
};


export const updateGameState = (
  currentState: string,
  options: Partial<GameState>
): GameState => {
  const state = loadGameState();

  const newState: GameState = {
    ...state,
    currentState,
    ...options,
    eventHistory: [...state.eventHistory, currentState],
    completedNodes: [...state.completedNodes, currentState]
  };

  saveGameState(newState);
  return newState;
};
