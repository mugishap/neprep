import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface SignupProps {}

const Signup = (props: SignupProps) => {
  return (
    <View style={styles.container}>
      <Text>Signup</Text>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {}
});
