'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const SCOPE_LEVELS = [
  { value: 'global', label: 'Global (everywhere)' },
  { value: 'university', label: 'University' },
  { value: 'branch', label: 'Branch' },
  { value: 'semester', label: 'Semester' },
  { value: 'subjectOffering', label: 'Subject Offering' },
];

const CAPABILITIES = [
  { value: 'content:create', label: 'Create content' },
  { value: 'content:edit', label: 'Edit content' },
  { value: 'content:moderate', label: 'Approve / reject papers' },
  { value: 'content:delete', label: 'Delete content' },
];

const SHOW_UNIVERSITY = ['university', 'branch', 'semester', 'subjectOffering'];
const SHOW_BRANCH = ['branch', 'semester', 'subjectOffering'];
const SHOW_SEMESTER = ['semester', 'subjectOffering'];
const SHOW_OFFERING = ['subjectOffering'];

export function RequestPermissionDialogView({
  open,
  onOpenChange,
  templates = [],
  scopeLevel,
  onScopeLevelChange,
  templateValue,
  onTemplateChange,
  capabilities,
  onToggleCapability,
  reason,
  onReasonChange,
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
  isReady,
  isSubmitting,
  onSubmit,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border shadow-none sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="font-roboto text-xl font-bold">
            Request Access
          </DialogTitle>
          <DialogDescription className="font-roboto">
            Ask an admin for access to a specific part of the content tree.
            They&apos;ll review it before anything is granted.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label className="font-roboto font-bold">Scope</Label>
            <Select value={scopeLevel} onValueChange={onScopeLevelChange}>
              <SelectTrigger className="font-roboto w-full border focus:ring-0">
                <SelectValue placeholder="Select a scope" />
              </SelectTrigger>
              <SelectContent className="border shadow-none">
                {SCOPE_LEVELS.map((level) => (
                  <SelectItem
                    key={level.value}
                    value={level.value}
                    className="font-roboto"
                  >
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {SHOW_UNIVERSITY.includes(scopeLevel) && (
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
          )}

          {SHOW_BRANCH.includes(scopeLevel) && (
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
          )}

          {SHOW_SEMESTER.includes(scopeLevel) && (
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
          )}

          {SHOW_OFFERING.includes(scopeLevel) && (
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
                      {offering.subjectId?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid gap-2">
            <Label className="font-roboto font-bold">Role</Label>
            <Select value={templateValue} onValueChange={onTemplateChange}>
              <SelectTrigger className="font-roboto w-full border focus:ring-0">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent className="border shadow-none">
                {templates.map((template) => (
                  <SelectItem
                    key={template.value}
                    value={template.value}
                    className="font-roboto"
                  >
                    {template.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label className="font-roboto font-bold">Permissions</Label>
            <div className="grid gap-2.5">
              {CAPABILITIES.map((cap) => (
                <label
                  key={cap.value}
                  className="font-roboto flex items-center gap-2 text-sm"
                >
                  <Checkbox
                    checked={capabilities.includes(cap.value)}
                    onCheckedChange={() => onToggleCapability(cap.value)}
                  />
                  {cap.label}
                </label>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="request-reason" className="font-roboto font-bold">
              Why do you need this?{' '}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </Label>
            <Textarea
              id="request-reason"
              rows={3}
              placeholder="e.g. I'm reviewing submissions for CSE Semester 4 this term."
              className="font-roboto border focus-visible:ring-0"
              value={reason}
              onChange={(e) => onReasonChange(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            disabled={!isReady || isSubmitting}
            onClick={onSubmit}
            className="font-roboto w-full border font-bold shadow-none"
          >
            {isSubmitting ? 'Submitting…' : 'Submit Request'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
