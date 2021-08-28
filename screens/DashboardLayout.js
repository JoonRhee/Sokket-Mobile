import React from 'react';
import {Text, StyleSheet,View,TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import SokketSlider from './SokketSlider'
import MotionControl from './MotionControl'


export default function DashboardLayout({socket,layout}) {
    if(layout == null){
        return(
            <Text>fk</Text>
        )
    }
    return(
        <View style={{flex:1}}>
                
            <View style={{flex:1}}>
                <TouchableOpacity style={{height:"100%",width:"100%",backgroundColor:"pink",justifyContent:"center",alignItems:"center"}} 
                onPressIn={()=>{socket.emit("ktd","z")}}
                onPressOut={()=>{socket.emit("ktu","z")}}>
                    <Text>z</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex:1}}>
                <TouchableOpacity style={{height:"100%",width:"100%",backgroundColor:"skyblue",justifyContent:"center",alignItems:"center"}} 
                onPressIn={()=>{socket.emit("ktd","x")}}
                onPressOut={()=>{socket.emit("ktu","x")}}>
                    <Text style={{fontSize:100}}>x</Text>
                </TouchableOpacity>
            </View>
            <MotionControl socket = {socket}></MotionControl>
        </View>
  )
}


const styles = StyleSheet.create({
  refreshIcon: {
    paddingRight:20
  }
});
