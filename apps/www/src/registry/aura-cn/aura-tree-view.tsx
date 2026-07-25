"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ─── Tree View ─── */

export interface TreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
}

interface AuraTreeViewProps {
  nodes: TreeNode[];
  defaultExpanded?: string[];
  onSelect?: (node: TreeNode) => void;
  className?: string;
}

export function AuraTreeView({ nodes, defaultExpanded = [], onSelect, className }: AuraTreeViewProps) {
  return (
    <div className={cn("space-y-0.5 text-sm", className)}>
      {nodes.map((node) => (
        <TreeItem key={node.id} node={node} level={0} defaultExpanded={defaultExpanded} onSelect={onSelect} />
      ))}
    </div>
  );
}

function TreeItem({
  node,
  level,
  defaultExpanded,
  onSelect,
}: {
  node: TreeNode;
  level: number;
  defaultExpanded: string[];
  onSelect?: (node: TreeNode) => void;
}) {
  const [expanded, setExpanded] = React.useState(defaultExpanded.includes(node.id));
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-1.5 rounded-md px-2 py-1 cursor-pointer transition-colors",
          "hover:bg-[var(--bg-surface)] text-[var(--text-primary)]"
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => {
          if (hasChildren) setExpanded(!expanded);
          onSelect?.(node);
        }}
      >
        {/* Expand icon */}
        {hasChildren ? (
          <svg
            className={cn("h-3.5 w-3.5 shrink-0 text-[var(--text-secondary)] transition-transform", expanded && "rotate-90")}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        ) : (
          <span className="w-3.5" />
        )}
        {node.icon && <span className="h-4 w-4 shrink-0">{node.icon}</span>}
        <span className="truncate">{node.label}</span>
      </div>
      {expanded && hasChildren && (
        <div>
          {node.children!.map((child) => (
            <TreeItem key={child.id} node={child} level={level + 1} defaultExpanded={defaultExpanded} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}
