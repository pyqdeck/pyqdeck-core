import { MetricCardView } from './metric-card-view';
import { Users, FileText, GraduationCap, Clock } from 'lucide-react';

const meta = {
  title: 'Studio/Shared/MetricCard',
  component: MetricCardView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the metric card',
    },
    value: {
      control: 'text',
      description: 'The main value displayed in the card',
    },
    subLabel: {
      control: 'text',
      description: 'The secondary label or description',
    },
    icon: {
      control: false,
      description: 'Lucide icon component to display',
    },
    tone: {
      control: 'select',
      options: ['neutral', 'warning'],
      description: 'Visual tone of the icon container',
      table: {
        defaultValue: { summary: 'neutral' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the card is in a loading state',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;

export const UsersMetric = {
  args: {
    title: 'Total Users',
    value: '12,847',
    subLabel: 'Active students this month',
    icon: Users,
    tone: 'neutral',
    loading: false,
  },
};

export const PapersMetric = {
  args: {
    title: 'Question Papers',
    value: '4,520',
    subLabel: 'Across 12 universities',
    icon: FileText,
    tone: 'neutral',
    loading: false,
  },
};

export const AcademicsMetric = {
  args: {
    title: 'Academic Branches',
    value: '18',
    subLabel: 'Supporting 450+ subjects',
    icon: GraduationCap,
    tone: 'neutral',
    loading: false,
  },
};

export const PendingMetric = {
  args: {
    title: 'Pending Reviews',
    value: '24',
    subLabel: 'Requires immediate attention',
    icon: Clock,
    tone: 'warning',
    loading: false,
  },
};

export const Loading = {
  args: {
    ...UsersMetric.args,
    loading: true,
  },
};
