import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface MessageWrapperProps {
  children: ReactNode;
  disableSafeAreaView?: boolean;
  style?: StyleProp<ViewStyle>;
}

export interface MessageWrapperStyle {
  messageWrapper: ViewStyle;
}
