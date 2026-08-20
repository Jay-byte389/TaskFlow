import { colors } from '../constants/colors';

export const PROJECTS_DATA = [
  {
    id: '1',
    title: 'Mobile App Redesign',
    author: 'Alex Chen',
    priority: 'High',
    tasksCount: 34,
    membersCount: 6,
    startDate:"Oct 01",
    dueDate: 'Dec 28',
    status: 'In Progress',
    progress: 68,
    themeColor: colors.primary,
  },
  {
    id: '2',
    title: 'API Integration v3',
    author: 'Sarah Kim',
    priority: 'Critical',
    tasksCount: 18,
    membersCount: 4,
    startDate:"Nov 10",
    dueDate: 'Jan 15',
    status: 'Todo',
    progress: 23,
    themeColor: colors.secondary,
  },
  {
    id: '3',
    title: 'Dashboard Analytics',
    author: 'Mike Ross',
    priority: 'Medium',
    tasksCount: 12,
    membersCount: 3,
    startDate:"Sep 25",
    dueDate: 'Dec 10',
    status: 'Review',
    progress: 85,
    themeColor: colors.success,
  },
  {
    id: '4',
    title: 'E-Commerce Platform',
    author: 'Emma Davis',
    priority: 'Low',
    tasksCount: 56,
    membersCount: 8,
    startDate:"Jan 8",
    dueDate: 'Nov 30',
    status: 'Completed',
    progress: 100,
    themeColor: colors.theme,
  },
];

export const Mobile_AppDesign = [
  {
    id: '1',
    title: 'Design system component Library',
    author: 'Alex Chen',
    status: 'In Progress',
  },
  {
    id: '2',
    title: 'User authentication Flow',
    author: 'Emma Devis',
    status: 'Completed',
  },
  {
    id: '3',
    title: 'Push Notification Service',
    author: 'Alex Chen',
    status: 'Backlog',
  },
  {
    id: '4',
    title: 'Dark Mode Implementation',
    author: 'Mike Ross',
    status: 'Testing',
  },
];

export const STATUS_DATA = [
  { label: 'Not Started', value: 'Not Started' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'On Hold', value: 'On Hold' },
  { label: 'Completed', value: 'Completed' },
];

export const Manager_Data = [
  { label: 'Alex Chen', value: 'Alex Chen' },
  { label: 'Sarah Kim', value: 'Sarah Kim' },
];

export const users = [
  { label: 'Alex Chen', value: '1', initials: 'AC', color: colors.primary },
  {
    label: 'Sarah Jenkins',
    value: '2',
    initials: 'SJ',
    color: colors.secondary,
  },
  { label: 'Mike', value: '3', initials: 'MR', color: colors.LowGreenText },
  { label: 'Emma', value: '4', initials: 'ED', color: colors.HighAmberText },
];

// Priority badge styling (top card)
export const getPriorityStyle = priority => {
  switch (priority) {
    case 'Critical':
      return { bg: colors.CriticalRedBg, text: colors.CriticalRedText };
    case 'High':
      return { bg: colors.HighAmberBg, text: colors.HighAmberText };
    case 'Medium':
      return { bg: colors.MediumBlueBg, text: colors.MediumBlueText };
    case 'Low':
      return { bg: colors.LowGreenBg, text: colors.LowGreenText };
    default:
      return { bg: colors.Slate100, text: colors.MutedSlateGray };
  }
};

// Status badge styling (task item list)
export const getStatusStyle = status => {
  switch (status) {
    case 'In Progress':
      return {
        bg: colors.MediumBlueBg,
        text: colors.primary,
        dot: colors.HighAmberText,
      };
    case 'Completed':
      return {
        bg: colors.LowGreenBg,
        text: colors.LowGreenText,
        dot: colors.HighAmberText,
      };
    case 'Backlog':
      return {
        bg: colors.Slate100,
        text: colors.MutedSlateGray,
        dot: colors.primary,
      };
    case 'Testing':
      return {
        bg: colors.PurpleIconBg,
        text: colors.secondary,
        dot: colors.LowGreenText,
      };
    default:
      return {
        bg: colors.Slate100,
        text: colors.MutedSlateGray,
        dot: colors.MutedSlateGray,
      };
  }
};


export const getBackgroundColor = type => {
  switch (type) {
    case 'success':
      return colors.success;
    case 'error':
      return colors.error;
    default:
      return colors.default;
  }
};


export const getStatusStyleProj = status => {
    switch (status) {
      case 'In Progress':
        return {
          bg: colors.MediumBlueBg,
          text: colors.primary,
          dot: colors.HighAmberText,
        };
      case 'Completed':
        return {
          bg: colors.LowGreenBg,
          text: colors.LowGreenText,
          dot: colors.HighAmberText,
        };
      case 'Todo':
        return {
          bg: colors.Slate100,
          text: colors.MutedSlateGray,
          dot: colors.primary,
        };
      case 'Review':
        return {
          bg: colors.CriticalRedBg,
          text: colors.CriticalRedText,
          dot: colors.LowGreenText,
        };
      default:
        return {
          bg: colors.Slate100,
          text: colors.MutedSlateGray,
          dot: colors.MutedSlateGray,
        };
    }
  };