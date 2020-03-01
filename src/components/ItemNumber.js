import React, { Fragment } from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';

const AnimatedText = ({ children }) => {
    const opacity = new Animated.Value(0);

    React.useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    });

    return <Animated.Text style={[styles.text, { opacity }]}>
        {children}
    </Animated.Text>
}

const AnimatedView = (props) => {
    const opacity = new Animated.Value(0);
    const backgroundColor = '#228B22';
    const layoutProps = { ...props, children: undefined };

    const opacityAnimation = Animated.timing(opacity, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true
    });

    React.useEffect(() => {
        Animated.loop(opacityAnimation, {
            delay: 100,
            iterations: -1
        }).start();
    });

    return (<Animated.View style={{ zIndex: 0, backgroundColor, opacity, position: 'absolute', ...layoutProps, borderRadius: 20, justifyContent: 'center' }}>
        {props.children}
    </Animated.View>)
}

const StaticText = ({ children }) => <Text style={styles.text}>
    {children}
</Text>

export default function ItemNumber({ children, last, cols }) {
    const [layout, setLayout] = React.useState({})
    const RenderText = last ? AnimatedText : StaticText;
    const _ratio = 100 / cols;

    const getSize = (evt) => {
        const { x, y, width, height } = evt.nativeEvent.layout;

        setLayout({ top: y, left: x + ((width - height)) / 2, width: height, height });
    };

    return <Fragment>
        <View style={[styles.item, { flexBasis: `${_ratio}%` }]} onLayout={getSize}>
            <RenderText>{children}</RenderText>
        </View>
        {last && <AnimatedView {...layout}></AnimatedView>}
    </Fragment>;
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontSize: 19,
        fontWeight: '700'
    },
    item: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10
    }
})