# Totally Secure Math App Security Enhancements

This document outlines the security improvements made to the Totally Secure Math App, addressing several critical security vulnerabilities, including insecure data storage, improper authentication, code injection, insufficient input validation, and insecure code practices. Our goal was to enhance the app's security posture significantly while maintaining its functionality.

## Security Vulnerabilities and Improvements

### 1. Insecure Data Storage

#### Vulnerability
User notes were previously stored using AsyncStorage without encryption, making the data vulnerable to unauthorized access on rooted devices.

#### Improvement
Implemented encrypted storage using `react-native-encrypted-storage` to ensure that notes data is securely encrypted before being stored locally.

```bash
npm install react-native-encrypted-storage
```

## 2. Improper Authentication

### Vulnerability
The app utilized hardcoded credentials for authentication, posing a severe security risk of credential extraction.

### Improvement
Transitioned to using @react-native-keychain/react-native-keychain for secure credential storage, leveraging the platform's secure storage facilities.

```bash
npm install @react-native-keychain/react-native-keychain
```

## 3. Code Injection

### Vulnerability
The eval() function was used to evaluate mathematical expressions, creating a vulnerability to code injection attacks.

### Improvement
Replaced eval() with mathjs library to safely evaluate mathematical expressions without executing arbitrary code.

```bash
npm install mathjs
```

## 4. Insufficient Input Validation

### Vulnerability
Lack of input validation for mathematical expressions could lead to unintended code execution or app crashes.

### Improvement
Implemented thorough input validation using regex and conditional checks to ensure only valid mathematical characters and structures are processed.

## 5. Insecure Code Practices

### Vulnerabilities
Use of AsyncStorage for sensitive data storage.
Hardcoded user credentials.
Lack of error handling potentially leading to information leakage.

### Improvements
Encrypted sensitive data before storage.
Implemented secure authentication mechanism.
Enhanced error handling across the app to manage exceptions securely.


## Detailed Changes
Below are explanations for the specific changes made to address the identified vulnerabilities:


#### Secure Evaluation of Mathematical Expressions
```bash
// Import evaluate from mathjs for secure expression evaluation
import { evaluate } from 'mathjs';

function evaluateEquation() {
  try {
    const result = evaluate(props.text);
    Alert.alert('Result', 'Result: ' + result.toString());
  } catch (error) {
    Alert.alert('Error', 'Invalid mathematical expression.');
  }
}
```
#### Secure Authentication Mechanism
```bash
// Use react-native-keychain for secure storage of credentials
import * as Keychain from '@react-native-keychain/react-native-keychain';

async function login() {
  const credentials = await Keychain.getGenericPassword();
  if (credentials && credentials.username === username && credentials.password === password) {
    props.onLogin({ username, password });
  } else {
    Alert.alert('Error', 'Username or password is invalid.');
  }
}
```
#### Encrypted Notes Storage
```bash
// Use react-native-encrypted-storage for secure notes storage
import EncryptedStorage from 'react-native-encrypted-storage';

private async getStoredNotes() {
  const value = await EncryptedStorage.getItem('notes');
  if (value !== null) {
    this.setState({ notes: JSON.parse(value) });
  }
}
```

Conclusion
The security enhancements implemented in the Totally Secure Math App significantly mitigate the risk of data breaches and unauthorized access. By addressing the core vulnerabilities and applying best practices, we've made the app safer for users, protecting their data and improving overall trust in the app's security measures.

