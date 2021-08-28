import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,YellowBox} from 'react-native'
import io from "socket.io-client"
import { useIsFocused } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {Icon,Overlay,Input,Button} from 'react-native-elements'
import * as ScreenOrientation from 'expo-screen-orientation'

import DashboardLayout from "./DashboardLayout"

//#region Ignore Warnings
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
  ])
  //#endregion


export default function Dashboard({navigation,route}) {
    console.log("Dashboard!")
    const [socket,setSocket] = useState()
    const [pwd,setPwd] = useState("default")
    const [pwdModalVisible,setPwdModalVisible] = useState(false)
    const [pwdInput,setPwdInput] = useState("")
    const [layout,setLayout] = useState(null)
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL)

    


    const isFocused = useIsFocused()
    if(isFocused == false){
        console.log("not focused")
        if(socket != null){
            console.log("close socket")
            socket.close()
        }
    }

    useEffect(()=>{
        console.log("useEffect")
        refreshIO()
    },[pwd])

    const initIO = () => {
        console.log("initio")
        let newSocket = io(route.params.data)
        console.log("Password: "+pwd)
        if(newSocket != null){
            newSocket.on('connect',()=>{
                console.log("coonect")
                newSocket.emit('authentication',{password: pwd})

                newSocket.on('authenticated',()=>{
                    console.log("authed")
                    newSocket.emit('getlayout')
                })

                newSocket.on('unauthorized',()=>{
                    setPwdModalVisible(true)
                })

                newSocket.on('disconnect',()=>{
                    console.log("disconnected")
                })
            })
            
            newSocket.on('reconnect',()=>{
              console.log("RECONNECTED")
              newSocket.sendBuffer = []
            })
            newSocket.on('shutdown',()=>{
              console.log("SHUTTING DOWN")
              newSocket.disconnect()
            })
            newSocket.on('reconnect_attempt',()=>{
              console.log("FUSSS")
            })
            newSocket.on("layout",(arg)=>{
                setLayout(arg)
            })
        }
        setSocket(newSocket)
    }

    const refreshIO = () => {
        console.log("refresh")
        if(socket != null){
            socket.close()
        }
        initIO()
    }

    if(layout!=null){
        if(layout.portrait === false){
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
        }
        if(layout.portrait === true){
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
        }
    }

    return(
        <View style={{flex:1}}>
            <Overlay
            isVisible={pwdModalVisible}
            animationType="fade"
            width="auto"
            height="auto"
            borderRadius={10}
            containerStyle={styles.modalContainer}>
                <View>
                    <Text style={styles.modalTitle}>Enter the password</Text>
                    <Input secureTextEntry={true} 
                    autoCapitalize="none"
                    onChangeText={(text)=>{setPwdInput(text)}}
                    onSubmitEditing={({nativeEvent})=>{
                        setPwdModalVisible(false)
                        setPwd(nativeEvent.text)
                    }}/>
                    <View style={styles.buttonsView}>
                        <Button
                        title="Cancel"
                        type="outline"
                        onPress={()=>{
                            setPwdModalVisible(false)
                            navigation.goBack()}}
                        />
                        <Button
                        title="Enter"
                        type="outline"
                        onPress={()=>{
                            setPwdModalVisible(false)
                            setPwd(pwdInput)
                        }}
                        />
                    </View>
                </View>
            </Overlay>
            <DashboardLayout socket={socket} layout={layout}/>
        </View>
    )

}

const styles = StyleSheet.create({
    refreshIcon: {
      paddingRight:20
    },
    modalContainer:{
      flex:1,
      justifyContent:"center",
      alignItems:"center",
    },
    buttonsView:{
        flexDirection:"row",
        justifyContent:"space-around",
        margin:10
    },
    buttonStyle:{
        margin:10
    },
    modalContainer:{
      flex:1,
      justifyContent:"center",
      alignItems:"center",
    },
    modalTitle:{
      alignSelf:"center",
      padding:10,
      fontSize:20
    },
  });