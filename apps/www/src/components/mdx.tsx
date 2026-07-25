import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { ComponentPreview } from './component-preview';
import {
  ButtonDemo,
  CardDemo,
  InputDemo,
  TextareaDemo,
  SelectDemo,
  ToggleDemo,
  CheckboxRadioDemo,
  ChipDemo,
  SliderDemo,
  TabsDemo,
  AvatarDemo,
  ProgressDemo,
  AccordionDemo,
  SkeletonDemo,
  ToastDemo,
  BadgeDemo,
  ModalDemo,
  DropdownDemo,
  TooltipDemo,
  DrawerDemo,
  FABDemo,
} from './demos';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ComponentPreview,
    ButtonDemo,
    CardDemo,
    InputDemo,
    TextareaDemo,
    SelectDemo,
    ToggleDemo,
    CheckboxRadioDemo,
    ChipDemo,
    SliderDemo,
    TabsDemo,
    AvatarDemo,
    ProgressDemo,
    AccordionDemo,
    SkeletonDemo,
    ToastDemo,
    BadgeDemo,
    ModalDemo,
    DropdownDemo,
    TooltipDemo,
    DrawerDemo,
    FABDemo,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
