import type { MessageComponentBaseProps } from '@aws-amplify/ui-react-core-notifications';

import type { ButtonProps } from '@aws-amplify/ui-react';

import type {
  MessageComponentStyles,
  MessageOverrideStyle,
  UseMessageProps,
} from '../hooks';

type MessageLayoutOrientation = 'horizontal' | 'vertical';

export type MessageLayoutButtonModifier = 'dark' | 'light';

export interface MessageLayoutProps
  extends Omit<MessageComponentBaseProps<MessageOverrideStyle>, 'style'>,
    Omit<UseMessageProps, 'shouldRenderMessage' | 'styles'> {
  /**
   * @description
   * Changes the size of the buttons.
   */
  buttonSize?: ButtonProps['size'];

  /**
   * @description
   * The orientation determines how message content will be laid out.
   */
  orientation?: MessageLayoutOrientation;

  /**
   * @description
   * Component styles - typically a combination of payload and override styles.
   */
  styles: MessageComponentStyles;
}
