import { Item } from '@/types/gameState/interfacest';
import { Option } from '@/types/story';
import { showToast } from '@/utils/toastUtils';
import { UseToastOptions } from '@chakra-ui/react';


export const handleItemEffect = (
  option: Option,
  spendCoins: (amount: number) => boolean, // Tipagem da função spendCoins
  addItem: (item: Item) => void, // Tipagem da função addItem
  toast: (options: UseToastOptions) => void
) => {
  const { add_item } = option.effects || {};

  if (add_item) {
    if (spendCoins(add_item.cost)) {
      addItem(add_item); // Adiciona o item no inventário
      showToast(toast, 'Item adquirido!', `${add_item.name} foi adicionado ao seu inventário.`, 'success');
    } else {
      showToast(toast, 'Moedas insuficientes', 'Você não tem moedas suficientes para essa compra.', 'error');
    }
  }
};

export const handleSkillEffect = (
  option: Option,
  toast: (options: UseToastOptions) => void
) => {
  const { gain_skill } = option.effects || {};

  if (gain_skill) {
    showToast(toast, 'Habilidade ganha!', `Você adquiriu a habilidade: ${gain_skill.name}.`, 'info');
  }
};


export const handleEventEffect = (
  option: Option,
  toast: (options: UseToastOptions) => void
) => {
  const { trigger_event } = option.effects || {};

  if (trigger_event) {
    showToast(toast, 'Evento disparado!', `Evento: ${trigger_event.name} começou.`, 'warning');
  }
};
