import { Story } from '@/types/story';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Router } from 'next/router'; // Não é necessário AppRouterInstance

// Salva a cena atual no localStorage
export const saveCurrentScene = (scene: string) => {
  localStorage.setItem('currentScene', scene);
};

// Redireciona para uma cena válida ou última cena salva
export const handleSceneRedirect = (
  router: AppRouterInstance,  // Use o Router diretamente
  story: Story, 
  sceneKey: string
) => {
  const scene = story[sceneKey];

  if (scene) {
    return scene; // Retorna a cena se for válida
  } else {
    const lastScene = localStorage.getItem('currentScene');
    if (lastScene) {
      router.push(`/game/${lastScene}`); // Redireciona para a última cena válida
    } else {
      router.push('/game/explore_village'); // Redireciona para uma cena padrão
    }
  }
};
