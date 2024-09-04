import { Button } from '@chakra-ui/react';
import { ChoiceOptionsProps } from '@/types/story'; // Definir o tipo 'Option' em uma pasta de tipos



export default function ChoiceOptions({ options, onChoice }: ChoiceOptionsProps) {
  return (
    <div>
      {options.map((option, index) => (
        <Button
          key={index}
          colorScheme="teal"
          width="100%"
          mb="4"
          onClick={() => onChoice(option)}
        >
          {option.choice}
        </Button>
      ))}
    </div>
  );
}
