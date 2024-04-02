import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
// Import evaluate from mathjs
import { evaluate } from 'mathjs';

interface IProps {
  title: string;
  text: string;
}

function Note(props: IProps) {
    function evaluateEquation() {
        try {
            // Use mathjs's evaluate function
            const result = evaluate(props.text);
            Alert.alert('Result', 'Result: ' + result.toString());
        } catch (error) {
            // Handle errors gracefully
            Alert.alert('Error', 'Invalid mathematical expression. Please ensure it is correctly formatted.');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {props.title}
            </Text>
            <Text style={styles.text}>
                {props.text}
            </Text>

            <View style={styles.evaluateContainer}>
                <Button title='Evaluate' onPress={evaluateEquation} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 16,
    },
    evaluateContainer: {
        marginTop: 10,
        marginBottom: 10
    }
});

export default Note;

/*
Explanation of Changes:
- The initial implementation utilized the `eval()` function to execute the content of the `text` prop, which introduced a significant security vulnerability. This was because `eval()` could execute arbitrary JavaScript code, thus exposing the app to potential code injection attacks where malicious code could be run, leading to data leaks or unauthorized actions.
- To address this security concern, the `eval()` function was replaced with the `evaluate` function from the `mathjs` library. Unlike `eval()`, `mathjs` provides a safe way to evaluate mathematical expressions without executing them as JavaScript code. This significantly lowers the risk of code injection vulnerabilities, making the evaluation process secure.
- A try/catch block was implemented around the `evaluate` function call to gracefully handle any errors that might arise during the evaluation process. This could include syntax errors in the mathematical expression or operations that result in undefined behavior. By catching these errors, the app can alert the user to the issue without crashing or behaving unpredictably.
- These modifications enhance the security and stability of the Note component. By safely evaluating user input and managing errors effectively, we protect the app from potential security exploits and improve the overall user experience by providing clear feedback in case of incorrect input.
*/
