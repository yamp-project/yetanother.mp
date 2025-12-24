export type RoadmapStatus = 'completed' | 'in-progress' | 'planned';

export interface RoadmapMedia {
  type: 'image' | 'video' | 'youtube';
  src: string;
  alt?: string;
  thumbnail?: string;
}

export interface RoadmapEntry {
  id: string;
  date: string;
  title: string;
  description: string;
  status: RoadmapStatus;
  media?: RoadmapMedia[];
  icon?: string;
}

export interface StatusConfig {
  text: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  icon: string;
  dotColor: string;
}

export const statusConfigMap: Record<RoadmapStatus, StatusConfig> = {
  completed: {
    text: 'Completed',
    bgClass: 'bg-purple-600/20',
    textClass: 'text-purple-200',
    borderClass: 'border-purple-600/30',
    icon: 'mdi:check-circle',
    dotColor: 'bg-purple-500',
  },
  'in-progress': {
    text: 'In Progress',
    bgClass: 'bg-orange-600/20',
    textClass: 'text-orange-200',
    borderClass: 'border-orange-600/30',
    icon: 'mdi:progress-clock',
    dotColor: 'bg-orange-500',
  },
  planned: {
    text: 'Planned',
    bgClass: 'bg-zinc-600/20',
    textClass: 'text-zinc-300',
    borderClass: 'border-zinc-600/30',
    icon: 'mdi:clock-outline',
    dotColor: 'bg-zinc-500',
  },
};
