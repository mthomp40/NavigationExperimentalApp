'use strict';

const NavigationExperimental = require('NavigationExperimental');
const React = require('react');
const StyleSheet = require('StyleSheet');
const Text = require('Text');
const Image = require('Image');
const TouchableOpacity = require('TouchableOpacity');
const View = require('View');
const {
    Reducer: NavigationReducer,
} = NavigationExperimental;
const {
    JumpToAction,
} = NavigationReducer.TabsReducer;

const NavigationExperimentalTabBar = React.createClass({
    propTypes: {
        ...View.propTypes,
        /**
         * Little red bubble that sits at the top right of the icon.
         */
        badge: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
        ]),
        /**
         * Items comes with a few predefined system icons. Note that if you are
         * using them, the title and selectedIcon will be overridden with the
         * system ones.
         */
        systemIcon: React.PropTypes.oneOf([
            'bookmarks',
            'contacts',
            'downloads',
            'favorites',
            'featured',
            'history',
            'more',
            'most-recent',
            'most-viewed',
            'recents',
            'search',
            'top-rated',
        ]),
        /**
         * A custom icon for the tab. It is ignored when a system icon is defined.
         */
        icon: Image.propTypes.source,
        /**
         * A custom icon when the tab is selected. It is ignored when a system
         * icon is defined. If left empty, the icon will be tinted in blue.
         */
        selectedIcon: Image.propTypes.source,
        /**
         * Callback when this tab is being selected, you should change the state of your
         * component to set selected={true}.
         */
        onPress: React.PropTypes.func,
        /**
         * If set to true it renders the image as original,
         * it defaults to being displayed as a template
         */
        renderAsOriginal: React.PropTypes.bool,
        /**
         * React style object.
         */
        style: View.propTypes.style,
        /**
         * Text that appears under the icon. It is ignored when a system icon
         * is defined.
         */
        title: React.PropTypes.string,
    },
    render: function () {
        return (
            <View style={styles.tabBar}>
                {this.props.tabs.map(this._renderTab)}
            </View>
        );
    },
    _renderTab: function (tab, index) {
        var icon = tab.icon;
        const textStyle = [styles.tabButtonText];
        if (this.props.index === index) {
            textStyle.push(styles.selectedTabButtonText);
            icon = tab.selectedIcon;
        }
        return (
            <TouchableOpacity
                style={styles.tabButton}
                key={tab.key}
                onPress={() => {
          this.props.onNavigate(JumpToAction(index));
        }}>
                <Image style={styles.tabButtonIcon} source={icon} />
                <Text style={textStyle}>
                    {tab.title}
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabButtonText: {
        textAlign: 'center',
        fontSize: 10,
    },
    selectedTabButtonText: {
        color: '#F26725',
    },
    tabButtonIcon: {
        //color: '#F26725',
    },
});

module.exports = NavigationExperimentalTabBar;