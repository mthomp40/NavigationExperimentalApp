'use strict';

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Animated,
    NavigationExperimental,
    ScrollView
} from 'react-native';
const NavigationTabsExample = require('./tabs/NavigationTabsExample');
const NavigationCompositionExample = require('./tabs/NavigationCompositionExample');
const NavigationExampleRow = require('./NavigationExampleRow');

const {
    AnimatedView: NavigationAnimatedView,
    Card: NavigationCard,
    Header: NavigationHeader,
    Reducer: NavigationReducer,
} = NavigationExperimental;

const ExampleReducer = NavigationReducer.StackReducer({
    getPushedReducerForAction: (action) => {
        if (action.type === 'push') {
            return (state) => state || {key: action.key};
        }
        return null;
    },
    getReducerForState: (initialState) => (state) => state || initialState,
    initialState: {
        key: 'AnimatedExampleStackKey',
        index: 0,
        children: [
            {key: 'First Route'},
        ],
    },
});

class NavigationAnimatedExample extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = ExampleReducer();
    }

    componentWillMount() {
        this._renderCard = this._renderCard.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
        this._renderScene = this._renderScene.bind(this);
        this._renderTitleComponent = this._renderTitleComponent.bind(this);
        this._handleAction = this._handleAction.bind(this);
    }

    _handleAction(action):boolean {
        if (!action) {
            return false;
        }
        const newState = ExampleReducer(this.state, action);
        if (newState === this.state) {
            return false;
        }
        this.setState(newState);
        return true;
    }

    handleBackAction():boolean {
        return this._handleAction({type: 'BackAction',});
    }

    render() {
        return (
            <NavigationAnimatedView
                navigationState={this.state}
                style={styles.animatedView}
                onNavigate={this._handleAction}
                renderOverlay={this._renderHeader}
                applyAnimation={(pos, navState) => {
          Animated.timing(pos, {toValue: navState.index, duration: 200}).start();
        }}
                renderScene={this._renderCard}
            />
        );
    }

    _renderHeader(/*NavigationSceneRendererProps*/ props) {
        return (
            <NavigationHeader
                {...props}
                renderTitleComponent={this._renderTitleComponent}
            />
        );
    }

    _renderTitleComponent(/*NavigationSceneRendererProps*/ props) {
        return (
            <NavigationHeader.Title>
                {props.scene.navigationState.key}
            </NavigationHeader.Title>
        );
    }

    _renderCard(/*NavigationSceneRendererProps*/ props) {
        return (
            <NavigationCard
                {...props}
                key={'card_' + props.scene.navigationState.key}
                renderScene={this._renderScene}
            />
        );
    }

    _renderScene(/*NavigationSceneRendererProps*/ props) {
        return (
            <ScrollView style={styles.scrollView}>
                <NavigationExampleRow
                    text={props.scene.navigationState.key}
                />
                <NavigationExampleRow
                    text="Push!"
                    onPress={() => {
            props.onNavigate({
              type: 'push',
              key: 'Route #' + props.scenes.length,
            });
          }}
                />
                <NavigationExampleRow
                    text="Go to dashboard tabs"
                    onPress={() => {
            props.onNavigate({
              type: 'push',
              key: 'Route #' + props.scenes.length,
            });
          }}
                />
                <NavigationExampleRow
                    text="Exit Animated Nav Example"
                    onPress={this.props.onExampleExit}
                />
            </ScrollView>
        );
    }
}

class NavigationExperimentalApp extends Component {
    render() {
        return (
            <NavigationCompositionExample />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    animatedView: {
        flex: 1,
    },
    scrollView: {
        marginTop: NavigationHeader.HEIGHT,
    },
});

module.exports = NavigationExperimentalApp;