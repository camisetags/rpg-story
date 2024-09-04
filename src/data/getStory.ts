import { Story } from '@/types/story';
import { useEffect, useState } from 'react';

export const loadStory = async () => {
  if (typeof window !== 'undefined') {
    const storyVersion = localStorage.getItem('story_version');
    const currentVersion = '1.1'; // Atualize a versão quando modificar os JSONs

    if (storyVersion !== currentVersion || !localStorage.getItem('story')) {
      let notLoadedStories = [];
      
      for (let i = 1; i <= 14; i++) {
        notLoadedStories.push(import(`../data/story${i}.json`));
      }

      const loadedStories = await Promise.all(notLoadedStories);
      const mergedStory = loadedStories.reduce((acc, story) => ({
        ...acc,
        ...story.default,
      }), {});

      localStorage.setItem('story', JSON.stringify(mergedStory));
      localStorage.setItem('story_version', currentVersion);

      return mergedStory;
    } else {
      return JSON.parse(localStorage.getItem('story')!);
    }
  }

  return null;
};

export const useStory = () => {
  const [story, setStory] = useState<Story | null>(null);
  

  useEffect(() => {
    const fetchStory = async () => {
      const storyData = await loadStory();
      if (storyData) {
        console.log(Object.keys(storyData).length, 'turns loaded');
        setStory(storyData);
      }
    };

    fetchStory();
  }, []);

  return story;
}
