import React, {useEffect, useState} from 'react'
import { 
    View, 
    Text,
    StyleSheet,
    Button
} from 'react-native'
import  MapView,
    {Marker,
} from 'react-native-maps'; 
import * as Location from 'expo-location';
import {colores} from '../constantes/Temas'


function Map(props){
    const [ubicacioInicial, setUbicacioInicial] = useState(null)
    const [errorUbicacion, setErrorUbicacion]= useState('')
    const {navigation} = props

    useEffect(()=>{
        //Pedir permisos de ubicación
        getAsyncPosition()
    },[])

    const getAsyncPosition = async() =>{
        const { status } = await Location.requestPermissionsAsync();
        if (status !=='granted'){
            setErrorUbicacion('La ubicación ha sido denegada')
        }

        const posicion = await Location.getCurrentPositionAsync({});
        setUbicacioInicial({
            latitude: posicion.coords.latitude,
            longitude: posicion.coords.longitude,
            latitudeDelta: 0.06, /*0.0922*/
            longitudeDelta: 0.06, /*0.0421*/
        })

    }

    return (
        <View style={styles.container} >
            {
                ubicacioInicial !== null ?
                    <View style={styles.principalView} >
                        <View style={styles.viewMap} >
                            <MapView
                                initialRegion={ubicacioInicial}
                                showsUserLocation={true}
                                style={{flex:1}}
                            >
                                
                            </MapView>
                        </View>
                        <View style={styles.vewButtons} >
                            <View style={styles.button} >
                                <Button title='Cancelar' color={colores.rojo} onPress={()=>navigation.navigate('Gestion')} />
                            </View>
                            <View style={styles.button} >
                                <Button title='Guardar' onPress={()=>navigation.navigate('Gestion', {Direccion: ubicacioInicial})} />
                            </View>
                        </View>
                    </View>
                :
                <Text> {errorUbicacion} </Text>
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop:20, 
        flex:1
    },
    principalView:{
        flex:1
    },
    viewMap:{
        flex:15
    },
    vewButtons:{
        flex:1, 
        flexDirection:'row', 
        marginTop:5
    },
    button:{
        flex:1, 
        marginHorizontal:'2%'
    }
})

export default Map