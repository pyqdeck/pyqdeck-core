'use client';

import * as React from 'react';
import { Plus, GraduationCap, Building, BookOpen, Layers } from 'lucide-react';
import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function AddOfferingDialogView({
  universities = [],
  branches = [],
  semesters = [],
  subjects = [],
  form,
  onSubmit,
  open,
  onOpenChange,
  trigger = true,
}) {
  'use no memo';
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors = {}, isSubmitting = false } = {},
  } = form || {};

  const selectedUniId = watch('universityId');
  const selectedBranchId = watch('branchId');

  const filteredBranches = selectedUniId
    ? branches.filter(
        (b) => (b.universityId?.id || b.universityId) === selectedUniId
      )
    : [];

  const filteredSemesters = selectedBranchId
    ? semesters.filter(
        (s) => (s.branchId?.id || s.branchId) === selectedBranchId
      )
    : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <DialogTrigger asChild>
          <Button className="font-roboto bg-primary hover:bg-primary/90 border font-bold shadow-none">
            <Plus className="h-4 w-4" /> New Offering
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="border shadow-none sm:max-w-[550px]">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-3">
            <div className="bg-primary/10 text-primary rounded-lg p-2">
              <Layers className="h-5 w-5" />
            </div>
            <DialogTitle className="font-roboto text-xl font-bold">
              Deploy Subject Offering
            </DialogTitle>
          </div>
          <DialogDescription className="font-roboto text-sm">
            Map a subject to a specific semester, branch, and regulation.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          {/* Hierarchy Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label
                htmlFor="universityId"
                className="font-roboto text-xs font-bold tracking-wider uppercase"
              >
                Institution
              </Label>
              <Controller
                name="universityId"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="font-roboto w-full border focus:ring-0">
                      <SelectValue placeholder="Select University" />
                    </SelectTrigger>
                    <SelectContent className="border shadow-none">
                      {universities.map((uni) => (
                        <SelectItem
                          key={uni.id}
                          value={uni.id}
                          className="font-roboto"
                        >
                          {uni.shortName || uni.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="branchId"
                className="font-roboto text-xs font-bold tracking-wider uppercase"
              >
                Branch
              </Label>
              <Controller
                name="branchId"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!selectedUniId}
                  >
                    <SelectTrigger className="font-roboto w-full border focus:ring-0">
                      <SelectValue placeholder="Select Branch" />
                    </SelectTrigger>
                    <SelectContent className="border shadow-none">
                      {filteredBranches.map((branch) => (
                        <SelectItem
                          key={branch.id}
                          value={branch.id}
                          className="font-roboto"
                        >
                          {branch.shortName || branch.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label
                htmlFor="semesterId"
                className="font-roboto text-xs font-bold tracking-wider uppercase"
              >
                Semester
              </Label>
              <Controller
                name="semesterId"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!selectedBranchId}
                  >
                    <SelectTrigger className="font-roboto w-full border focus:ring-0">
                      <SelectValue placeholder="Select Semester" />
                    </SelectTrigger>
                    <SelectContent className="border shadow-none">
                      {filteredSemesters.map((sem) => (
                        <SelectItem
                          key={sem.id}
                          value={sem.id}
                          className="font-roboto"
                        >
                          Semester {sem.number}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="subjectId"
                className="font-roboto text-xs font-bold tracking-wider uppercase"
              >
                Global Subject
              </Label>
              <Controller
                name="subjectId"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="font-roboto w-full border focus:ring-0">
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent className="border shadow-none">
                      {subjects.map((sub) => (
                        <SelectItem
                          key={sub.id}
                          value={sub.id}
                          className="font-roboto"
                        >
                          {sub.name} ({sub.subjectCode || 'N/A'})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label
                htmlFor="regulation"
                className="font-roboto text-xs font-bold tracking-wider uppercase"
              >
                Regulation
              </Label>
              <Controller
                name="regulation"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="regulation"
                    placeholder="e.g. R2022"
                    className="font-roboto border focus-visible:ring-0"
                  />
                )}
              />
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="academicYear"
                className="font-roboto text-xs font-bold tracking-wider uppercase"
              >
                Academic Year
              </Label>
              <Controller
                name="academicYear"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="academicYear"
                    placeholder="e.g. 2023-24"
                    className="font-roboto border focus-visible:ring-0"
                  />
                )}
              />
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="font-roboto bg-primary hover:bg-primary/90 w-full border font-bold shadow-none"
            >
              {isSubmitting ? 'Deploying...' : 'Confirm Offering'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
