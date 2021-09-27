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
    const [alunoRedacoes, setAlunoRedacoes] = React.useState({});

    //useEffect para atualizar a variavel de estado
/*
    useEffect(() => {
    }, [idAluno]);
*/


    //Pega as informções que estao no localStorage
    getCacheValues = async () => {
        try {
            const value = await AsyncStorage.getItem('alunoId');
            if (value !== null) {
                return JSON.parse(value)
            } else {
                return "sla"
            }
        } catch (error) {
        }
    };




    getCacheValues()
    console.log(getCacheValues())





    //gerencia o logOf, volta a tela e chama a função para limpar o cache
    function handleLogOut() {
        cleanCache();
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    }


    //Limpa informações do localStorage
    async function cleanCache() {
        try {
            await AsyncStorage.clear()
        } catch (error) {
            // Error saving data
        }
    };





    const getRedacoesAlunos = async () => {
        const AuthStr = 'Bearer '.concat("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVhZDM2M2QwZWRhZDkxZGMzNWZjMzllMzE1OTJlNTQ3MDQ2MmE2YjZiYjQ0OTI2MjJhYjUyYWEzZDA0ZDE1MzljNjQ4NjE3Yjg4YmU3MGM2In0.eyJhdWQiOiI0OTI5Njg4MC1hOTA5LTExZWItODE4MS0yN2RhYTkyNTQ4MTciLCJqdGkiOiJlYWQzNjNkMGVkYWQ5MWRjMzVmYzM5ZTMxNTkyZTU0NzA0NjJhNmI2YmI0NDkyNjIyYWI1MmFhM2QwNGQxNTM5YzY0ODYxN2I4OGJlNzBjNiIsImlhdCI6MTYzMjY5OTI5NiwibmJmIjoxNjMyNjk5Mjk2LCJleHAiOjE2NjQyMzUyOTYsInN1YiI6ImVmMzM0NGUwLTY2NGEtMTFlYi05OTBjLWNmNzA3MTdiMTQ2ZCIsInNjb3BlcyI6W119.DNVk6nLbYWb1VG2NtOOS50dlsF4hlMh9FVItnVwTGUlvU84S60IoVuc2QycMqP_ujoGmNLc6ogmc5FtQAFxeXdPJaHaAR81HZsd1uDtgSGsOBkMQmuxBQhVuvFlcrxYPz9xEgTJYMgeQWPaVuVf4T4okByfz9N7YCLQt237IkrTqLtBzT4DwAZdEis8rq8fbcI1RjH9Mzzoa_wfICl6j7mZYfIuSl12Fg9AEWJ6ZC0SR7KmhZeG-EuIxaNvRh-djrih3uEcoaGJg-TSy5JDKSPXYLPetDsRR8PGmkS5W8fwJrZ-cWxBWy3FztINpwWU85WV0LSCGQrIq_mOeLFivdlV0wH0tBgOJEgEAKkLyMq6Jg7t6N_DvL-7pmSQRO1W7gguv_FeQjIjXLrK0QiKpTuW80-E2hqoeWGdhgjaQUxbEUa_96JKIZfMWm81fay-fpwoJzRrMT_4rt-N20Mv2DimMI3sKbk_cFDCxLOlIJcVeQmXVB5JWF1pcf5oHtnrR4woJ6BDKqePtYEsMNTnZJNkAhtAqeoEkLmqqoH4ygloV_9aiuhnugKbVMgFHY3PEZqy4fgtNLUC_SRAOjuMrQrdzKZ-_kqdQ34k7hzzES4XCDAJIXrkydqIuBAwniq_QO8tSmRBrLxdKPc0mYYi3r5yqfcK6FBa5UbnML4m67Bs");
        let res = await axios.get(`https://desafio.pontue.com.br/index/aluno/ef0c1f20-664a-11eb-9dbc-91c7d6b63ffc`,
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
        let data = await res.data;
        setAlunoRedacoes(data)
    }

    getRedacoesAlunos()
   

    console.log(typeof alunoRedacoes)






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

                        <Redacoes  />
 
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

