import { UsersTableView } from './users-table-view';
import { fn } from '@storybook/test';

/**
 * `UsersTableView` displays a list of users with their identity, role, affiliation, and join date.
 * It provides administrative actions like updating roles, banning, and viewing user details.
 */
const meta = {
  title: 'Studio/Users/UsersTable',
  component: UsersTableView,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    users: {
      control: 'object',
      description: 'Array of user objects to display',
      table: {
        type: {
          summary: 'array',
          detail:
            'Array<{ clerkId: string, name: string, email: string, avatarUrl: string, role: "admin" | "editor" | "normal", isActive: boolean, isMe: boolean, createdAt: string, university?: { shortName: string }, branch?: { name: string } }>',
        },
        defaultValue: { summary: '[]' },
      },
    },
    pagination: {
      control: 'object',
      description: 'Pagination state object',
      table: {
        type: {
          summary: 'object',
          detail:
            '{ total: number, pages: number, page: number, limit: number }',
        },
      },
    },
    onUpdateRole: {
      description: 'Callback when updating a user role',
      table: { type: { summary: '(clerkId: string, role: string) => void' } },
    },
    onBanUser: {
      description: 'Callback when banning a user',
      table: { type: { summary: '(clerkId: string) => void' } },
    },
    onUnbanUser: {
      description: 'Callback when unbanning a user',
      table: { type: { summary: '(clerkId: string) => void' } },
    },
    onOpenDetail: {
      description: 'Callback when opening user detail dialog',
      table: { type: { summary: '(user: object) => void' } },
    },
    onCloseDetail: {
      description: 'Callback when closing user detail dialog',
      table: { type: { summary: '() => void' } },
    },
    selectedUser: {
      control: 'object',
      description: 'The user currently selected for detail view',
    },
    userStats: {
      control: 'object',
      description: 'Activity stats for the selected user',
      table: {
        type: {
          summary: 'object',
          detail: '{ bookmarksCount: number }',
        },
      },
    },
    isLoadingStats: {
      control: 'boolean',
      description: 'Whether user stats are currently loading',
    },
    isUpdating: {
      control: 'boolean',
      description: 'Whether an administrative update is in progress',
    },
  },
  args: {
    onUpdateRole: fn(),
    onBanUser: fn(),
    onUnbanUser: fn(),
    onOpenDetail: fn(),
    onCloseDetail: fn(),
  },
};

export default meta;

const mockUsers = [
  {
    clerkId: 'user_2kI7fL9mN4oP1qR2sT3uV4wX',
    name: 'Aryan Sharma',
    email: 'aryan.sharma@example.com',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aryan',
    role: 'admin',
    isActive: true,
    isMe: true,
    createdAt: '2023-05-15T10:30:00Z',
    university: { shortName: 'MU' },
    branch: { name: 'Computer Engineering' },
  },
  {
    clerkId: 'user_5yZ6aB7cC8dD9eE0fG1hI2jK',
    name: 'Priya Patel',
    email: 'priya.patel@example.com',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    role: 'editor',
    isActive: true,
    isMe: false,
    createdAt: '2023-08-22T14:45:00Z',
    university: { shortName: 'IITB' },
    branch: { name: 'Information Technology' },
  },
  {
    clerkId: 'user_3mN4oP5qR6sT7uV8wX9yZ0aB',
    name: 'Rahul Verma',
    email: 'rahul.verma@example.com',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
    role: 'normal',
    isActive: false,
    isMe: false,
    createdAt: '2024-01-10T09:15:00Z',
    university: { shortName: 'SPPU' },
    branch: { name: 'Mechanical Engineering' },
  },
  {
    clerkId: 'user_8hI9jK0lM1nN2oO3pP4qQ5rR',
    name: 'Sneha Reddy',
    email: 'sneha.reddy@example.com',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha',
    role: 'normal',
    isActive: true,
    isMe: false,
    createdAt: '2024-03-05T16:20:00Z',
    university: { shortName: 'DU' },
    branch: { name: 'Electronics & Communication' },
  },
];

export const Default = {
  args: {
    users: mockUsers,
    pagination: {
      total: 4,
      pages: 1,
      page: 1,
      limit: 10,
    },
  },
};

export const Empty = {
  args: {
    users: [],
    pagination: {
      total: 0,
      pages: 0,
      page: 1,
      limit: 10,
    },
  },
};

export const WithPagination = {
  args: {
    users: mockUsers,
    pagination: {
      total: 100,
      pages: 10,
      page: 2,
      limit: 10,
    },
  },
};

export const ShowingBanned = {
  args: {
    users: [mockUsers[2]],
    pagination: {
      total: 1,
      pages: 1,
      page: 1,
      limit: 10,
    },
  },
  parameters: {
    nextjs: {
      navigation: {
        query: {
          isActive: 'false',
        },
      },
    },
  },
};

export const UserDetailOpen = {
  args: {
    ...Default.args,
    selectedUser: mockUsers[1],
    userStats: {
      bookmarksCount: 24,
    },
    isLoadingStats: false,
  },
};

export const LoadingStats = {
  args: {
    ...Default.args,
    selectedUser: mockUsers[1],
    isLoadingStats: true,
  },
};
