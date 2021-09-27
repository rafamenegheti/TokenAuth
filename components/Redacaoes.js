import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';





const Redacoes = (props) => {
    return (
        <View style={styles.item} resizeMode="cover" >
            <View style={styles.itemLeft}>
                <Text style={styles.itemText}>Numero: {props.number}</Text>
                <Text style={styles.itemText}>ID: {props.id}</Text>
                <Text style={styles.itemText}>Criado em: {props.date}</Text>
            </View>
            <View style={styles.itemRight}>
                <TouchableOpacity style={styles.button}>
                    <Ionicons name='trash-outline' size={25} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Ionicons name='create-outline' size={25} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={props.handle}>
                    <Ionicons name='download-outline' size={25} style={styles.icon} />
                </TouchableOpacity>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 20
    },
    itemLeft: {
        maxWidth: '70%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        flexWrap: 'wrap'
    },
    itemRight: {
        position: 'absolute',
        marginLeft: 220,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: 0
    },
    button: {
        borderRadius: 100,
        alignItems: 'center',
        width: 40,
        height: 37,
        backgroundColor: '#FFF',
        opacity: 0.4
    },
    itemText: {
        maxWidth: '100%',

    },
    buttonText: {
        marginTop: 8
    },
    icon: {
        marginTop: 4,
        marginLeft: 20
    }

});

export default Redacoes;