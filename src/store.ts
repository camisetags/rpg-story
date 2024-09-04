import create from 'zustand';

interface Item {
  name: string;
  weight: number;
  cost: number;
}

interface GameState {
  inventory: Item[];
  coins: number;
  addItem: (item: Item) => void;
  removeItem: (itemName: string) => void;
  spendCoins: (amount: number) => boolean;
  loadGameState: () => void;
  saveGameState: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  inventory: [],
  coins: 1000, // O jogador começa com 1000 moedas
  addItem: (item: Item) => {
    set((state) => ({
      inventory: [...state.inventory, item],
    }));
    get().saveGameState(); // Salva o estado após adicionar item
  },
  removeItem: (itemName: string) => {
    set((state) => ({
      inventory: state.inventory.filter((item) => item.name !== itemName),
    }));
    get().saveGameState(); // Salva o estado após remover item
  },
  spendCoins: (amount: number) => {
    if (get().coins >= amount) {
      set((state) => ({
        coins: state.coins - amount,
      }));
      get().saveGameState(); // Salva o estado após gastar moedas
      return true;
    } else {
      alert('Moedas insuficientes!');
      return false;
    }
  },
  loadGameState: () => {
    // Carrega o estado do jogo a partir do localStorage
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      set(parsedState);
    }
  },
  saveGameState: () => {
    // Salva o estado atual do jogo no localStorage
    const state = get();
    localStorage.setItem('gameState', JSON.stringify(state));
  },
}));
