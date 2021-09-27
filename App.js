//import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'


// screens
import Login from './screens/Login';
import Home from './screens/Home';
import RedacaoConteudo from './screens/RedacaoConteudo';

const Stack = createNativeStackNavigator();


export default function App() {



  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000)
  }, [])

  if( loading ) {
    return(
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    )
  }
  return(

    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen component={ Login } name="Login" options={{headerShown: false}}/>
      <Stack.Screen component={ Home } name="Home" options={{headerShown: false}}/>
      <Stack.Screen component={ RedacaoConteudo } name="RedacaoConteudo" options={{headerShown: false}}/>
    </Stack.Navigator>
    </NavigationContainer>

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
