import React from 'react';
import { Animated, View, Platform, Text } from 'react-native';

const ANIMATION_DURATION = 500;

const NumberText = ({ fontSize, children }) => {
    const textStyle = {
        textAlign: 'center',
        fontSize: fontSize,
        includeFontPadding: false,
        textAlignVertical: 'center'
    };

    return (<Text style={textStyle} allowFontScaling={false}>
        {children}
    </Text>);
}

function AnimatedNumber({ height, value }) {
    const getPosition = (value, height) => {
        const diffPadding = Math.floor(height / 12);
        const _height = height + (Platform.OS === 'ios' ? 0 : 23.8); 

        return parseInt(value, 10) * _height * -1 - diffPadding;
    };

    const getTransformStyle = position => ({
        height,
        transform: [{
            translateY: position
        }]
    });

    const animation = React.useRef(new Animated.Value(getPosition(value, height)));

    React.useEffect(() => {
        Animated.timing(animation.current, {
            toValue: getPosition(value, height),
            duration: ANIMATION_DURATION,
            useNativeDriver: true
        }).start();
    }, [value]);

    return <Animated.View style={getTransformStyle(animation.current)}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => <NumberText key={num} fontSize={height} >{num}</NumberText>)}
    </Animated.View>;
};

const Odometer = ({ value, digits = 1, fontSize = 150, onFinish= () => {} }) => {
    const _range = Array(digits).fill().map((el, idx) => idx);

    const getValue = (index) => {
        let stringValue = value.toString();

        if (stringValue.length < digits) {
            stringValue = Array(digits - stringValue.length).fill('0').join('') + stringValue;
        }
        return stringValue[index];
    }

    React.useEffect(() => {
        onFinish();
    }, [value]);

    return (<View style={{ height: fontSize, overflow: "hidden", flexDirection: 'row', justifyContent: "center" }}>
        {_range.map(el => <AnimatedNumber key={el} value={getValue(el)} height={fontSize} />)}
    </View>);
}

export default React.memo(Odometer);