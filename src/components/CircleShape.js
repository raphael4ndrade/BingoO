import styled from 'styled-components/native';

export default CircleShape = styled.View`
    height: ${props => props.fontSize * 2}px;
    width: ${props => props.fontSize * 2}px;
    margin: 10px auto;
    justify-content: center;
    background-color: white;
    border-radius: ${props => props.fontSize}px;
    box-shadow: 5px 5px #19482b;
    elevation: 5;
`;