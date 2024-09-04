'use client';
import { useGameStore } from '@/store';
import { Box, Text } from '@chakra-ui/react';

export default function Inventory() {
  const { inventory, coins } = useGameStore(); // Carrega o inventário e as moedas do estado global

  return (
    <Box borderWidth="1px" borderRadius="lg" p="6" bg="gray.100" w="100%" maxW="md" mb="8">
      <Text mb="4" fontSize="lg" fontWeight="bold">Inventário</Text>
      <ul>
        {inventory.map((item, index) => (
          <li key={index}>
            {item.name} (Peso: {item.weight}kg, Custo: {item.cost} moedas)
          </li>
        ))}
      </ul>
      <Text mt="4" fontSize="md" fontWeight="bold">
        Moedas: {coins}
      </Text>
    </Box>
  );
}
// // app/components/Inventory.tsx
// import { Box, Heading, List, ListItem, Text } from '@chakra-ui/react';
// import { useGameStore } from '@/store';

// export default function Inventory() {
//   const inventory = useGameStore((state) => state.inventory);
//   const coins = useGameStore((state) => state.coins);

//   return (
//     <Box borderWidth="1px" borderRadius="lg" p="6" bg="gray.100" w="100%" maxW="md" mb="8">
//       <Heading size="md" mb="4">Inventário</Heading>
//       <Text>Moedas: {coins}</Text>
//       <List spacing={3} mt="4">
//         {inventory.map((item, index) => (
//           <ListItem key={index}>
//             {item.name} (Peso: {item.weight}kg, Custo: {item.cost} moedas)
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );
// }
