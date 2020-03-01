import React from 'react';
import styled from 'styled-components/native';

import ItemNumber from './ItemNumber';

const List = styled.FlatList`
    flex: 1;
    margin-bottom: 10px;
`;

export default function NumberPanel({ data }) {
    const [ascendent, setAscendent] = React.useState(false);

    const handleOrderingOption = () => {
        setAscendent(!ascendent)
    };

    const _handleAnimatedItem = (index) => {
        if (ascendent) {
            let lastOne = [...data].pop();
            return index === [...data].sort((a, b) => a - b).indexOf(lastOne)
        }
        return index === data.length - 1;
    }

    const _getData = () => {
        return ascendent ? [...data].sort((a, b) => a - b) : data;
    }

    return (<List
        numColumns={5}
        keyExtractor={(item) => item}
        data={_getData()}
        renderItem={({ item, index }) => <ItemNumber cols={5} last={_handleAnimatedItem(index)}>{item}</ItemNumber>}
    />);

}
