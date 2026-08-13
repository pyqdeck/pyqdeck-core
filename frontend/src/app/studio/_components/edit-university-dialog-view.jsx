'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { UniversityForm } from './university-form';

export function EditUniversityDialogView({
  university,
  open,
  onOpenChange,
  form,
  onSubmit,
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="font-roboto flex flex-col gap-0 overflow-hidden border-l p-0 shadow-none sm:max-w-[500px]">
        <SheetHeader className="bg-muted/5 border-b p-6">
          <SheetTitle className="text-2xl font-black tracking-tight">
            Edit University
          </SheetTitle>
          <SheetDescription>
            Update the institution profile for {university?.name}.
          </SheetDescription>
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="p-6">
            <form
              id="edit-university-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 pb-24"
            >
              <UniversityForm form={form} />
            </form>
          </div>
        </div>

        <SheetFooter className="bg-muted/10 flex-row items-center gap-3 border-t p-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 border font-bold"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="edit-university-form"
            disabled={form.formState.isSubmitting}
            className="flex-1 font-bold"
          >
            {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
