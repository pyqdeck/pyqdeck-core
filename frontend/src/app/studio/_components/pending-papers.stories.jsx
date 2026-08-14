import { fn } from '@storybook/test';
import { PendingPapersView } from './pending-papers-view';

const meta = {
  title: 'Studio/Papers/PendingPapers',
  component: PendingPapersView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    papers: {
      control: 'object',
      description: 'List of papers awaiting moderation',
      table: {
        type: { summary: 'Array<Paper>' },
        defaultValue: { summary: '[]' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the moderation queue is loading',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onApprove: {
      description: 'Callback when a paper is approved',
      action: 'approved',
    },
    onReject: {
      description: 'Callback when a paper is rejected',
      action: 'rejected',
    },
  },
  args: {
    onApprove: fn(),
    onReject: fn(),
    loading: false,
  },
};

export default meta;

const mockPapers = [
  {
    id: '65f1a2b3c4d5e6f7a8b9c0d1',
    slug: 'math-201-calculus-ii-final-2023',
    title: 'Mathematics Final Exam 2023 - Calculus II',
    subjectOfferingId: { slug: 'math-201-calculus-ii' },
    status: 'Pending Review',
    createdAt: new Date().toISOString(),
  },
  {
    id: '65f1a2b3c4d5e6f7a8b9c0d2',
    slug: 'phy-302-electromagnetism-midterm-2024',
    title: 'Physics Midterm 2024 - Electromagnetism',
    subjectOfferingId: { slug: 'phy-302-electromagnetism' },
    status: 'Flagged',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '65f1a2b3c4d5e6f7a8b9c0d3',
    slug: 'cs-401-algorithms-quiz-1',
    title: 'Computer Science Quiz 1 - Algorithms',
    subjectOfferingId: { slug: 'cs-401-algorithms' },
    status: 'Pending Review',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

export const Default = {
  args: {
    papers: mockPapers,
  },
};

export const Empty = {
  args: {
    papers: [],
  },
};

export const Loading = {
  args: {
    papers: [],
    loading: true,
  },
};
