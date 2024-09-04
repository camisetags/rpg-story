import { UseToastOptions } from '@chakra-ui/react';

export const showToast = (
  toast: (options: UseToastOptions) => void, 
  title: string, 
  description: string, 
  status: 'success' | 'error' | 'info' | 'warning'
) => {
  toast({
    title,
    description,
    status,
    duration: 3000,
    isClosable: true,
  });
};
