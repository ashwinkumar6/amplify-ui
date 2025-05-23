import type { ElementType, PrimitiveProps, BaseViewProps } from './view';

/** @deprecated For internal use only */
export interface BaseLabelProps extends BaseViewProps {
  /**
   * @description
   * Whether label should be visually hidden
   */
  visuallyHidden?: boolean;

  /**
   * @description
   * Inner text of the label
   */
  children: React.ReactNode;
}

export type LabelProps<Element extends ElementType = 'label'> = PrimitiveProps<
  BaseLabelProps,
  Element
>;
