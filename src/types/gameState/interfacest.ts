export type Item = {
  name: string;
  weight: number;
  cost: number;
  enhancement?: string;
};

export type Skill = {
  name: string;
  level: number;
};

export type GameEvent = {
  name: string;
  difficulty: string;
};

export interface GameState {
  currentState: string;
  inventory: Item[];
  skills: Skill[];
  eventHistory: string[];
  completedNodes: string[];
  gameProgress: {
    [key: string]: any; 
  };
}
