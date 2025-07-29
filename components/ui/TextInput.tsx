import React, { useState } from 'react';
import { TextInput as RNTextInput, StyleSheet, TextInputProps, View, TouchableOpacity } from 'react-native';
import Theme from '@/constants/theme';
import { IconSymbol } from './IconSymbol';

interface Props extends TextInputProps {
  style?: object;
}

export default function TextInput(props: Props) {
  const { secureTextEntry, style, ...rest } = props;
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={[styles.container, style]}>
      <RNTextInput
        {...rest}
        secureTextEntry={secureTextEntry && !showPassword}
        style={styles.input}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={toggleShowPassword} style={styles.iconContainer} activeOpacity={0.7}>
          <IconSymbol name={showPassword ? 'eye.slash' : 'eye'} size={24} color={Theme.colors.dark} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    height: 48,
    borderColor: Theme.colors.primary,
    borderWidth: 1,
    borderRadius: Theme.borderRadius.s,
    paddingHorizontal: 12,
    fontFamily: Theme.Fonts.regular,
    fontSize: 16,
    color: Theme.colors.dark,
    paddingRight: 40, // espace pour l'icône
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
