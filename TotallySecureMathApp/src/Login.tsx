import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TRootStackParamList } from './App';
import * as Keychain from '@react-native-keychain/react-native-keychain';

export interface IUser {
  username: string;
  password: string;
}

interface IProps {
  onLogin: (user: IUser) => void;
}

type TProps = NativeStackScreenProps<TRootStackParamList, 'Login'> & IProps;

export default function Login(props: TProps) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  // Function to handle user login
  async function login() {
    try {
      // Attempt to retrieve credentials securely stored in the device's keychain.
      const credentials = await Keychain.getGenericPassword();
      // Check if credentials exist and match the input.
      if (credentials && credentials.username === username && credentials.password === password) {
        // Correct credentials; proceed with login.
        props.onLogin({ username, password });
      } else {
        // Invalid credentials; alert the user.
        Alert.alert('Error', 'Username or password is invalid.');
      }
    } catch (error) {
      // Handle any errors during the login process.
      console.log('Error accessing credentials', error);
      Alert.alert('Error', 'An error occurred when trying to log in.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.username}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        autoCapitalize="none"
      />
      <TextInput
        secureTextEntry
        style={styles.password}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        autoCapitalize="none"
      />
      <Button title="Login" onPress={login} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  username: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  password: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    secureTextEntry: true, // Ensures the password input is obscured.
  }
});

/*
Explanation of Changes:
- Replaced static user validation with secure storage access via @react-native-keychain/react-native-keychain. This shift enhances security by securely managing user credentials, leveraging the underlying secure storage mechanisms provided by iOS and Android.
- Implemented secureTextEntry for password TextInput. This small but critical change ensures that password inputs are obscured, protecting sensitive information from over-the-shoulder attacks.
- Introduced error handling within the login process to manage and report issues accessing stored credentials or mismatches in user input. This not only aids in debugging but also improves the user experience by providing clear feedback during login failures.
- By utilizing @react-native-keychain, we move away from the less secure practice of storing sensitive information in plain text or through insecure means, towards a more robust and secure authentication mechanism. This approach significantly reduces the risk of credential theft or leakage, aligning with best practices for mobile application security.
*/
