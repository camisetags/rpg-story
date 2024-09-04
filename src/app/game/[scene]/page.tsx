'use client';

import { useRouter } from 'next/navigation';
import { Box, Container, Heading, Text, Flex, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useStory } from '@/data/getStory';
import { useGameStore } from '@/store';
import Inventory from '@/components/Inventory';
import ChoiceOptions from '@/components/ChoiceOptions';
import { saveCurrentScene, handleSceneRedirect } from '@/utils/gameUtils';
import { handleItemEffect, handleSkillEffect, handleEventEffect } from '@/utils/effectsUtils';
import { Option, StoryNodeData } from '@/types/story';

// interface Scene {
//   description: string;
//   options: Option[];
// }

export default function GamePage({ params }: { params: { scene: string } }) {
  const router = useRouter();
  const toast = useToast();
  const story = useStory();
  const [sceneData, setSceneData] = useState<StoryNodeData | null>(null);

  // Pega as funções e estados da store Zustand
  const { addItem, spendCoins, loadGameState } = useGameStore();

  // Carrega o progresso do jogo ao montar o componente
  useEffect(() => {
    loadGameState();
  }, [loadGameState]);

  // Carrega a cena com base na URL e na história
  useEffect(() => {
    if (story && params.scene) {
      const scene = handleSceneRedirect(router, story, params.scene);
      if (scene) {
        setSceneData(scene);
        saveCurrentScene(params.scene);
      }
    }
  }, [story, params.scene, router]);

  // Função para lidar com a escolha do jogador
  const handleChoice = (option: Option) => {
    // Aplica efeitos de itens, habilidades e eventos
    handleItemEffect(option, spendCoins, addItem, toast);
    handleSkillEffect(option, toast);
    handleEventEffect(option, toast);

    // Redireciona para a próxima cena
    router.push(`/game/${option.next}`);
    saveCurrentScene(option.next);
  };

  // Mostra um loading enquanto a cena está sendo carregada
  if (!sceneData) return <p>Carregando...</p>;

  return (
    <Container maxW="container.xl" py="8">
      <Heading mb="4" textAlign="center">
        Exploração RPG
      </Heading>

      <Flex>
        {/* Coluna da esquerda - Inventário */}
        <Box flex="1" borderRightWidth="1px" pr="6" maxW="300px">
          <Inventory />
        </Box>

        {/* Coluna da direita - História */}
        <Box flex="2" pl="6">
          <Heading size="md" mb="4">Cena Atual</Heading>
          <Box 
            borderWidth="1px" 
            borderRadius="lg" 
            p="6" 
            bg="gray.50" 
            w="100%" 
            overflowY="auto" // Para rolagem se necessário
            maxH="80vh" // Limita a altura para caber na tela sem cortar
          >
            {/* Exibe a descrição completa */}

            <Text mb="6" whiteSpace="pre-wrap"> {/* Isso vai manter o texto no formato correto */}
              {sceneData?.description}
              {console.log(sceneData?.description) as undefined || ''}
            </Text>
            {/* Renderiza as opções de escolha */}
            <ChoiceOptions options={sceneData?.options || []} onChoice={handleChoice} />
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}
