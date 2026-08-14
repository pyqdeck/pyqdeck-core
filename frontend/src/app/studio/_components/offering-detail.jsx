'use client';

import * as React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useApi } from '@/hooks/use-api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Plus, RefreshCcw } from 'lucide-react';
import { StudioBreadcrumb } from './studio-breadcrumb';
import { SyllabusTable } from './syllabus-table';
import { EditSyllabusDialog } from './edit-syllabus-dialog';
import { PapersTable } from './papers-table';
import { PaperFormDialog } from './paper-form-dialog';

export function OfferingDetail({
  university,
  branch,
  semester,
  offering,
  subject,
  syllabus,
  modules = [],
  papers = [],
  initialTab = 'syllabus',
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const api = useApi();

  const [tab, setTab] = React.useState(initialTab);
  const [initializing, setInitializing] = React.useState(false);
  const [editingSyllabus, setEditingSyllabus] = React.useState(null);
  const [addPaperOpen, setAddPaperOpen] = React.useState(false);

  const semesterLabel = semester.title || `Semester ${semester.number}`;
  const semesterHref = `/studio/universities/${university.id}/branches/${branch.id}/semesters/${semester.id}`;

  const handleTabChange = (value) => {
    setTab(value);
    const params = new URLSearchParams(searchParams);
    params.set('tab', value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleInitializeSyllabus = async () => {
    setInitializing(true);
    try {
      await api.syllabus.createSyllabus({
        subjectOfferingId: offering.id,
        description: '',
      });
      router.refresh();
    } catch (error) {
      console.error('Failed to initialize syllabus:', error);
    } finally {
      setInitializing(false);
    }
  };

  const handleSyllabusUpdate = async (id, data) => {
    await api.syllabus.updateSyllabus(id, data);
    router.refresh();
  };

  const handleModuleAdd = async (data) => {
    await api.modules.createModule(data);
    router.refresh();
  };
  const handleModuleUpdate = async (id, data) => {
    await api.modules.updateModule(id, data);
    router.refresh();
  };
  const handleModuleDelete = async (id) => {
    await api.modules.deleteModule(id);
    router.refresh();
  };
  const handleTopicAdd = async (data) => {
    await api.topics.createTopic(data);
    router.refresh();
  };
  const handleTopicUpdate = async (id, data) => {
    await api.topics.updateTopic(id, data);
    router.refresh();
  };
  const handleTopicDelete = async (id) => {
    await api.topics.deleteTopic(id);
    router.refresh();
  };

  const handlePaperAdd = async (data) => {
    await api.papers.createPaper(data);
    router.refresh();
  };
  const handlePaperUpdate = async (id, data) => {
    await api.papers.updatePaper(id, data);
    router.refresh();
  };
  const handlePaperDelete = async (id) => {
    await api.papers.deletePaper(id);
    router.refresh();
  };
  const handlePaperSetStatus = async (paper, status) => {
    await api.papers.updatePaperStatus(paper.id, { status });
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-6">
      <StudioBreadcrumb
        trail={[
          {
            label: university.name,
            href: `/studio/universities/${university.id}`,
          },
          {
            label: branch.name,
            href: `/studio/universities/${university.id}/branches/${branch.id}`,
          },
          { label: semesterLabel, href: semesterHref },
          { label: subject?.name || 'Offering' },
        ]}
      />

      <div>
        <h1 className="font-roboto text-foreground text-3xl font-bold tracking-tight">
          {subject?.name || 'Untitled Subject'}
        </h1>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {offering.regulation && (
            <Badge variant="outline">{offering.regulation}</Badge>
          )}
          {offering.academicYear && (
            <Badge variant="outline">{offering.academicYear}</Badge>
          )}
        </div>
      </div>

      <Tabs value={tab} onValueChange={handleTabChange}>
        <TabsList variant="pill" className="w-fit">
          <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
          <TabsTrigger value="papers">Papers</TabsTrigger>
        </TabsList>

        <TabsContent value="syllabus" className="mt-4">
          {syllabus ? (
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
            <Empty className="border-border/50 rounded-xl border">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Plus />
                </EmptyMedia>
                <EmptyTitle className="font-roboto text-base font-bold">
                  No syllabus yet
                </EmptyTitle>
                <EmptyDescription className="font-roboto">
                  This offering doesn&apos;t have a syllabus structure yet.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button
                  onClick={handleInitializeSyllabus}
                  disabled={initializing}
                  className="font-roboto h-10 border font-bold shadow-none"
                >
                  {initializing ? (
                    <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="mr-2 h-4 w-4" />
                  )}
                  Initialize Structure
                </Button>
              </EmptyContent>
            </Empty>
          )}

          <EditSyllabusDialog
            syllabus={editingSyllabus}
            open={!!editingSyllabus}
            onOpenChange={(open) => !open && setEditingSyllabus(null)}
            onUpdate={handleSyllabusUpdate}
          />
        </TabsContent>

        <TabsContent value="papers" className="mt-4 flex flex-col gap-4">
          <div className="flex justify-end">
            <Button
              onClick={() => setAddPaperOpen(true)}
              className="font-roboto bg-primary hover:bg-primary/90 border font-bold shadow-none"
            >
              <Plus className="h-4 w-4" /> Add Paper
            </Button>
          </div>
          <PapersTable
            papers={papers}
            offering={offering}
            onUpdate={handlePaperUpdate}
            onDelete={handlePaperDelete}
            onSetStatus={handlePaperSetStatus}
          />
          <PaperFormDialog
            offering={offering}
            existingPapers={papers}
            open={addPaperOpen}
            onOpenChange={setAddPaperOpen}
            onSubmit={handlePaperAdd}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
