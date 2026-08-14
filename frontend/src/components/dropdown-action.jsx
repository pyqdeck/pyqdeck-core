'use client';

import * as React from 'react';
import { MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

/**
 * A reusable action menu that combines a DropdownMenu with an optional Tooltip.
 *
 * @param {Object} props
 * @param {string} [props.label] - Optional header label for the menu.
 * @param {string} [props.tooltip] - Optional tooltip text for the trigger button.
 * @param {React.ReactNode} [props.trigger] - Custom trigger element. Defaults to a MoreVertical icon button.
 * @param {React.ReactNode} props.children - Menu items.
 * @param {string} [props.align="end"] - Alignment of the dropdown content.
 * @param {string} [props.contentClassName] - Additional classes for the dropdown content.
 * @param {boolean} [props.showSeparator=true] - Whether to show a separator after the label.
 */
export function DropdownAction({
  label,
  tooltip,
  trigger,
  children,
  align = 'end',
  contentClassName,
  showSeparator = true,
}) {
  const menuTrigger = trigger || (
    <Button
      variant="outline"
      size="icon"
      className="h-8 w-8 border shadow-none"
    >
      <MoreVertical className="h-4 w-4" />
      <span className="sr-only">Open actions</span>
    </Button>
  );

  const menuContent = (
    <DropdownMenuContent
      align={align}
      className={cn(
        'font-roboto w-56 border p-2 shadow-none',
        contentClassName
      )}
    >
      {label && (
        <>
          <DropdownMenuLabel className="text-muted-foreground px-2 py-1.5 text-xs font-semibold tracking-wider uppercase">
            {label}
          </DropdownMenuLabel>
          {showSeparator && <DropdownMenuSeparator className="my-1 border-b" />}
        </>
      )}
      {children}
    </DropdownMenuContent>
  );

  const dropdown = (
    <DropdownMenu>
      {tooltip ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>{menuTrigger}</DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent className="font-roboto font-bold">
              {tooltip}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <DropdownMenuTrigger asChild>{menuTrigger}</DropdownMenuTrigger>
      )}
      {menuContent}
    </DropdownMenu>
  );

  return dropdown;
}
