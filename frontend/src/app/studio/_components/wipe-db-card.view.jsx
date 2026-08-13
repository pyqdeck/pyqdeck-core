'use client';

import * as React from 'react';
import { Trash2Icon, AlertTriangleIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export function WipeDbCardView({ isWiping, onWipe }) {
  return (
    <Card className="border-destructive/50 font-roboto flex h-full flex-col">
      <CardHeader>
        <CardTitle className="text-destructive flex items-center gap-2">
          <Trash2Icon className="h-5 w-5" />
          Wipe Database Content
        </CardTitle>
        <CardDescription>
          Deletes all subjects, universities, papers, and solutions.
          <br />
          <span className="text-destructive font-bold">
            User accounts and settings will be preserved.
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="bg-destructive/10 text-destructive-foreground rounded-lg p-3 text-sm">
          <div className="flex gap-2">
            <AlertTriangleIcon className="h-5 w-5 shrink-0" />
            <p>
              This action is irreversible. All academic data will be permanently
              removed from the platform.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="w-full font-bold"
              disabled={isWiping}
            >
              {isWiping ? 'Wiping...' : 'Perform Full Content Wipe'}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="font-roboto">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will delete all content data across the entire platform.
                Users will still be able to log in, but they will find no
                subjects or papers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="font-bold">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={onWipe}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-bold"
              >
                Yes, Wipe Everything
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
