import { AddOfferingDialogView } from './add-offering-dialog.view';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { fn } from '@storybook/test';

const offeringSchema = z.object({
  universityId: z.string().min(1, 'University is required'),
  branchId: z.string().min(1, 'Branch is required'),
  semesterId: z.string().min(1, 'Semester is required'),
  subjectId: z.string().min(1, 'Subject is required'),
  regulation: z.string().min(1, 'Regulation is required').max(20),
  academicYear: z.string().optional(),
  slug: z.string().min(1, 'Slug is required'),
  isActive: z.boolean().default(true),
});

const meta = {
  title: 'Studio/Academics/AddOfferingDialog',
  component: AddOfferingDialogView,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the dialog is open',
      table: { defaultValue: { summary: 'false' } },
    },
    onOpenChange: {
      description: 'Callback when open state changes',
    },
    onSubmit: {
      description: 'Callback when form is submitted',
    },
    university: {
      description: 'The university this offering is scoped to',
    },
    branch: {
      description: 'The branch this offering is scoped to',
    },
    semester: {
      description: 'The semester this offering is scoped to',
    },
    subjects: {
      description: 'List of available subjects',
    },
    trigger: {
      control: 'boolean',
      description: 'Whether to show the trigger button',
      table: { defaultValue: { summary: 'true' } },
    },
  },
};

export default meta;

const FormWrapper = ({ mockSubmitting = false, ...args }) => {
  const form = useForm({
    resolver: zodResolver(offeringSchema),
    defaultValues: {
      universityId: '',
      branchId: '',
      semesterId: '',
      subjectId: '',
      regulation: '',
      academicYear: '',
      slug: '',
      isActive: true,
    },
  });

  const proxiedForm = {
    ...form,
    formState: {
      ...form.formState,
      errors: form.formState.errors,
      isSubmitting: mockSubmitting,
    },
  };

  return <AddOfferingDialogView {...args} form={proxiedForm} />;
};

const mockUniversity = {
  id: 'u1',
  name: 'University of Mumbai',
  shortName: 'MU',
};

const mockBranch = {
  id: 'b1',
  name: 'Computer Engineering',
  shortName: 'COMP',
  universityId: 'u1',
};

const mockSemester = { id: 's1', number: 5, branchId: 'b1' };

const mockSubjects = [
  {
    id: 'sub1',
    name: 'Data Structures',
    subjectCode: 'CS301',
    slug: 'data-structures',
  },
  {
    id: 'sub2',
    name: 'Operating Systems',
    subjectCode: 'CS401',
    slug: 'operating-systems',
  },
  {
    id: 'sub3',
    name: 'Thermodynamics',
    subjectCode: 'ME201',
    slug: 'thermodynamics',
  },
];

export const Default = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    open: true,
    onOpenChange: fn(),
    onSubmit: fn(),
    university: mockUniversity,
    branch: mockBranch,
    semester: mockSemester,
    subjects: mockSubjects,
  },
};

export const Submitting = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    ...Default.args,
    mockSubmitting: true,
  },
};
