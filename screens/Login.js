import React, { useState, useEffect, useRef } from 'react';
import { Animated, Alert, TextPropTypes, View, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
//formik
import { Formik } from 'formik';

//icons
import { Octicons, Ionicons } from '@expo/vector-icons';
import { Caption } from 'react-native-paper';


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
import Home from './Home';


// Colors
const { brand, darkLight } = Colors;







const Login = ({ navigation }) => {
    //pega as informações do localStorage assim que o app é iniciado
    const [tokenValidate, setTokenValidate] = React.useState(false)
    getCacheValues = async () => {
        try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
                setTokenValidate(true)
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            }
        } catch (error) {
            setTokenValidate(false)
            console.log(value)
            // Error retrieving data
        }
    };

    getCacheValues()


    //variaveis de estado
    const [hidePassword, setHidePassword] = useState(true)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(' ');
    const [token, setToken] = useState('')
    const [alunoId, setAlunoId] = useState('')


    //animção da mensagem de erro

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

    saveTokenOnCache = async () => {
        try {
            await AsyncStorage.setItem(
                'token',
                token
            );
        } catch (error) {
            // Error saving data
        }
    };

    saveAlunoIdOnCache = async () => {
        try {
            await AsyncStorage.setItem(
                'alunoId',
                alunoId
            );
        } catch (error) {
            // Error saving data
        }

        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    };




    //função que gerencia o login
    async function authLogin(email, password) {
        axios.post('https://desafio.pontue.com.br/auth/login',
            {
                email: email,
                password: password
            }).then(function (response) {
                if (response.status == 200) {
                    setLoading(false)
                    setToken(response.data.access_token)
                    setAlunoId(response.data.aluno_id)
                    setError(' ');
                    saveTokenOnCache();
                    saveAlunoIdOnCache();
                    getCacheValues()
                }

            }
            ).catch(function () {
                setLoading(false)
                setError("Falha na autenticação! Tente novamente.")
            }
            )
    }
    // }

    function handleSub() {
        setLoading(true)
        if (password === '' || email === '') {
            return;
        }
        authLogin(email, password)
    }

    console.log(tokenValidate)


    if (tokenValidate == false) {
        return (
            <StyledContainer>
                <ImageBackground resizeMode="cover" source={require('./../assets/img/bgImage3.png')}>
                    <StatusBar style="dark" />
                    <InnerContainer>
                        <Image source={require('./../assets/img/Webp.net-resizeimage.png')}  style={{marginTop: 150 }}/>
                        <PageTitle></PageTitle>
                        <SubTitle>Bem-vindo!</SubTitle>
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
                            <StyledButton onPress={handleSub} Loading={loading}>
                                <ButtonText >
                                    Login
                                </ButtonText>
                            </StyledButton>
                            <StyledNormalButton>
                                <NormalText>Esqueci minha senha!</NormalText>
                            </StyledNormalButton>
                            <Caption >
                                <ErrorCaption>
                                    {error}
                                </ErrorCaption>
                            </Caption>
                        </StyledFormArea>)
                            }
                        </Formik>
                    </InnerContainer>
                </ImageBackground>
            </StyledContainer>
        );
    } else {
        setTimeout(() => {
            return (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="small" color="#0000ff" />
                </View>
            )
        }, 1000)
        return (
            <Home />
        )
    }
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});



export default Login;
