import React, {useEffect, useState} from 'react'
import { 
    View, 
    Text,
    StyleSheet,
    StatusBar, 
    TextInput,
    Button,
    ScrollView,
    Alert,
    Image
} from 'react-native'
import { IconButton} from 'react-native-paper'
import useForm from '../hooks/useForm'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const initialValues ={
    NombreTienda:'Seleccione la tienda',
    Telefono:'Numero de teléfono',
    Direccion: 'Direccion de la tienda',
    Producto: 'Producto',
    Valor:0
}

function Gestion(props){
    const form = useForm({initialValues})
    //console.log(form.fields)
    const {navigation} = props
    const {params} = props.route

    const [photos, setPhotos]=useState(null)
    const [trigger, setTrigger]= useState(false)
    const {Direccion} = params

    
    useEffect(()=>{
        if (params.Direccion || params.photo){
            const {photo} = params
            const helper = photos ? photos : []
            console.log('photo', photo)
            console.log('helper')
            if (photos === null){
                helper.push(photo)
                setPhotos(helper)
            }else{
                if ((photo.uri !== helper[ helper.length -1 ].uri)){
                    helper.push(photo)
                    setPhotos(helper)
                }
            }
        }
        //setTrigger(trigger+1)
    }, [params.photo, navigation, trigger])
    //[params.photo, photos]

    return(
    

        <View style={styles.container} >
            
            <View style={styles.clienteInfo} >

            </View>

            <KeyboardAwareScrollView>
                <View style={styles.form} >
                    <View style={styles.vewInput} >
                        <IconButton style={styles.icon} icon='account' ></IconButton>
                        <TextInput
                            placeholder='Numero de telefono' 
                            {...form.getTextInput('Telefono')} 
                            style={styles.textInput}
                            keyboardType='name-phone-pad'
                            textContentType='telephoneNumber'
                            placeholderTextColor='#0008'
                            
                        >
                        </TextInput>
                    </View>
                    <View style={styles.vewInput} >
                        <TextInput
                            placeholder='Direccion'
                            {...form.getTextInput('Direccion')}
                            style={styles.textInput}
                            placeholderTextColor='#0008'
                        />
                        <IconButton style={styles.icon} icon='google-maps' color={Direccion !== null ? 'green' : 'purple'  } onPress={()=> navigation.navigate('Map') } ></IconButton>
                    </View>
                    <View style={styles.vewInput} >
                        <IconButton style={styles.icon} icon='cart' ></IconButton>
                        <TextInput
                            placeholder='Poducto'
                            {...form.getTextInput('Producto')}
                            style={styles.textInput}
                            placeholderTextColor='#0008'
                            textAlignVertical='center'
                            
                        />
                        
                    </View>
                </View>
            </KeyboardAwareScrollView>

            <View style={styles.viewImages} >
                <View style={{flex:1}}>
                            {
                                photos && (
                                    <ScrollView horizontal onMomentumScrollEnd={()=> setTrigger(!trigger)} >
                                        {photos.map((x,i)=> (
                                            <ViewPhotos uri={x.uri} key={i} />
                                            )
                                        )}
                                    </ScrollView>
                                    
                                )
                            }
                </View>
            </View>

            <View style={styles.viewButton} >
                <View style={{flex:1, alignSelf:'center', flexDirection:'row'}} >
                    <IconButton  icon='camera' onPress={()=> navigation.navigate('Camara')} />
                    <IconButton icon='forum-outline' onPress={()=> navigation.navigate('Chat')} />
                </View>
                <View>

                </View>
                <View style={{flex:2}} >
                    <Button title='Ingresar gestion' style={styles.button} />
                </View>
            </View>
        </View>
    )
}

function ViewPhotos(props){
    const {uri} = props
    return(
        <View style={{flex:1, marginHorizontal:4}} >
            {/* <Text>tew</Text> */}
            <Image style={{flex:1, width:100, height:100}} source={{uri}} ></Image>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        marginTop: StatusBar.currentHeight, 
        flex:1
    },
    clienteInfo:{
        flex:5,
        borderColor:'#0005',
        borderWidth:1,
        marginHorizontal:'3%'
    },
    form:{
        flex:9
    },
    vewInput:{
        flex:1, 
        flexDirection:'row', 
        marginTop:5,
        borderBottomWidth:1, 
        borderColor:'#0008',
        marginHorizontal:'5%',
    },
    textInput:{
        flex:9,
        textShadowColor:'red',
        
    },
    icon:{
        flex:1
    },
    textInputText:{
        color:'#0006'
    },
    viewImages:{
        flex: 4,
        //backgroundColor:'green',
    },
    button:{
        flex:1, 
        marginHorizontal:'2%'
    },
    viewButton:{
        flex:1,  
        marginTop:10,
        marginHorizontal:'2%',
        marginBottom:'5%',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    imagesContainer:{
        flex:1, 
        flexDirection:'row'
    }
})

export default Gestion