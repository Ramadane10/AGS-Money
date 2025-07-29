import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import Theme from '@/constants/theme';

interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: object;
  textStyle?: object;
}

export default function Button({ title, onPress, disabled = false, style, textStyle }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled ? styles.disabledButton : null, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: Theme.borderRadius.m,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  text: {
    color: '#fff',
    fontFamily: Theme.Fonts.medium,
    fontSize: 16,
  },
});
