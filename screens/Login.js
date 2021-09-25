import React, { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';


//formik
import { Formik } from 'formik';

//icons
import { Octicons, Ionicons } from '@expo/vector-icons';



import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    Colors,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    NormalText,
    StyledNormalButton,
    ImageBackground,
    ErrorCaption
} from './../components/styles';

import { View } from 'react-native';




// Colors
const { brand, darkLight } = Colors;




const Login = () => {

    const [hidePassword, setHidePassword] = useState(true)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(' ');
    const [token, setToken] = useState('')
    const [alunoID, setAlunoId] = useState('')

    const errorFadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (error === ' ') {
            errorFadeAnim.setValue(0);

            return;
        }

        Animated.timing(errorFadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [error]);

    function onChangeEmail(value) {
        setEmail(value);
    }

    function onChangePassword(value) {
        setPassword(value);
    }



    class Api {

        static async authLogin(email, password) {
            const response = await axios.post('https://desafio.pontue.com.br/auth/login',
                {
                    email: email,
                    password: password
                }).then(function (response) {
                    if (response.status !== 200) {
                        setError('As credenciais estão erradas, favor conferir.');
                        setLoading(false);
                        console.log(response)
                        setLoading(false)
                        return;
                    }
                    if(response.status == 200){
                    setToken(response.data.access_token)
                    setAlunoId(response.data.aluno_id)
                    setLoading(false)
                    setError(' ');
                    
                    console.log(response)


                    }
                })
        }x
    }

    function handleSub() {

        if (password === '' || email === '') {
            return;
        }

        setLoading(true);

        Api.authLogin(email, password)
        


    }

    return (

        <StyledContainer>
            <ImageBackground resizeMode="cover" source={require('./../assets/img/bgImage.jpg')}>

                <StatusBar style="dark" />
                <InnerContainer>
                    <PageLogo />
                    <PageTitle></PageTitle>
                    <SubTitle>Bem-vindo novamente!</SubTitle>

                    <Formik
                        initialValues={{ email: '', password: '' }}

                    >{({ handleChange, handleBlur, values }) => (<StyledFormArea>
                        <MyTextInput
                            icon="mail"
                            placeholder="Seu e-mail"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"
                            value={email}
                            onChangeText={onChangeEmail}

                        />

                        <MyTextInput
                            icon="lock"
                            placeholder="Sua senha"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('email')}
                            value={values.password}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                            value={password}
                            onChangeText={onChangePassword}
                        />
                        <MsgBox>...</MsgBox>
                        <StyledButton onPress={handleSub} loading={ loading } mode='contained'>
                            <ButtonText>
                                Login
                            </ButtonText>
                        </StyledButton>
                        <StyledNormalButton>
                            <NormalText>Esqueci minha senha!</NormalText>
                        </StyledNormalButton>
                        <ErrorCaption> { error } </ErrorCaption>


                    </StyledFormArea>)
                        }

                    </Formik>


                </InnerContainer>

            </ImageBackground>
        </StyledContainer>


    );
};


const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    )

}


export default Login;