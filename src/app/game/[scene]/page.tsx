'use client';

import { useRouter } from 'next/navigation';
import { Box, Button, Container, Heading, Text, Flex, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useStory } from '@/data/getStory'; // Hook para carregar a história
import { useGameStore } from '@/store'; // Store Zustand
import Inventory from '@/components/Inventory';

interface Option {
  choice: string;
  next: string;
  effects?: {
    add_item?: {
      name: string;
      weight: number;
      cost: number;
    };
    gain_skill?: {
      name: string;
      level: number;
    };
    trigger_event?: {
      name: string;
      difficulty: string;
    };
  };
}

interface Scene {
  description: string;
  options: Option[];
}

export default function GamePage({ params }: { params: { scene: string } }) {
  const router = useRouter();
  const toast = useToast(); // Chakra UI Toast
  const story = useStory(); // Carrega a história usando o hook
  const [sceneData, setSceneData] = useState<Scene | null>(null);

  // Carrega o estado global do jogo (moedas e inventário)
  const { addItem, spendCoins, loadGameState } = useGameStore();

  // Carrega o estado do jogo do localStorage quando o componente é montado
  useEffect(() => {
    loadGameState(); // Carrega o progresso salvo do jogo
  }, [loadGameState]);

  // Função para salvar a cena atual no localStorage
  const saveCurrentScene = (scene: string) => {
    localStorage.setItem('currentScene', scene);
  };

  // Verifica e redireciona para a última cena salva, caso a URL seja inválida
  useEffect(() => {
    if (story && params.scene) {
      const scene = story[params.scene];
      if (scene) {
        setSceneData({
          ...scene,
          description: scene.description || '',
          options: scene.options || [],
        });
        saveCurrentScene(params.scene); // Salva a cena atual no localStorage
      } else {
        const lastScene = localStorage.getItem('currentScene');
        if (lastScene) {
          router.push(`/game/${lastScene}`);
        } else {
          router.push('/game/explore_village'); // Se não houver cena salva, redireciona para uma padrão
        }
      }
    }
  }, [story, params.scene, router]);

  const handleChoice = (option: Option) => {
    // Gasta moedas e adiciona item
    if (option.effects?.add_item) {
      if (spendCoins(option.effects.add_item.cost)) {
        addItem(option.effects.add_item);
        toast({
          title: "Item adquirido!",
          description: `${option.effects.add_item.name} foi adicionado ao seu inventário.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Moedas insuficientes",
          description: "Você não tem moedas suficientes para essa compra.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }

    if (option.effects?.gain_skill) {
      toast({
        title: "Habilidade ganha!",
        description: `Você adquiriu a habilidade: ${option.effects.gain_skill.name}.`,
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }

    if (option.effects?.trigger_event) {
      toast({
        title: "Evento disparado!",
        description: `Evento: ${option.effects.trigger_event.name} começou.`,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }

    // Redireciona para a próxima cena e salva no localStorage
    router.push(`/game/${option.next}`);
    saveCurrentScene(option.next);
  };

  if (!sceneData) return <p>Carregando...</p>; // Mostra um loading enquanto carrega a cena

  return (
    <Container maxW="container.xl" py="8">
      <Heading mb="4" textAlign="center">
        Exploração RPG
      </Heading>

      {/* Layout em duas colunas */}
      <Flex>
        {/* Coluna da esquerda - Inventário */}
        <Box flex="1" borderRightWidth="1px" pr="6" maxW="300px">
          <Inventory />
        </Box>

        {/* Coluna da direita - História */}
        <Box flex="2" pl="6">
          <Heading size="md" mb="4">
            Cena Atual
          </Heading>
          <Box borderWidth="1px" borderRadius="lg" p="6" bg="gray.50" w="100%">
            <Text mb="6">{sceneData.description}</Text>
            <Box>
              {sceneData.options.map((option, index) => (
                <Button
                  key={index}
                  colorScheme="teal"
                  width="100%"
                  mb="4"
                  onClick={() => handleChoice(option)}
                >
                  {option.choice}
                </Button>
              ))}
            </Box>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}
