import React from 'react';

import CircleShape from './src/components/CircleShape';

import Odometer from './src/components/Odometer';
import NumberPanel from './src/components/NumberPanel';

import UILayout from './src/components/UILayout';
import UIDrawer from './src/components/UIDrawer';
import UIButton from './src/components/UIButton';

import {
	SafeAreaView,
	StatusBar,
	Dimensions
} from 'react-native';

const MAX = 75;
const { height } = Dimensions.get('window');
const fontSize = height / 5;

const App = () => {
	const [numbers, setNumbers] = React.useState([]);
	const [disabled, setDisabled] = React.useState(false);
	const value = React.useRef(0);

	const handleEnable = React.useCallback(() => {
		setTimeout(() => {
			if (numbers.length !== MAX)
				setDisabled(false);
		}, 550);
	});


	const onSortNumber = React.useCallback(() => {
		setDisabled(true);
		let number = null;

		do {
			number = Math.floor(Math.random() * MAX + 1);
		} while (numbers.indexOf(number) !== -1)

		value.current = number;
		setNumbers([...numbers, number]);
	});

	return (
		<React.Fragment>
			<StatusBar barStyle="dark-content" />
			<SafeAreaView style={{ flex: 1, backgroundColor: '#127541' }}>
				<UILayout>
					<UILayout.Top>
						{/* <Button title={'SETTINGS'} /> */}
					</UILayout.Top>
					<UILayout.Middle>
						<CircleShape fontSize={fontSize}>
							<Odometer value={value.current} onFinish={handleEnable} digits={2} fontSize={fontSize} />
						</CircleShape>
						<UIButton title='NEXT' onPress={onSortNumber} disabled={disabled} />
					</UILayout.Middle>
					<UILayout.Bottom>
						<UIDrawer title={'NUMBERS DRAWN'}>
							<NumberPanel data={numbers} />
						</UIDrawer>
					</UILayout.Bottom>
				</UILayout>
			</SafeAreaView>
		</React.Fragment>
	);
};

export default App;
