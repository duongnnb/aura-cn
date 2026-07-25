import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { ComponentPreview } from './component-preview';
import { InstallCommand } from './install-command';
import { ButtonPlayground } from './playgrounds';
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
  MotionDemo,
  CommandDemo,
  PopoverDemo,
  TableDemo,
  DatePickerDemo,
} from './demos';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ComponentPreview,
    InstallCommand,
    ButtonPlayground,
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
    MotionDemo,
    CommandDemo,
    PopoverDemo,
    TableDemo,
    DatePickerDemo,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
