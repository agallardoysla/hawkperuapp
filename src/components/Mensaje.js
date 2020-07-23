import React,{useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { Title, Text} from 'react-native-paper'
import UserColors from '../constantes/ColoresChat'

export default function Message(props){
    const {message:{userName, text, time}, name} = props
    const myMessage = name === userName ? true : false
    const [bgChatColor, setBgChatColor]=useState(null)

    useEffect(()=>{
        const char = userName.trim()[0].toUpperCase()
        const indexChart = char.charCodeAt()-65
        setBgChatColor(UserColors[indexChart])
    })
    return(
        <View style={{...styles.container, justifyContent: myMessage ? 'flex-end' : 'flex-start',}} >
            <View style={{...styles.viewMessage, backgroundColor: myMessage ? 'rgba(10,70,234, 0.5)' : `rgba(${bgChatColor},0.7)` }} >
                {
                    myMessage ?
                    <Text style={{textAlign:'right', marginRight:5}} >Tu</Text>
                    :
                    <Text style={{textAlign:'left',marginLeft:5}} > {userName} </Text>
                }
                <Text style={{...styles.message, textAlign: myMessage ? 'right' : 'left'}} >
                    {text}
                </Text>
                <Text style={{...styles.time, textAlign: myMessage ? 'left' : 'right'}} >
                    {time}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        margin:7,
        alignItems:'center'
    },
    viewMessage:{
        minHeight:30,
        minWidth:'30%',
        maxWidth:'80%',
        borderRadius:12,
    },
    message:{
        padding:5,
        fontSize:20
    },
    time:{
        fontSize:15,
        marginHorizontal:'5%'
    }
})