import styled from 'styled-components';
import { View, Text, Image, TextInputs, TouchableOpacity, imageBackground } from 'react-native';
import Constants from 'expo-constants';

const StatusBarHeigth = Constants.statusBarHeight;

//colors
export const Colors = {
    primary: '#ffffff',
    secondary: '#E5E7EB',
    tertiary: '#1F2937',
    darkLight: '#9CA3AF',
    brand: '#6D28D9',
    green: '#10B981',
    red: '#EF4444',
};

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;

export const StyledContainer = styled.View`
flex: 1;


background-color: ${primary};
`;

export const InnerContainer = styled.View`
flex:1;
width: 100%;
align-items: center;
`;

export const PageLogo = styled.Image`
width: 250px;
height: 250px


`;


export const PageTitle = styled.Text`
font-size: 30px;
text-align: center;
font-weight: bold;
color: ${brand};
padding: 10px;
`;

export const SubTitle = styled.Text`
font-size: 18px;
margin-bottom: 20px;
letter-spacing: 1px;
font-weight: bold;
color: ${secondary};
`;

export const StyledFormArea = styled.View`
width: 90%;
`;

export const StyledTextInput = styled.TextInput`
background-color: ${secondary};
padding: 15px;
padding-left: 55px;
padding-right: 55px;
border-radius: 5px;
height: 60px;
margin-vertical: 3px;
margin-bottom: 10px;
color: ${tertiary};
`;

export const StyledInputLabel = styled.Text`
color: ${tertiary};
font-size: 13px;
text-align: left; 
`;


export const LeftIcon = styled.View`
left: 15px;
top: 38px;
position: absolute;
z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
right: 15px;
top: 38px;
position: absolute;
z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
padding: 15px;
background-color: ${brand};
justify-content: center;
align-items: center;
border-radius: 5px;
margin-vertical: 5px;
height: 60px;
`;


export const StyledNormalButton = styled.TouchableOpacity`
padding: 7px;

justify-content: center;
align-items: center;
border-radius: 3px;
margin-vertical: 5px;
height: 20px;
`;

export const ButtonText = styled.Text`
color: ${primary};
font-size: 16px;
`;

export const NormalText = styled.Text`
margin-top: 9px;
text.align: center;
color: ${primary};
font-size: 16px;
margin-bottom: 8px

`;


export const MsgBox = styled.Text`
text.align: center;
font-size: 13px;
`;


export const Line = styled.View`
height: 1px;
width: 100%;
background-color: ${darkLight};
margin-vertical: 10px;
`;


export const ImageBackground = styled.ImageBackground`
flex: 1;
justifyContent: center;
alignItems: center;
height: null;
width: null
`


export const ErrorCaption = styled.Text `
text-align: center;
color: ${red}
`