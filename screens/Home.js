import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, StyleSheet, Text, StatusBar, KeyboardAvoidingView } from 'react-native';
import Redacoes from '../components/Redacaoes';
import { AsyncStorage, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';




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
    ErrorCaption,
    ListContainer
} from './../components/styles';
import { BottomNavigation } from 'react-native-paper';







const Home = ({ navigation }) => {


    const [idAluno, setIdAluno] = React.useState('');
    const [accesToken, setAccesToken] = React.useState('');
    const [alunoRedacoes, setAlunoRedacoes] = React.useState('');

    //useEffect para atualizar a variavel de estado
    /*
        useEffect(() => {
    
        }, [idAluno]);
    */


    //Pega as informções que estao no localStorage




    saveRedacoesOnCache = async () => {
        try {
            await AsyncStorage.setItem(
                'redacoes',
                alunoRedacoes
            );
        } catch (error) {
            // Error saving data
        }
    };


    getIdOnCache = async () => {
        try {
            const value = await AsyncStorage.getItem('alunoId');
            if (value !== null) {
                setIdAluno(value)
            } else {
                return "sla"
            }
        } catch (error) {
        }
    };

    getTokenOnCache = async () => {
        setAccesToken(await AsyncStorage.getItem('token'));
    };


    getRedacoesOnCache = async () => {
        setAlunoRedacoes(await AsyncStorage.getItem('redacoes'));
    };

    storeId = async () => {
        const id = getIdOnCache()._W;
        setIdAluno(id);
    }

    storeToken = async () => {
        const token = getTokenOnCache()._W;
        setAccesToken(token);
    }

    useEffect(() => {
        storeId()
        storeToken()
        saveRedacoesOnCache()
    }, [])




    //Limpa informações do localStorage
    async function cleanCache() {
        try {
            await AsyncStorage.clear()
        } catch (error) {
            // Error saving data
        }
    };

    //gerencia o logOf, volta a tela e chama a função para limpar o cache
    function handleLogOut() {
        cleanCache();
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    }




    /*
        useEffect(() => {
            getIdOnCache()
            getTokenOnCache()
            //console.log(idAluno)
            //console.log(accesToken)
    
        }, [idAluno, accesToken])
        */

    function reRender(funcao) {
        for (let i = 0; i < 1; i++) {
            funcao(idAluno, accesToken)
        }
    }

    useEffect(() => {
        reRender(getRedacoesAlunos)
    })


    const getRedacoesAlunos = async (a, b) => {
        const AuthStr = 'Bearer '.concat(b);
        await axios.get(`https://desafio.pontue.com.br/index/aluno/${a}`,
            {
                headers: {
                    'Authorization': AuthStr,
                    "User-Agent": 'PostmanRuntime/7.28.4',
                    'Accept': '*/*',
                    "Accept-Encoding": 'gzip, deflate, br',
                    'Connection': 'keep-alive',
                    "Access-Control-Request-Headers": "authorization,x-requested-with"
                }
            })
            .then(function (response) {
                //setAlunoRedacoes(response.data.data)
                if (alunoRedacoes == '') {
                    setAlunoRedacoes(response.data.data)
                } //else (console.log('erooo ssss'))
            })
            .catch(function () {
                return "err"
            }
            )
    }
/*
    function getProps() {
        if (alunoRedacoes != '') {
            for (let i = 0; i < alunoRedacoes.length; i++) {
                console.log(alunoRedacoes.length)
                return (<Redacoes number={alunoRedacoes[i].numero} date ={alunoRedacoes[i].created_at}/>)
            }
        } else {
            return (
                <Redacoes number="carregando..." />
            )
        }
    }
*/

function getProps() {
    if (alunoRedacoes != '') {
        return alunoRedacoes.map((value) => <Redacoes number={value.numero} date ={value.created_at}/>)
    } else {
        return (
            <Redacoes number="carregando..." />
        )
    }
}















    return (

        <View style={styles.container} >
            <StatusBar barStyle='dark-content'
                backgroundColor='#E6E1DE' />
            <TouchableOpacity style={styles.button} onPress={handleLogOut}>
                <Ionicons name="log-out-outline" size={30} style={styles.icon} />
            </TouchableOpacity>
            <View style={styles.redacaoWrapper} >
                <View style={styles.views}>
                    <Text style={styles.sectionTitle}> suas redações </Text>
                </View>
                <View style={styles.items}>
                    {getProps()}
                </View>
            </View>
            <TouchableOpacity style={styles.buttonAdd}>
                <View style={styles.addWrapper}>
                    <Text >+</Text>
                </View>
            </TouchableOpacity>
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E6E1DE',
    },
    redacaoWrapper: {
        paddingTop: 0,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        marginBottom: 20,
        fontSize: 24,
        fontWeight: '100',
        color: '#DD9FE2',
    },
    items: {
        marginTop: 0,
    },
    views: {
        alignItems: 'flex-end'
    },
    button: {
        alignItems: 'flex-start',
        width: 100
    },
    icon: {
        marginLeft: 10,
        marginTop: 20,
        transform: [{ rotateY: '180deg' }]
    },
    buttonAdd: {
        marginLeft: 320,
        marginTop: 443
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 2,
    },

});
export default Home;

