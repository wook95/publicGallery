import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const BorderedInput = ({ hasMarginBottom, ...textInputProps }, ref) => {
  return (
    <TextInput
      autoCapitalize='none'
      style={[styles.input, hasMarginBottom && styles.margin]}
      ref={ref}
      {...textInputProps}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: '#bdbdbd',
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 4,
    height: 48,
    backgroundColor: '#ffffff',
  },
  margin: {
    marginBottom: 16,
  },
});

export default React.forwardRef(BorderedInput);
