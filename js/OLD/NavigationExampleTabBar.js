'use strict';

const NavigationExperimental = require('NavigationExperimental');
const React = require('react');
import ReactNative, {View}  from 'react-native';
const StyleSheet = require('StyleSheet');
var TabBarIOS = require('TabBarIOS');
var TabBarItemIOS = require('TabBarItemIOS');
const DashboardView = require('./dashboard/DashboardView');
const {
    Reducer: NavigationReducer,
} = NavigationExperimental;
const {
    JumpToAction,
} = NavigationReducer.TabsReducer;

const NavigationExampleTabBar = React.createClass({
    render: function () {
        var scheduleIcon = require('./img/schedule-icon-1.png');
        var scheduleIconSelected = require('./img/schedule-icon-1-active.png');
        return (
            <TabBarIOS tintColor={'#F26725'}>
                <TabBarItemIOS
                    title="Schedule"
                    selected={this.props.index === 0}
                    onPress={() => {this.props.onNavigate(JumpToAction(0));}}
                    icon={scheduleIcon}
                    selectedIcon={scheduleIconSelected}>
                </TabBarItemIOS>
                <TabBarItemIOS
                    title="My F8"
                    selected={this.props.index === 1}
                    onPress={() => {this.props.onNavigate(JumpToAction(1));}}
                    icon={require('./img/my-schedule-icon.png')}
                    selectedIcon={require('./img/my-schedule-icon-active.png')}>
                </TabBarItemIOS>
                <TabBarItemIOS
                    title="Maps"
                    selected={this.props.index === 2}
                    onPress={() => {this.props.onNavigate(JumpToAction(2));}}
                    icon={require('./img/maps-icon.png')}
                    selectedIcon={require('./img/maps-icon-active.png')}>
                </TabBarItemIOS>
                <TabBarItemIOS
                    title="Notifications"
                    selected={this.props.index === 3}
                    onPress={() => {this.props.onNavigate(JumpToAction(3));}}
                    badge={this.props.notificationsBadge || null}
                    icon={require('./img/notifications-icon.png')}
                    selectedIcon={require('./img/notifications-icon-active.png')}>
                </TabBarItemIOS>
                <TabBarItemIOS
                    title="Info"
                    selected={this.props.index === 4}
                    onPress={() => {this.props.onNavigate(JumpToAction(4));}}
                    icon={require('./img/info-icon.png')}
                    selectedIcon={require('./img/info-icon-active.png')}>
                </TabBarItemIOS>
            </TabBarIOS>
        );
    },
    _renderTab: function (tab, index) {
        const textStyle = [styles.tabButtonText];
        if (this.props.index === index) {
            textStyle.push(styles.selectedTabButtonText);
        }
        return (
            <TouchableOpacity
                style={styles.tabButton}
                key={tab.key}
                onPress={() => {
          this.props.onNavigate(JumpToAction(index));
        }}>
                <Text style={textStyle}>
                    {tab.key}
                </Text>
            </TouchableOpacity>
        );
    },
});

const styles = StyleSheet.create({
    tabBar: {
        height: 50,
        flexDirection: 'row',
    },
    tabButton: {
        flex: 1,
    },
    tabButtonText: {
        paddingTop: 20,
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '500',
    },
    selectedTabButtonText: {
        color: 'blue',
    },
});

module.exports = NavigationExampleTabBar;