'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { EditModuleDialogView } from './edit-module-dialog.view';

const moduleSchema = z.object({
  moduleNumber: z.number().int().min(1, 'Must be at least 1'),
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(1000).optional().nullable(),
  weightage: z.number().min(0).max(100).optional().nullable(),
  coMapping: z.string().max(50).optional().nullable(),
});

export function EditModuleDialog({ module, open, onOpenChange, onUpdate }) {
  const form = useForm({
    resolver: zodResolver(moduleSchema),
    defaultValues: {
      moduleNumber: module?.moduleNumber || 1,
      title: module?.title || '',
      description: module?.description || '',
      weightage: module?.weightage || 0,
      coMapping: module?.coMapping || '',
    },
  });

  const { reset } = form;

  // Reset form when module changes or dialog opens
  React.useEffect(() => {
    if (open && module) {
      reset({
        moduleNumber: module.moduleNumber,
        title: module.title,
        description: module.description || '',
        weightage: module.weightage || 0,
        coMapping: module.coMapping || '',
      });
    }
  }, [open, module, reset]);

  const onSubmit = async (data) => {
    try {
      await onUpdate(module.id || module._id, data);
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to update module:', error);
    }
  };

  return (
    <EditModuleDialogView
      form={form}
      onSubmit={onSubmit}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
}
