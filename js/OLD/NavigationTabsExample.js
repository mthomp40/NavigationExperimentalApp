'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
    NavigationExperimental,
    ScrollView,
    Text,
    StyleSheet,
    View,
} = ReactNative;
const {
    Reducer: NavigationReducer,
} = NavigationExperimental;

const NavigationExampleRow = require('../NavigationExampleRow');
const NavigationExampleTabBar = require('./NavigationExampleTabBar');

class ExmpleTabPage extends React.Component {
    render() {
        const currentTabRoute = this.props.tabs[this.props.index];
        return (
            <ScrollView style={styles.tabPage}>
                <NavigationExampleRow
                    text={`Current Tab is: ${currentTabRoute.key}`}
                />
                {this.props.tabs.map((tab, index) => (
                    <NavigationExampleRow
                        key={tab.key}
                        text={`Go to ${tab.key}`}
                        onPress={() => {
              this.props.onNavigate(NavigationReducer.TabsReducer.JumpToAction(index));
            }}
                    />
                ))}
                <NavigationExampleRow
                    text="Exit Tabs Example"
                    onPress={this.props.onExampleExit}
                />
            </ScrollView>
        );
    }
}

class MeTabPage extends React.Component {
    render() {
        const currentTabRoute = this.props.tabs[this.props.index];
        return (
            <View style={{flex: 1, backgroundColor: 'red'}}>
                <Text style={{fontSize: 24}}>Me Page</Text>
            </View>
        );
    }
}
class MyCrewTabPage extends React.Component {
    render() {
        const currentTabRoute = this.props.tabs[this.props.index];
        return (
            <View style={{flex: 1, backgroundColor: 'yellow'}}>
                <Text style={{fontSize: 24}}>My Crew Page</Text>
            </View>
        );
    }
}
class MyAngelTabPage extends React.Component {
    render() {
        const currentTabRoute = this.props.tabs[this.props.index];
        return (
            <View style={{flex: 1, backgroundColor: 'green'}}>
                <Text style={{fontSize: 24}}>My Angel Page</Text>
            </View>
        );
    }
}
class SupportingTabPage extends React.Component {
    render() {
        const currentTabRoute = this.props.tabs[this.props.index];
        return (
            <View style={{flex: 1, backgroundColor: 'grey'}}>
                <Text style={{fontSize: 24}}>Supporting Page</Text>
            </View>
        );
    }
}
class MoreTabPage extends React.Component {
    render() {
        const currentTabRoute = this.props.tabs[this.props.index];
        return (
            <View style={{flex: 1, backgroundColor: 'pink'}}>
                <Text style={{fontSize: 24}}>More Page</Text>
            </View>
        );
    }
}

const ExampleTabsReducer = NavigationReducer.TabsReducer({
    tabReducers: [
        (lastRoute) => lastRoute || {key: 'one'},
        (lastRoute) => lastRoute || {key: 'two'},
        (lastRoute) => lastRoute || {key: 'three'},
        (lastRoute) => lastRoute || {key: 'four'},
        (lastRoute) => lastRoute || {key: 'five'},
    ],
});

class NavigationTabsExample extends React.Component {
    constructor() {
        super();
        this.state = ExampleTabsReducer(undefined, {});
    }

    render() {
        return (
            <View style={styles.topView}>
                <MeTabPage
                    tabs={this.state.children}
                    index={this.state.index}
                    onExampleExit={this.props.onExampleExit}
                    onNavigate={this.handleAction.bind(this)}
                />
                <NavigationExampleTabBar
                    tabs={this.state.children}
                    index={this.state.index}
                    onNavigate={this.handleAction.bind(this)}
                />
            </View>
        );
    }

    handleAction(action) {
        if (!action) {
            return false;
        }
        const newState = ExampleTabsReducer(this.state, action);
        if (newState === this.state) {
            return false;
        }
        this.setState(newState);
        console.log(newState);
        return true;
    }

    handleBackAction() {
        return this.handleAction({type: 'BackAction'});
    }
}

const styles = StyleSheet.create({
    topView: {
        flex: 1,
        paddingTop: 30,
    },
    tabPage: {
        backgroundColor: '#E9E9EF',
    },
});

module.exports = NavigationTabsExample;