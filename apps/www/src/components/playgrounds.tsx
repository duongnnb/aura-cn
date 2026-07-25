"use client";

import * as React from "react";
import { Playground, type PlaygroundControl } from "./playground";
import { AuraButton } from "@/registry/aura-cn/aura-button";

const buttonControls: PlaygroundControl[] = [
  {
    name: "variant",
    type: "select",
    options: ["default", "primary", "accent", "outline", "ghost", "secondary"],
    defaultValue: "default",
  },
  {
    name: "size",
    type: "select",
    options: ["sm", "default", "lg", "icon"],
    defaultValue: "default",
  },
  {
    name: "label",
    type: "text",
    defaultValue: "Click me",
  },
  {
    name: "enableGlow",
    type: "boolean",
    defaultValue: true,
  },
];

export function ButtonPlayground() {
  return (
    <Playground controls={buttonControls}>
      {(props) => (
        <AuraButton
          variant={props.variant as "default"}
          size={props.size as "default"}
          enableGlow={props.enableGlow as boolean}
        >
          {(props.label as string) || "Click me"}
        </AuraButton>
      )}
    </Playground>
  );
}
