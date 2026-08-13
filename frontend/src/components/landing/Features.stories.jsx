import { Features } from './Features';
import { Layers, Building2, Bookmark, Sparkles, Ban, Users } from 'lucide-react';

/**
 * The Features component highlights the key capabilities of the PyqDeck platform.
 * It uses a grid of cards to display different features with icons and descriptions.
 */
const meta = {
  title: 'Landing/Features',
  component: Features,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    badgeText: {
      control: 'text',
      description: 'Text displayed in the badge above the title',
    },
    title: {
      control: 'text',
      description: 'Main heading for the features section',
    },
    description: {
      control: 'text',
      description: 'Sub-heading providing more context',
    },
    features: {
      control: 'object',
      description: 'Array of feature objects to display',
    },
  },
};

export default meta;

const defaultFeatures = [
  {
    icon: Layers,
    title: 'Structured browsing',
    description:
      'University → branch → semester → subject → paper. No more scrolling through a messy Drive folder.',
  },
  {
    icon: Building2,
    title: 'Multi-university',
    description:
      "Not locked to one college. We're adding universities as students request them.",
  },
  {
    icon: Bookmark,
    title: 'Bookmarks',
    description:
      'Save the questions that matter and come back to them the night before your exam.',
  },
  {
    icon: Sparkles,
    title: 'Ask AI',
    description:
      'Stuck on a question? One tap sends it to Coursify, our AI-tutoring partner, for a clear explanation.',
  },
  {
    icon: Ban,
    title: 'No paywall',
    description:
      'Ad-supported, not subscription-gated. Every paper we have is free to browse.',
  },
  {
    icon: Users,
    title: 'Added by real people',
    description:
      'Papers are uploaded and organized through our admin studio — not scraped and dumped.',
  },
];

export const Default = {
  args: {
    badgeText: 'What you get',
    title: 'Everything you need to find a paper fast',
    description: 'No account required to browse. Sign up only if you want bookmarks.',
    features: defaultFeatures,
  },
};

export const CustomContent = {
  args: {
    badgeText: 'Exclusive Benefits',
    title: 'Why Choose PyqDeck?',
    description: 'We provide the best tools for engineering students.',
    features: defaultFeatures.slice(0, 3),
  },
};

export const MobileView = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    ...Default.args,
  },
};
