import {
  TagIcon,
  MailIcon,
  ReplyIcon,
  SendIcon,
  ForwardIcon,
  ArchiveIcon,
  MailOpenIcon,
  ShieldCheckIcon,
  WebhookIcon,
  FileTextIcon,
  FolderInputIcon,
  BellIcon,
} from "lucide-react";
import { ActionType } from "@/generated/prisma/enums";

const ACTION_TYPE_COLORS = {
  [ActionType.LABEL]: "bg-info",
  [ActionType.DRAFT_EMAIL]: "bg-success",
  [ActionType.REPLY]: "bg-success",
  [ActionType.SEND_EMAIL]: "bg-primary",
  [ActionType.FORWARD]: "bg-primary",
  [ActionType.ARCHIVE]: "bg-warning",
  [ActionType.MARK_READ]: "bg-warning",
  [ActionType.MARK_SPAM]: "bg-error",
  [ActionType.CALL_WEBHOOK]: "bg-muted-foreground",
  [ActionType.DIGEST]: "bg-info",
  [ActionType.MOVE_FOLDER]: "bg-success",
  [ActionType.NOTIFY_SENDER]: "bg-warning",
} as const;

export const ACTION_TYPE_TEXT_COLORS = {
  [ActionType.LABEL]: "text-info",
  [ActionType.DRAFT_EMAIL]: "text-success",
  [ActionType.REPLY]: "text-success",
  [ActionType.SEND_EMAIL]: "text-primary",
  [ActionType.FORWARD]: "text-primary",
  [ActionType.ARCHIVE]: "text-warning",
  [ActionType.MARK_READ]: "text-warning",
  [ActionType.MARK_SPAM]: "text-error",
  [ActionType.CALL_WEBHOOK]: "text-muted-foreground",
  [ActionType.DIGEST]: "text-info",
  [ActionType.MOVE_FOLDER]: "text-success",
  [ActionType.NOTIFY_SENDER]: "text-warning",
} as const;

export const ACTION_TYPE_ICONS = {
  [ActionType.LABEL]: TagIcon,
  [ActionType.DRAFT_EMAIL]: MailIcon,
  [ActionType.REPLY]: ReplyIcon,
  [ActionType.SEND_EMAIL]: SendIcon,
  [ActionType.FORWARD]: ForwardIcon,
  [ActionType.ARCHIVE]: ArchiveIcon,
  [ActionType.MARK_READ]: MailOpenIcon,
  [ActionType.MARK_SPAM]: ShieldCheckIcon,
  [ActionType.CALL_WEBHOOK]: WebhookIcon,
  [ActionType.DIGEST]: FileTextIcon,
  [ActionType.MOVE_FOLDER]: FolderInputIcon,
  [ActionType.NOTIFY_SENDER]: BellIcon,
} as const;

// Helper function to get action type from string (for RulesPrompt.tsx)
export function getActionTypeColor(example: string): string {
  const lowerExample = example.toLowerCase();

  if (lowerExample.includes("forward")) {
    return ACTION_TYPE_COLORS[ActionType.FORWARD];
  }
  if (lowerExample.includes("draft")) {
    return ACTION_TYPE_COLORS[ActionType.DRAFT_EMAIL];
  }
  if (lowerExample.includes("reply")) {
    return ACTION_TYPE_COLORS[ActionType.REPLY];
  }
  if (lowerExample.includes("archive")) {
    return ACTION_TYPE_COLORS[ActionType.ARCHIVE];
  }
  if (lowerExample.includes("spam")) {
    return ACTION_TYPE_COLORS[ActionType.MARK_SPAM];
  }
  if (lowerExample.includes("mark")) {
    return ACTION_TYPE_COLORS[ActionType.MARK_READ];
  }
  if (lowerExample.includes("label") || lowerExample.includes("categorize")) {
    return ACTION_TYPE_COLORS[ActionType.LABEL];
  }
  if (lowerExample.includes("digest")) {
    return ACTION_TYPE_COLORS[ActionType.DIGEST];
  }
  if (lowerExample.includes("folder")) {
    return ACTION_TYPE_COLORS[ActionType.MOVE_FOLDER];
  }

  // Default fallback
  return "bg-muted-foreground";
}
