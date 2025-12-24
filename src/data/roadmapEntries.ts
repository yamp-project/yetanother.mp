import type { RoadmapEntry } from '../types/roadmap';

export const roadmapEntries: RoadmapEntry[] = [
  // Completed entries
  {
    id: 'core-networking',
    date: '2024-06-15',
    title: 'Core Networking Layer',
    description: 'Implemented server-side authority and base synchronization protocols for reliable multiplayer connections.',
    status: 'completed',
    icon: 'mdi:server-network',
    media: [
      { type: 'image', src: 'https://picsum.photos/seed/networking/800/450', alt: 'Network architecture diagram' },
    ],
  },
  {
    id: 'scripting-api',
    date: '2024-09-20',
    title: 'Scripting API Foundation',
    description: 'Built the foundational scripting interfaces enabling developers to create custom game modes and experiences.',
    status: 'completed',
    icon: 'mdi:code-braces',
    media: [
      { type: 'image', src: 'https://picsum.photos/seed/scripting1/800/450', alt: 'Scripting API example' },
      { type: 'image', src: 'https://picsum.photos/seed/scripting2/800/450', alt: 'Code editor integration' },
    ],
  },
  {
    id: 'website-launch',
    date: '2024-11-01',
    title: 'Website Launch',
    description: 'Launched the official YAMP website with information about the project and community resources.',
    status: 'completed',
    icon: 'mdi:web',
  },

  // In-progress entries
  {
    id: 'alpha-testing',
    date: '2025-01-15',
    title: 'Alpha Testing Program',
    description: 'Rolling out closed alpha to selected community members for early feedback and bug discovery.',
    status: 'in-progress',
    icon: 'mdi:test-tube',
    media: [
      { type: 'image', src: 'https://picsum.photos/seed/alpha1/800/450', alt: 'Alpha testing screenshot' },
      { type: 'image', src: 'https://picsum.photos/seed/alpha2/800/450', alt: 'Multiplayer session' },
      { type: 'youtube', src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', alt: 'Alpha gameplay preview' },
    ],
  },

  // Planned entries
  {
    id: 'public-beta',
    date: '2025-06-01',
    title: 'Public Beta Launch',
    description: 'Opening YAMP to the broader community with expanded features and stability improvements.',
    status: 'planned',
    icon: 'mdi:rocket-launch',
    media: [
      { type: 'image', src: 'https://picsum.photos/seed/beta/800/450', alt: 'Beta launch concept' },
    ],
  },
  {
    id: 'modding-tools',
    date: '2025-09-01',
    title: 'Advanced Modding Tools',
    description: 'Release of comprehensive modding toolkit including visual editors and debugging utilities.',
    status: 'planned',
    icon: 'mdi:puzzle',
  },
];

export function getSortedEntries(order: 'asc' | 'desc' = 'desc'): RoadmapEntry[] {
  return [...roadmapEntries].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
}
