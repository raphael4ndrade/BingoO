import React from 'react';
import { Animated, Button } from 'react-native';

const ANIMATION_DURATION = 550;

const defaultStyle = {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'white'
};

/** @deprecated first poc about animations.. */
export default function AbsoluteDrawer({ height, padding = 0, children }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const slideValue = React.useRef(new Animated.Value(0));
    const opacityValue = React.useRef(new Animated.Value(0));

    const _handleIsOpen = React.useCallback(() => setIsOpen(!isOpen));

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(opacityValue.current, {
                toValue: isOpen ? 1 : 0,
                duration: 500,
                useNativeDriver: true
            }),
            Animated.spring(slideValue.current, {
                toValue: !isOpen ? 0 : -height,
                duration: ANIMATION_DURATION,
                useNativeDriver: true
            })
        ]).start();
    }, [isOpen]);

    return (<React.Fragment>
        <Animated.View style={[defaultStyle, {
            bottom: -height,
            height: height + padding,
            transform: [{
                translateY: slideValue.current
            }]
        }]}>

            <Button onPress={_handleIsOpen} title={'NUMBERS DRAWN'} />
            <Animated.View style={{ opacity: opacityValue.current, flex: 1 }}>{children}</Animated.View>
        </Animated.View></React.Fragment>)
}