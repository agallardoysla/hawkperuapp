import React, {useEffect, useState, useRef} from 'react'
import { 
    View, 
    Text,
    StyleSheet,
    StatusBar, 
    TextInput,
    Button,
    ScrollView,
} from 'react-native'
import { IconButton, Title} from 'react-native-paper'
import firebase from 'firebase'
import Mensaje from '../components/Mensaje'
import moment from 'moment'
import {firebaseApp} from '../apis/firebase'

const fireChat = firebase.firestore(firebaseApp).collection('ChatEmpleados')
//const fireChat = firebase.database(firebaseApp).ref('ChatEmpleados')


function Chat(props){

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const chatScrollRef = useRef()
    const p=null

    const sendMessage = () =>{
        if (message.length > 1){
            fireChat
            .doc().set({
                userName:'Usuario',
                text: message,
                time: moment().format('hh:mm a')
            })
            setMessage('')
        }
        /* if (message.length > 1){
            fireChat
            .push({
                userName:'User',
                text: message,
                time: moment().format('hh:mm a')
            })
            setMessage('') 
        }*/
    }

    useEffect(()=>{
        fireChat
        .onSnapshot(//{includeMetadataChanges: true,},
            (querySnapshot)=>{ //querySnapshot   docs
            let values=[]
            querySnapshot.docChanges().forEach((x)=>{
                values.push(x.doc.data())
                //console.log(x.doc.data())
            })
            if (values === null){
                setMessages(values)
            }else{
                setMessages({...messages, [messages.length]: values})
            }
            
            /* docs.forEach((doc)=>{values.push(doc.data())})
            setMessages(values) */
            //console.log(values)
            //setMessages(values)
        })
        /* fireChat
        .on('value', snapshot => {
            let values = []
            snapshot.forEach((x)=> values.push(x.val()))
            setMessages(values)
        }) */
    },[])

    useEffect(()=>{
        chatScrollRef.current.scrollTo({y: 1000000})
    },[messages])

    return(
        <View style={{flex:1, marginTop:StatusBar.currentHeight}} >
            <View style={{flex:1,backgroundColor:'rgba(43,4,84,0.8)',}} >
                <Title style={{textAlign:'center', color:'#fff', marginTop:10}} >
                    FireChat
                </Title>
            </View>
            <View style={{flex:8, }} >
                <ScrollView style={{marginTop:10,marginBottom:1, }} ref={chatScrollRef}  >
                    {messages && (
                        messages.map((message, index)=>(
                            <Mensaje key={index} message={message} name={'Usuario'} />
                        ))
                    )}
                </ScrollView>
            </View>
            <View style={{flex:1, flexDirection:'row'}} >
                <View style={{flex:10}} >
                    <TextInput 
                        style={{backgroundColor:'#fff',}} 
                        placeholder='Envía un mensaje' 
                        onChangeText={(text)=> setMessage(text) }
                        value={message}
                    />
                </View>
                <View style={{flex:2, alignSelf:'center', }} >
                    <IconButton icon="send" onPress={()=>sendMessage()} />
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    viewTitle:{
        //marginTop:120,
        alignSelf:'center',
        width:'100%',
        height:'5%',
        backgroundColor:'rgba(43,4,84,0.8)',
        flex:1,
        marginVertical:'5%',
        marginHorizontal:'5%'
    },
    title:{
        fontSize: 25,
        textAlign:'center',
        color:'gray',
    },
    container:{
        justifyContent:'space-between',
        flex:1,
        flexDirection:'column'
    },
    viewFooter:{
        //marginTop:height-110,
        //flex:1,
        flexDirection:'row',
        //justifyContent:'flex-end',
        marginVertical:'10%',
        marginHorizontal:'1%',
        alignItems:'center',
        flex:1,
        backgroundColor:'red'
    },
    viewTextInput:{
        borderColor:'gray',
        borderWidth:1,
        //width:'85%',
        flex:2
    },
    viewButton:{
        flex:1,
        alignSelf:'center',
        height:'100%'
    },
    button:{
        /* textAlign:'center',
        alignSelf:'center', */
        flex:1
    }
})

export default Chat