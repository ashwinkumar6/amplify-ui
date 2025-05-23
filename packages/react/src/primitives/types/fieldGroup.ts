import type { BaseFlexProps } from './flex';
import type { FieldVariations } from './field';
import type { ElementType, PrimitiveProps } from './view';

export type FieldGroupOrientation = 'horizontal' | 'vertical';

/** @deprecated For internal use only */
export interface BaseFieldGroupOptions extends BaseFlexProps {
  children?: React.ReactNode;
  orientation?: FieldGroupOrientation;
  outerStartComponent?: React.ReactNode;
  outerEndComponent?: React.ReactNode;
  innerStartComponent?: React.ReactNode;
  innerEndComponent?: React.ReactNode;
  variation?: FieldVariations;
}

export type FieldGroupOptions<Element extends ElementType = 'div'> =
  PrimitiveProps<BaseFieldGroupOptions, Element>;
