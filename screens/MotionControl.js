import React, { useEffect, useState } from 'react';
import {Text, StyleSheet,View,TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import { DeviceMotion } from 'expo-sensors'

export default function MotionControl({socket}) {
    
    const [data, setData] = useState({})
    const [subscription,setSubscription] = useState(null)
    DeviceMotion.setUpdateInterval(1000)
    useEffect(() => {
        setSubscription(
            DeviceMotion.addListener(({rotation})=>{
              console.log(rotation)
            }))
    },[])

    const _unsub = () => {
        subscription.remove()
        setSubscription(null)
        console.log("hehe")

    }

    return(
        
        <View style={{flex:1}}>
            <TouchableOpacity style={{height:"100%",width:"100%",backgroundColor:"skyblue",justifyContent:"center",alignItems:"center"}} 
            onPressIn={()=>{socket.emit("ktd","x");_unsub()}}
            onPressOut={()=>{socket.emit("ktu","x")}}>
                <Text style={{fontSize:100}}>a</Text>
            </TouchableOpacity>
        </View>
    )

}