'use client';

import * as React from 'react';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApi } from '@/hooks/use-api';
import { Button } from '@/components/ui/button';
import { Plus, Settings2, RefreshCcw } from 'lucide-react';
import { SyllabusTable } from './syllabus-table';
import { EditSyllabusDialog } from './edit-syllabus-dialog';
import { StudioSearch } from './studio-search';
import { DropdownAction } from '@/components/dropdown-action';
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export function SyllabusManagement({
  offerings = [],
  currentOfferingId,
  syllabus,
  modules = [],
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const api = useApi();

  const [loading, setLoading] = useState(false);
  const [editingSyllabus, setEditingSyllabus] = useState(null);

  const search = searchParams.get('q') || '';

  // Filter offerings based on search for the pill filters
  const filteredOfferings = offerings.filter((off) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      off.subjectId?.name?.toLowerCase().includes(searchLower) ||
      off.universityId?.shortName?.toLowerCase().includes(searchLower) ||
      off.branchId?.shortName?.toLowerCase().includes(searchLower)
    );
  });

  const handleOfferingChange = (id) => {
    const params = new URLSearchParams(searchParams);
    if (id) {
      params.set('offeringId', id);
    } else {
      params.delete('offeringId');
    }
    router.push(`?${params.toString()}`);
  };

  const handleInitializeSyllabus = async () => {
    if (!currentOfferingId) return;
    setLoading(true);
    try {
      await api.syllabus.createSyllabus({
        subjectOfferingId: currentOfferingId,
        description: '',
      });
      router.refresh();
    } catch (error) {
      console.error('Failed to initialize syllabus:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSyllabusUpdate = async (id, data) => {
    try {
      await api.syllabus.updateSyllabus(id, data);
      router.refresh();
    } catch (error) {
      console.error('Failed to update syllabus:', error);
    }
  };

  const handleModuleAdd = async (data) => {
    try {
      await api.modules.createModule(data);
      router.refresh();
    } catch (error) {
      console.error('Failed to add module:', error);
    }
  };

  const handleModuleUpdate = async (id, data) => {
    try {
      await api.modules.updateModule(id, data);
      router.refresh();
    } catch (error) {
      console.error('Failed to update module:', error);
    }
  };

  const handleModuleDelete = async (id) => {
    try {
      await api.modules.deleteModule(id);
      router.refresh();
    } catch (error) {
      console.error('Failed to delete module:', error);
    }
  };

  const handleTopicAdd = async (data) => {
    try {
      await api.topics.createTopic(data);
      router.refresh();
    } catch (error) {
      console.error('Failed to add topic:', error);
    }
  };

  const handleTopicUpdate = async (id, data) => {
    try {
      await api.topics.updateTopic(id, data);
      router.refresh();
    } catch (error) {
      console.error('Failed to update topic:', error);
    }
  };

  const handleTopicDelete = async (id) => {
    try {
      await api.topics.deleteTopic(id);
      router.refresh();
    } catch (error) {
      console.error('Failed to delete topic:', error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-roboto text-foreground text-3xl font-bold tracking-tight">
            Syllabus Builder
          </h1>
          <p className="text-muted-foreground font-roboto">
            Design and structure curriculum modules and learning topics.
          </p>
        </div>
        <div className="flex w-full items-center gap-2 sm:w-auto sm:gap-3">
          <StudioSearch
            placeholder="Filter offerings..."
            paramName="q"
            initialValue={search}
          />

          <DropdownAction label="Management" tooltip="Syllabus Actions">
            {currentOfferingId && !syllabus && (
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  handleInitializeSyllabus();
                }}
                disabled={loading}
                className="cursor-pointer rounded-md py-2.5 focus:bg-transparent"
              >
                <Plus
                  className={cn(
                    'text-muted-foreground mr-3 size-4 transition-colors',
                    loading && 'animate-spin'
                  )}
                />
                <span className="font-medium">
                  {loading ? 'Initializing...' : 'Initialize Syllabus'}
                </span>
              </DropdownMenuItem>
            )}

            {syllabus && (
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  setEditingSyllabus(syllabus);
                }}
                className="cursor-pointer rounded-md py-2.5 focus:bg-transparent"
              >
                <Settings2 className="text-muted-foreground mr-3 size-4 transition-colors" />
                <span className="font-medium">Syllabus Settings</span>
              </DropdownMenuItem>
            )}

            <DropdownMenuSeparator className="my-1 border-b" />

            <DropdownMenuItem
              onClick={() => router.refresh()}
              className="cursor-pointer rounded-md py-2.5 focus:bg-transparent"
            >
              <RefreshCcw className="text-muted-foreground mr-3 size-4 transition-colors" />
              <span className="font-medium">Refresh Data</span>
            </DropdownMenuItem>
          </DropdownAction>
        </div>
      </div>

      {/* Offering Pill Filters */}
      <div className="hide-scrollbar flex flex-wrap items-center gap-1.5 overflow-x-auto pb-2">
        <Button
          variant={!currentOfferingId ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleOfferingChange(null)}
          className={cn(
            'font-roboto h-8 rounded-full border px-3.5 text-xs font-bold transition-all',
            currentOfferingId && 'text-muted-foreground hover:text-foreground'
          )}
        >
          Select Offering
        </Button>
        {filteredOfferings.map((off) => {
          const id = off.id || off._id;
          const isActive = currentOfferingId === id;
          return (
            <Button
              key={id}
              variant={isActive ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleOfferingChange(id)}
              className={cn(
                'font-roboto h-8 shrink-0 rounded-full border px-3.5 text-xs font-bold transition-all',
                !isActive && 'text-muted-foreground hover:text-foreground'
              )}
            >
              {off.subjectId?.name} (Sem {off.semesterId?.number})
            </Button>
          );
        })}
      </div>

      {/* Main Content Area */}
      {currentOfferingId ? (
        syllabus ? (
          <SyllabusTable
            syllabus={syllabus}
            modules={modules}
            onModuleAdd={handleModuleAdd}
            onModuleUpdate={handleModuleUpdate}
            onModuleDelete={handleModuleDelete}
            onTopicAdd={handleTopicAdd}
            onTopicUpdate={handleTopicUpdate}
            onTopicDelete={handleTopicDelete}
          />
        ) : (
          <div className="border-border/50 bg-muted/5 flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed py-20">
            <div className="bg-muted text-muted-foreground flex h-16 w-16 items-center justify-center rounded-2xl">
              <Plus className="h-8 w-8" />
            </div>
            <div className="space-y-1 text-center">
              <h3 className="font-roboto text-lg font-bold">
                No Syllabus Found
              </h3>
              <p className="text-muted-foreground font-roboto mx-auto max-w-xs text-sm">
                This offering doesn&apos;t have a syllabus structure yet.
                Initialize it to start adding modules.
              </p>
            </div>
            <Button
              onClick={handleInitializeSyllabus}
              disabled={loading}
              className="font-roboto h-10 border font-bold"
            >
              {loading ? (
                <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="mr-2 h-4 w-4" />
              )}
              Initialize Structure
            </Button>
          </div>
        )
      ) : (
        <div className="border-border/50 bg-muted/5 flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed py-20">
          <div className="bg-muted text-muted-foreground flex h-16 w-16 items-center justify-center rounded-2xl">
            <Settings2 className="h-8 w-8" />
          </div>
          <div className="space-y-1 text-center">
            <h3 className="font-roboto text-lg font-bold">Get Started</h3>
            <p className="text-muted-foreground font-roboto mx-auto max-w-xs text-sm">
              Select an academic offering from the filters above to manage its
              curriculum structure.
            </p>
          </div>
        </div>
      )}

      {/* Dialogs */}
      <EditSyllabusDialog
        syllabus={editingSyllabus}
        open={!!editingSyllabus}
        onOpenChange={(open) => !open && setEditingSyllabus(null)}
        onUpdate={handleSyllabusUpdate}
      />
    </div>
  );
}
