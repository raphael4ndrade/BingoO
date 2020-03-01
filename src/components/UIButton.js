import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { View, Text, TouchableNativeFeedback, Animated, StyleSheet, TouchableWithoutFeedback } from 'react-native';

function UIButton({ title, disabled, topIcon, onPress, feedback }) {
    const Touchable = feedback ? TouchableNativeFeedback : TouchableWithoutFeedback;
    const toDirection = React.useRef(0);
    const animate = React.useRef(new Animated.Value(0));

    const spin = animate.current.interpolate({
        inputRange: [0, 1, 2],
        outputRange: ['0deg', '180deg', '360deg']
    });

    const incrementAnimation = _ => {
        if (toDirection.current !== 1) {
            animate.current.setValue(0);
            toDirection.current = 1;
        } else {
            animate.current.setValue(1);
            toDirection.current = 2;
        }
    }

    const _handlePress = _ => {
        if (topIcon)
            incrementAnimation();
        
        return disabled ? null : onPress();
    }

    React.useEffect(() => {
        Animated.timing(animate.current, {
            toValue: toDirection.current,
            duration: 500
        }).start();
    }, [toDirection.current]);

    const Icon = (<Animated.View style={[styles.icon, { transform: [{ rotateZ: spin }], marginTop: 7 }]}>
        <FontAwesomeIcon icon={faChevronUp} size={20} color={Colors.iosPrimary} />
    </Animated.View>);

    return (<Touchable onPress={_handlePress}>
        <View style={styles.content}>
            {topIcon && Icon}
            <Text style={styles.text}>{title}</Text>
        </View>
    </Touchable>);
}

export default React.memo(UIButton);

const Colors = {
    iosPrimary: '#147efb',
    iosDisabled: '#8e8e93'
}

const styles = StyleSheet.create({
    text: {
        includeFontPadding: false,
        textAlign: "center",
        textAlignVertical: 'center',
        color: Colors.iosPrimary,
        fontSize: 16,
        padding: 8,
        fontWeight: '500'
    },
    content: {
        // width: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 2,
        elevation: 4
    }
})