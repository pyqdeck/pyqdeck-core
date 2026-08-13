'use client';

import * as React from 'react';
import { useState } from 'react';
import { SyllabusTableView } from './syllabus-table-view';
import { EditModuleDialog } from './edit-module-dialog';
import { EditTopicDialog } from './edit-topic-dialog';
import { AddTopicDialog } from './add-topic-dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export function SyllabusTable({
  syllabus,
  modules = [],
  onModuleAdd,
  onModuleUpdate,
  onModuleDelete,
  onTopicAdd,
  onTopicUpdate,
  onTopicDelete,
}) {
  const [editingModule, setEditingModule] = useState(null);
  const [editingTopic, setEditingTopic] = useState(null);
  const [addingTopicModule, setAddingTopicModule] = useState(null);
  const [deletingModule, setDeletingModule] = useState(null);
  const [deletingTopic, setDeletingTopic] = useState(null);

  const handleConfirmModuleDelete = async () => {
    if (!deletingModule) return;
    const moduleId = deletingModule.id || deletingModule._id;
    await onModuleDelete(moduleId);
    setDeletingModule(null);
  };

  const handleConfirmTopicDelete = async () => {
    if (!deletingTopic) return;
    const topicId = deletingTopic.id || deletingTopic._id;
    await onTopicDelete(topicId);
    setDeletingTopic(null);
  };

  const handleTopicAddSubmit = async (data) => {
    await onTopicAdd(data);
    setAddingTopicModule(null);
  };

  return (
    <>
      <SyllabusTableView
        syllabus={syllabus}
        modules={modules}
        onModuleAdd={onModuleAdd}
        onTopicAdd={(mod) => setAddingTopicModule(mod)}
        onEditModule={setEditingModule}
        onDeleteModule={setDeletingModule}
        onEditTopic={setEditingTopic}
        onDeleteTopic={setDeletingTopic}
      />

      {/* Edit Module Dialog */}
      <EditModuleDialog
        module={editingModule}
        open={!!editingModule}
        onOpenChange={(open) => !open && setEditingModule(null)}
        onUpdate={onModuleUpdate}
      />

      {/* Edit Topic Dialog */}
      <EditTopicDialog
        topic={editingTopic}
        open={!!editingTopic}
        onOpenChange={(open) => !open && setEditingTopic(null)}
        onUpdate={onTopicUpdate}
      />

      {/* Add Topic Dialog */}
      <AddTopicDialog
        moduleId={addingTopicModule?.id || addingTopicModule?._id}
        open={!!addingTopicModule}
        onOpenChange={(open) => !open && setAddingTopicModule(null)}
        onAdd={handleTopicAddSubmit}
      />

      {/* Delete Module AlertDialog */}
      <AlertDialog
        open={!!deletingModule}
        onOpenChange={(open) => !open && setDeletingModule(null)}
      >
        <AlertDialogContent className="border-border/50 border shadow-none sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-roboto text-xl font-bold">
              Delete Module?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-roboto text-sm">
              This will permanently delete &quot;{deletingModule?.title}&quot;
              and all its associated topics. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-2">
            <AlertDialogCancel className="font-roboto h-10 border font-bold">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmModuleDelete}
              className="font-roboto bg-destructive hover:bg-destructive/90 h-10 border-none font-bold shadow-none"
            >
              Delete Module
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Topic AlertDialog */}
      <AlertDialog
        open={!!deletingTopic}
        onOpenChange={(open) => !open && setDeletingTopic(null)}
      >
        <AlertDialogContent className="border-border/50 border shadow-none sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-roboto text-xl font-bold">
              Remove Topic?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-roboto text-sm">
              This will permanently remove &quot;{deletingTopic?.title}&quot;
              from the module. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-2">
            <AlertDialogCancel className="font-roboto h-10 border font-bold">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmTopicDelete}
              className="font-roboto bg-destructive hover:bg-destructive/90 h-10 border-none font-bold shadow-none"
            >
              Remove Topic
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
