import React from 'react';
import { Animated, Dimensions } from 'react-native';

import UIButton from './UIButton';

const screenHeight = Dimensions.get('window').height;

function BottomPanel({ title, disabled, children }) {
    const [open, setOpen] = React.useState(false);

    const height = React.useRef(new Animated.Value(0));
    const handlePress = _ => setOpen(!open);

    React.useEffect(() => {
        Animated.timing(height.current, {
            toValue: open ? (screenHeight / 3) : 0
        }).start();
    }, [open]);

    return (<React.Fragment>
        <UIButton title={title} onPress={handlePress} disabled={disabled} topIcon />
        <Animated.View style={{ height: height.current, backgroundColor: '#FFF', elevation: 10 }}>
            {children}
        </Animated.View>
    </React.Fragment>);
}

export default React.memo(BottomPanel);