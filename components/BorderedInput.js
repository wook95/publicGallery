import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const BorderedInput = ({ hasMarginBottom, ...textInputProps }) => {
  return (
    <TextInput
      {...textInputProps}
      style={[styles.input, hasMarginBottom && styles.margin]}
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

export default BorderedInput;
