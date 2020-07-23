import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, } from 'expo-camera';
import {IconButton} from 'react-native-paper'
import {pantalla} from '../constantes/Temas'

export default function App(props) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [ref, setRef] = useState(null)
    const {navigation} = props

    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    const TakePhoto = async()=>{
        const photo = await ref.takePictureAsync(); 
        navigation.navigate('Gestion', {photo})
    }

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No hay acceso a la cámara</Text>;
    }
    return (
        <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={type} ref={(ref)=> setRef(ref)} >
                <View
                style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                }}>
                
                <View style={{alignSelf:"flex-end", flex:0.1, marginLeft:pantalla.screenHeight/4.5}} >
                    <IconButton  style={{alignSelf:'flex-start'}} icon='camera'size={40} onPress={()=>TakePhoto()} />
                </View>
                </View>
            </Camera>
        </View>
    );
}

/* 
<TouchableOpacity
                    style={{
                    flex: 0.1,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    }}
                    onPress={() => {TakePhoto()}}
                >
                    <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
                </TouchableOpacity>
*/