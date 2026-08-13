'use client';

import * as React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BranchForm } from './branch-form';

export function AddBranchDialogView({
  universities = [],
  form,
  onSubmit,
  open,
  onOpenChange,
  trigger = true,
}) {
  const { handleSubmit, formState: { isSubmitting = false } = {} } = form || {};

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <SheetTrigger asChild>
          <Button
            variant="none"
            className="font-roboto hover:bg-primary hover:text-primary-foreground flex w-full items-center justify-start gap-2 border px-4 py-2 font-bold shadow-none transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Branch</span>
          </Button>
        </SheetTrigger>
      )}
      <SheetContent className="flex w-full flex-col gap-0 overflow-hidden border-l p-0 shadow-none sm:max-w-md">
        <SheetHeader className="shrink-0 border-b p-4 sm:p-6">
          <SheetTitle className="font-roboto text-xl font-bold">
            Add New Branch
          </SheetTitle>
          <SheetDescription className="font-roboto">
            Create a new academic branch for a specific university.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="min-h-0 flex-1">
          <form
            id="add-branch-form"
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 sm:p-6"
          >
            <BranchForm
              form={form}
              universities={universities}
              showUniversitySelect={true}
            />
          </form>
        </ScrollArea>

        <SheetFooter className="bg-muted/10 shrink-0 border-t p-4 sm:p-6">
          <Button
            type="submit"
            form="add-branch-form"
            disabled={isSubmitting}
            className="font-roboto w-full border font-bold shadow-none"
          >
            {isSubmitting ? 'Creating Branch...' : 'Create Branch'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
