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

const {
    CardStack: NavigationCardStack,
    Header: NavigationHeader,
    Reducer: NavigationReducer,
    View: NavigationView,
} = NavigationExperimental;

import NavigationExperimentalTabBar from './NavigationExperimentalTabBar';

import type {
    NavigationParentState,
    NavigationSceneRenderer,
    NavigationSceneRendererProps,
} from 'NavigationTypeDefinition';

type
Action = {
    isExitAction? : boolean,
};

const ExampleExitAction = () => ({
    isExitAction: true,
});

ExampleExitAction.match = (action:Action) => (
    action && action.isExitAction === true
);

const PageAction = (type) => ({
    type,
    isPageAction: true,
});

PageAction.match = (action) => (
    action && action.isPageAction === true
);

const ExampleProfilePageAction = (type) => ({
    ...PageAction(type),
    isProfilePageAction: true,
});

ExampleProfilePageAction.match = (action) => (
    action && action.isProfilePageAction === true
);

const ExampleInfoAction = () => PageAction('InfoPage');

const ExampleNotifProfileAction = () => ExampleProfilePageAction('NotifProfilePage');

const _jsInstanceUniqueId = '' + Date.now();

let _uniqueIdCount = 0;

function pageStateActionMap(action) {
    return {
        key: 'page-' + _jsInstanceUniqueId + '-' + (_uniqueIdCount++),
        type: action.type,
    };
}

const NavigationExperimentalAppReducer = NavigationReducer.TabsReducer({
    key: 'AppNavigationState',
    initialIndex: 0,
    tabReducers: [
        NavigationReducer.StackReducer({
            getPushedReducerForAction: (action) => {
                if (PageAction.match(action) && !ExampleProfilePageAction.match(action)) {
                    return (state) => (state || pageStateActionMap(action));
                }
                return null;
            },
            initialState: {
                key: 'Me',
                index: 0,
                title: 'Dashboard',
                icon: require('./tabs/img/tab-me_grey.png'),
                iconSelected: require('./tabs/img/tab-me_orange.png'),
                children: [
                    {key: 'base', type: 'MePage'},
                ],
            },
        }),
        NavigationReducer.StackReducer({
            getPushedReducerForAction: (action) => {
                if (PageAction.match(action) && !ExampleProfilePageAction.match(action)) {
                    return (state) => (state || pageStateActionMap(action));
                }
                return null;
            },
            initialState: {
                key: 'MyCrew',
                index: 0,
                title: 'My Crew',
                icon: require('./tabs/img/tab-mycrew_grey.png'),
                iconSelected: require('./tabs/img/tab-mycrew_orange.png'),
                children: [
                    {key: 'base', type: 'MyCrewPage'},
                ],
            },
        }),
        NavigationReducer.StackReducer({
            getPushedReducerForAction: (action) => {
                if (PageAction.match(action) || ExampleProfilePageAction.match(action)) {
                    return (state) => (state || pageStateActionMap(action));
                }
                return null;
            },
            initialState: {
                key: 'MyAngel',
                index: 0,
                title: 'My Angel',
                icon: require('./tabs/img/my-schedule-icon.png'),
                iconSelected: require('./tabs/img/my-schedule-icon-active.png'),
                children: [
                    {key: 'base', type: 'MyAngelPage'},
                ],
            },
        }),
        NavigationReducer.StackReducer({
            getPushedReducerForAction: (action) => {
                if (PageAction.match(action) || ExampleProfilePageAction.match(action)) {
                    return (state) => (state || pageStateActionMap(action));
                }
                return null;
            },
            initialState: {
                key: 'Supporting',
                index: 0,
                title: 'Supporting',
                icon: require('./tabs/img/my-schedule-icon.png'),
                iconSelected: require('./tabs/img/my-schedule-icon-active.png'),
                children: [
                    {key: 'base', type: 'SupportingPage'},
                ],
            },
        }),
        NavigationReducer.StackReducer({
            getPushedReducerForAction: (action) => {
                if (PageAction.match(action) || ExampleProfilePageAction.match(action)) {
                    return (state) => (state || pageStateActionMap(action));
                }
                return null;
            },
            initialState: {
                key: 'More',
                index: 0,
                title: 'More',
                icon: require('./tabs/img/my-schedule-icon.png'),
                iconSelected: require('./tabs/img/my-schedule-icon-active.png'),
                children: [
                    {key: 'base', type: 'MorePage'},
                ],
            },
        })
    ],
});

function stateTypeTitleMap(pageState:any) {
    console.log('pageState', pageState);
    switch (pageState.type) {
        case 'MePage':
            return 'Action Plan';
        case 'MyCrewPage':
            return 'My Crew';
        case 'MyAngelPage':
            return 'My Angel';
        case 'SupportingPage':
            return 'Supporting';
        case 'MorePage':
            return 'More';
    }
}

class ExampleTabScreen extends React.Component {
    _renderCard:NavigationSceneRenderer;
    _renderHeader:NavigationSceneRenderer;
    _renderScene:NavigationSceneRenderer;

    componentWillMount() {
        this._renderHeader = this._renderHeader.bind(this);
        this._renderScene = this._renderScene.bind(this);
    }

    render() {
        return (
            <NavigationCardStack
                style={styles.tabContent}
                navigationState={this.props.navigationState}
                onNavigate={this.props.onNavigate}
                renderOverlay={this._renderHeader}
                renderScene={this._renderScene}
            />
        );
    }

    _renderHeader(props:NavigationSceneRendererProps) {
        return (
            <NavigationHeader
                {...props}
                renderTitleComponent={this._renderTitleComponent}
            />
        );
    }

    _renderTitleComponent(props:NavigationSceneRendererProps) {
        return (
            <NavigationHeader.Title>
                {stateTypeTitleMap(props.scene.navigationState)}
            </NavigationHeader.Title>
        );
    }

    _renderScene(props:NavigationSceneRendererProps) {
        const {onNavigate} = props;
        return (
            <View style={styles.tabContent}>
                <Text>test {this.props.key}</Text>
            </View>
        );
    }
}

class NavigationExperimentalApp extends React.Component {
    state:NavigationParentState;

    constructor() {
        super();
        this.state = NavigationExperimentalAppReducer(undefined, {});
        console.log('children', this.state);
    }

    handleAction(action:Object):boolean {
        if (!action) {
            return false;
        }
        const newState = NavigationExperimentalAppReducer(this.state, action);
        if (newState === this.state) {
            return false;
        }
        this.setState(newState);
        return true;
    }

    handleBackAction():boolean {
        return this.handleAction({type: 'BackAction'});
    }

    render() {
        if (!this.state) {
            return null;
        }
        return (
            <View style={styles.topView}>
                <ExampleMainView
                    navigationState={this.state}
                    onExampleExit={this.props.onExampleExit}
                    onNavigate={this.handleAction.bind(this)}
                />
                <NavigationExperimentalTabBar
                    tabs={this.state.children}
                    index={this.state.index}
                    onNavigate={this.handleAction.bind(this)}
                />
            </View>
        );
    }
}

class ExampleMainView extends React.Component {
    _renderScene:NavigationSceneRenderer;
    _handleNavigation:Function;

    componentWillMount() {
        this._renderScene = this._renderScene.bind(this);
        this._handleNavigation = this._handleNavigation.bind(this);
    }

    render() {
        return (
            <NavigationView
                navigationState={this.props.navigationState}
                onNavigate={this._handleNavigation}
                style={styles.tabsContent}
                renderScene={this._renderScene}
            />
        );
    }

    _renderScene(props:NavigationSceneRendererProps):ReactElement {
        const {scene} = props;
        return (
            <ExampleTabScreen
                key={'tab_screen' + scene.key}
                navigationState={scene.navigationState}
                onNavigate={this._handleNavigation}
            />
        );
    }

    _handleNavigation(action:Object) {
        if (ExampleExitAction.match(action)) {
            this.props.onExampleExit();
            return;
        }
        this.props.onNavigate(action);
    }
}

const styles = StyleSheet.create({
    topView: {
        flex: 1,
    },
    tabsContent: {
        flex: 1,
    },
    scrollView: {
        marginTop: NavigationHeader.HEIGHT
    },
    tabContent: {
        flex: 1,
    },
});

module.exports = NavigationExperimentalApp;