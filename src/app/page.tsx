'use client';
import { redirect } from 'next/navigation';
import { useStory } from '@/data/getStory';

export default function Home() {
  // Carrega a história do localStorage ou faz o merge dos arquivos JSON
  const story = useStory();

  console.log(story);

  redirect('/game/i');
  

  return null;
}
