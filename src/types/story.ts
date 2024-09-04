export type StoryOption = {
  choice: string;
  next: string;
  effects?: {
    gain_item?: { name: string; weight: number; cost: number };
    gain_skill?: { name: string; level: number };
    improve_item?: { name: string; enhancement: string };
  };
}

export type StoryNodeData = {
  description?: string;
  options?: StoryOption[];
}

export type Story = {
  [key: string]: StoryNodeData;
}

export type StoryNodeProps = {
  nodeId: string;
  storyData: Record<string, StoryNodeData>;
};
