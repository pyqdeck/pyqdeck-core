'use client';

import * as React from 'react';
import { Plus } from 'lucide-react';

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
import { Label } from '@/components/ui/label';

function offeringLabel(offering) {
  const subjectName = offering.subjectId?.name || 'Untitled subject';
  return offering.regulation
    ? `${subjectName} (${offering.regulation})`
    : subjectName;
}

export function AddPaperDialogView({
  open,
  onOpenChange,
  universities = [],
  branches = [],
  semesters = [],
  offerings = [],
  universityId,
  branchId,
  semesterId,
  offeringId,
  onUniversityChange,
  onBranchChange,
  onSemesterChange,
  onOfferingChange,
  onContinue,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="none"
          className="font-roboto hover:bg-primary hover:text-primary-foreground flex w-full items-center justify-start gap-2 border px-3 py-2 font-bold shadow-none transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Paper</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="border shadow-none sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="font-roboto text-xl font-bold">
            Select Subject Offering
          </DialogTitle>
          <DialogDescription className="font-roboto">
            Choose which university, branch, semester, and subject this paper
            belongs to.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-5">
          <div className="grid gap-2">
            <Label className="font-roboto font-bold">University</Label>
            <Select value={universityId} onValueChange={onUniversityChange}>
              <SelectTrigger className="font-roboto w-full border focus:ring-0">
                <SelectValue placeholder="Select a university" />
              </SelectTrigger>
              <SelectContent className="border shadow-none">
                {universities.map((university) => (
                  <SelectItem
                    key={university.id}
                    value={university.id}
                    className="font-roboto"
                  >
                    {university.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label className="font-roboto font-bold">Branch</Label>
            <Select
              value={branchId}
              onValueChange={onBranchChange}
              disabled={!universityId}
            >
              <SelectTrigger className="font-roboto w-full border focus:ring-0">
                <SelectValue placeholder="Select a branch" />
              </SelectTrigger>
              <SelectContent className="border shadow-none">
                {branches.map((branch) => (
                  <SelectItem
                    key={branch.id}
                    value={branch.id}
                    className="font-roboto"
                  >
                    {branch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label className="font-roboto font-bold">Semester</Label>
            <Select
              value={semesterId}
              onValueChange={onSemesterChange}
              disabled={!branchId}
            >
              <SelectTrigger className="font-roboto w-full border focus:ring-0">
                <SelectValue placeholder="Select a semester" />
              </SelectTrigger>
              <SelectContent className="border shadow-none">
                {semesters.map((semester) => (
                  <SelectItem
                    key={semester.id}
                    value={semester.id}
                    className="font-roboto"
                  >
                    {semester.title || `Semester ${semester.number}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label className="font-roboto font-bold">Subject</Label>
            <Select
              value={offeringId}
              onValueChange={onOfferingChange}
              disabled={!semesterId}
            >
              <SelectTrigger className="font-roboto w-full border focus:ring-0">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent className="border shadow-none">
                {offerings.map((offering) => (
                  <SelectItem
                    key={offering.id}
                    value={offering.id}
                    className="font-roboto"
                  >
                    {offeringLabel(offering)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            disabled={!offeringId}
            onClick={onContinue}
            className="font-roboto w-full border font-bold shadow-none"
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
