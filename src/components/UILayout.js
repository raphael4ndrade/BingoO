import React from 'react';
import styled from 'styled-components/native';

const Top = styled.View`
    flex: 1;
    justify-content: flex-start;
`;

const Middle = styled.View`
    flex: 8;
    justify-content: center;    
    align-items: center;
`;

const Bottom = styled.View`
    flex: 1;
    justify-content: flex-end;
`;

const Container = styled.View`
    flex: 10;
`;

function UILayout({ children }) {
    return <Container>
        {children}
    </Container>
}

UILayout.Top = Top;
UILayout.Middle = Middle;
UILayout.Bottom = Bottom;

export default UILayout;