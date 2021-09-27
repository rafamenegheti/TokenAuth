import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, StyleSheet, Text, StatusBar, ScrollView, ActivityIndicator } from 'react-native';
import Redacoes from '../components/Redacaoes';
import { AsyncStorage, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';







const Home = ({ navigation }) => {


    const [idAluno, setIdAluno] = React.useState('');
    const [accesToken, setAccesToken] = React.useState('');
    const [alunoRedacoes, setAlunoRedacoes] = React.useState('');
    const [urlRedacao, setUrlRedacao] = React.useState('');




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

    //gerencia o logOf, volta a tela e chama a função para limpar o localStorage
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


    useEffect(() => {
        getRedacoesAlunos()
    },[])


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






    //Faz o download da redacao
    function downloadFile(id) {
        const uri = id
        let fileUri = FileSystem.documentDirectory + "small.jpeg";
        FileSystem.downloadAsync(uri, fileUri)
            .then(({ uri }) => {
                alert("A redação esta sendo baixada e aparecerá na galeria em uma pasta chamada 'Recações Pontue'")
                saveFile(uri);
            })
            .catch(error => {
                console.error(error);
            })
    }



    //Salva o arquivo no dispositivo
    saveFile = async (fileUri) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === "granted") {
            const asset = await MediaLibrary.createAssetAsync(fileUri)
            await MediaLibrary.createAlbumAsync("Redacões Pontue", asset, false)
        }
    }


    //Pega a url da redacão
    const getIdRedacao = async (b, id) =>  {
        const AuthStr = 'Bearer '.concat(b);
        await axios.get(`https://desafio.pontue.com.br/redacao/${id}`,
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
                    //console.log(response.data.data.urls[0].url)
                    setUrlRedacao(response.data.data.urls[0].url)
                    //return(response.data.data.urls[0].url)
            })
            .catch(function (error) {
                console.log(error)
                console.log('bucera')
                
            }
            )
        

    }


    //deleta a redação
    const deleteRedacao = async (b, id) =>  {
        const AuthStr = 'Bearer '.concat(b);
        await axios.delete(`https://desafio.pontue.com.br/redacao/${id}/delete`,
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
                    //console.log(response.data.data.urls[0].url)
                    //setUrlRedacao(response.data.data.urls[0].url)
                    console.log(response)
                    //return(response.data.data.urls[0].url)
            })
            .catch(function (error) {
                console.log(error)
                console.log(error)
                
            }
            )
        

    }

    const handleDownload = async (id) => {
        //console.log(await getIdRedacao(accesToken, id))
        //downloadFile(idd)
        //console.log(getIdRedacao(accesToken, id))
        //console.log(id)
        //downloadFile()
        getIdRedacao(accesToken, id)
        downloadFile(urlRedacao)
    }

    const handleDelete = async (id) => {
        //console.log(await getIdRedacao(accesToken, id))
        //downloadFile(idd)
        //console.log(getIdRedacao(accesToken, id))
        //console.log(id)
        //downloadFile()
        console.log(urlRedacao)
        getIdRedacao(accesToken, id)
        deleteRedacao(accesToken, id)
        alert("Redação deletada")


    }



    //Gera o componente de acordo com as redações devolvidas pela API
    function getProps() {
        if (alunoRedacoes != '') {
            return (
                alunoRedacoes.map((value) => <Redacoes key={value.numero} id={value.id} number={value.numero} date={value.created_at} handle={ () =>  handleDownload(value.id)} handleDelete={ () =>  handleDelete(value.id)}/>)
            )
        } else {
            return (
                <View style={[styles.loading]}>
                    <ActivityIndicator size="small" color="#0000ff" />
                </View>
            )
        }
    }




    return (
        <View style={styles.container} >
            <StatusBar barStyle='dark-content'
                backgroundColor='#E6E1DE' />
            <View style={styles.header}>
                <TouchableOpacity style={styles.button} onPress={handleLogOut}>
                    <Ionicons name="log-out-outline" size={30} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonAdd}>
                    <View style={styles.addWrapper}>
                        <Text >+</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.redacaoWrapper} >
                <View style={styles.views}>
                    <Text style={styles.sectionTitle}> suas redações </Text>
                </View>
                <ScrollView>
                    <View style={styles.items}>
                        {getProps()}
                    </View>
                </ScrollView>
            </View>

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
        marginTop: -35,
        
    },
    addWrapper: {
        width: 50,
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 2,
    },
    loading: {
        flex: 1,
        backgroundColor: '#E6E1DE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'column'
    }

});
export default Home;