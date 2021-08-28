import React,{useState} from 'react';
import {View,Slider} from 'react-native';


export default function SokketSlider({socket,layout,vertical}) {
    const [viewH,setViewH] = useState()
    const [viewW,setViewW] = useState()
    console.log(viewH)
    console.log(viewW)
    if(vertical){
        
        return(
            <View style ={{alignItems:"center",justifyContent:"center",flexDirection:"row",width:viewW}}>
                <View style={{height:"100%"}} onLayout={({nativeEvent})=>{
                        setViewH(nativeEvent.layout.height)
                    }}></View>
                <Slider
                    style={{rotation:-90,width:viewH}}
                    onLayout={({nativeEvent})=>{
                        setViewW(nativeEvent.layout.height)
                    }}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    />
            </View>
        )
    }else{
        return(
            <Slider
            onLayout={({nativeEvent})=>{
                setViewW(nativeEvent.layout.height)
            }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
            />
        )
    }
}