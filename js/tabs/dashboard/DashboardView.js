'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    NavigationExperimental,
} from 'react-native';

class DashboardView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>This is some text</Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        fontSize: 24,
        color: '#ff4488'
    }
});

module.exports = DashboardView;