import * as React from 'react';
import { classNames } from '@aws-amplify/ui';

import { classNameModifier } from '../shared/utils';
import { ComponentClassName, classNameModifierByFlag } from '@aws-amplify/ui';
import type { BaseLoaderProps, LoaderProps } from '../types/loader';
import type { ForwardRefPrimitive, Primitive } from '../types/view';
import { View } from '../View';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

export const LINEAR_EMPTY = 'linear-empty';
export const LINEAR_FILLED = 'linear-filled';
export const CIRCULAR_EMPTY = 'circular-empty';
export const CIRCULAR_FILLED = 'circular-filled';
// radius + strokeWidth = 50
export const CIRCULAR_STROKE_WIDTH = 8;
export const RADIUS = 42;
// circumference = 2 * r * PI  (r = 42)
export const CIRCUMFERENCE = 2 * RADIUS * Math.PI;

const LoaderPrimitive: Primitive<LoaderProps, 'svg'> = (
  {
    className,
    filledColor,
    emptyColor,
    size,
    variation,
    isDeterminate = false,
    isPercentageTextHidden = false,
    percentage = 0,
    ...rest
  },
  ref
) => {
  percentage = Math.min(percentage, 100);
  percentage = Math.max(percentage, 0);

  const percent = `${percentage}%`;
  const componentClasses = classNames(
    ComponentClassName.Loader,
    classNameModifier(ComponentClassName.Loader, size),
    classNameModifier(ComponentClassName.Loader, variation),
    classNameModifierByFlag(
      ComponentClassName.Loader,
      'determinate',
      isDeterminate
    ),
    className
  );

  const linearLoader = (
    <g>
      <line
        x1="0"
        x2="100%"
        y1="50%"
        y2="50%"
        style={{ stroke: String(emptyColor) }}
        data-testid={LINEAR_EMPTY}
      />
      <line
        x1="0"
        x2={isDeterminate ? percent : '100%'}
        y1="50%"
        y2="50%"
        style={{
          // To get rid of the visible stroke linecap when percentage is 0
          stroke:
            isDeterminate && percentage === 0
              ? 'none'
              : filledColor
              ? String(filledColor)
              : undefined,
        }}
        data-testid={LINEAR_FILLED}
      />
      {isDeterminate ? (
        <text
          aria-live="polite"
          className={classNames(
            ComponentClassName.LoaderLabel,
            isPercentageTextHidden ? ComponentClassName.VisuallyHidden : null
          )}
          // -1% offset makes the text position look nicest
          x={`${-1 + percentage}%`}
          y="200%"
        >
          {percent}
        </text>
      ) : null}
    </g>
  );

  // r + stroke-width should add up to 50% to avoid overflow
  const circularLoader = (
    <g>
      <circle
        cx="50%"
        cy="50%"
        r={`${RADIUS}%`}
        strokeWidth={`${CIRCULAR_STROKE_WIDTH}%`}
        style={{ stroke: String(emptyColor) }}
        data-testid={CIRCULAR_EMPTY}
      />
      <circle
        cx="50%"
        cy="50%"
        r={`${RADIUS}%`}
        strokeWidth={`${CIRCULAR_STROKE_WIDTH}%`}
        style={{
          stroke: String(filledColor),
          strokeDasharray: isDeterminate
            ? `${CIRCUMFERENCE}% ${CIRCUMFERENCE}%`
            : undefined,
          strokeDashoffset: isDeterminate
            ? `${CIRCUMFERENCE - (CIRCUMFERENCE * percentage) / 100}%`
            : undefined,
        }}
        data-testid={CIRCULAR_FILLED}
      />
      {isDeterminate ? (
        <text
          aria-live="polite"
          className={classNames(
            ComponentClassName.LoaderLabel,
            isPercentageTextHidden ? ComponentClassName.VisuallyHidden : null
          )}
          // this x and y make text position look nicest
          x="130%"
          y="80%"
        >
          {percent}
        </text>
      ) : null}
    </g>
  );

  return (
    <View
      as="svg"
      aria-valuenow={isDeterminate ? percentage : undefined}
      className={componentClasses}
      ref={ref}
      role="progressbar"
      {...rest}
    >
      {variation === 'linear' ? linearLoader : circularLoader}
    </View>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/loader)
 */
export const Loader: ForwardRefPrimitive<BaseLoaderProps, 'svg'> =
  primitiveWithForwardRef(LoaderPrimitive);

Loader.displayName = 'Loader';
