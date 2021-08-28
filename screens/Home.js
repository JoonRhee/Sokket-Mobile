import React,{useState} from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import {Overlay,Button } from 'react-native-elements'
import { BarCodeScanner } from 'expo-barcode-scanner'
import * as ScreenOrientation from 'expo-screen-orientation'
import { useFocusEffect } from '@react-navigation/native';

export default function Home({navigation,route}) {

  console.log("Home!")
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(()=>{
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
  })

  const test = () =>{
    console.log("test")
  }

  const Item = () =>{
    return(
      <View style = {styles.itemContainer}>
        <TouchableOpacity style = {styles.item}>
          <Text style = {styles.itemTitle}>asd</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.item}>
          <Text style = {styles.itemTitle}>asd</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const handleBarCodeScanned = ({ type, data }) => {
    console.log(data)
    console.log(Math.random())
    
    setModalVisible(false)
    navigation.navigate('Dashboard',{data: data,type: type})
  }

  const openModal = async () => {
    BarCodeScanner.requestPermissionsAsync().then(({status})=>{
      let hasPermission = (status === 'granted')
      if(hasPermission){
        setModalVisible(true)
      }else{
        alert("Reeee")
      }
      
    })
  }
  
  const closeModal = () => {
    setModalVisible(false)
  }

  return (
    <ScrollView style = {styles.container}>

      {/*
      <Modal
      animationType="slide"
      transparent={true}
      onBackdropPress={onClosePress}
      visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.cameraContainer}>
              <BarCodeScanner style={styles.cameraStyle}></BarCodeScanner>
            </View>
            <TouchableOpacity onPress = {onClosePress}>
              <Text>cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      */}

      <Overlay
      isVisible={modalVisible}
      animationType="fade"
      width="auto"
      height="auto"
      borderRadius={10}
      containerStyle={styles.modalContainer}
      onBackdropPress={closeModal}>
        <View>

          <Text style={styles.modalTitle}>Scan The QR Code!</Text>
          <View style={styles.cameraContainer}>
            <BarCodeScanner style={styles.cameraStyle} onBarCodeScanned={handleBarCodeScanned}/>
          </View>
          <Button
          title="Close"
          type="clear"
          onPress={closeModal}/>
        </View>

      </Overlay>

      <Text style={styles.titleText}>Welcome to Sokket!</Text>
      <TouchableOpacity style = {styles.scanContainer} onPress = {openModal}>
        <Text style = {styles.scanTitle}>Scan!</Text>
      </TouchableOpacity>
    </ScrollView>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemContainer:{
    borderRadius:10,
    backgroundColor:"white",
    margin:10,
    flexDirection:"row"
  },
  item:{
    margin:10
  },
  itemTitle:{
    fontSize:20
  },
  titleText:{
    fontSize:40,
    alignSelf:"center"
  },
  scanTitle:{
    fontSize:50,
    alignSelf:"center"
  },
  scanContainer:{
    borderRadius:10,
    backgroundColor:"white",
    margin:10,
    alignItems:"center"
  },
  cameraStyle:{
    width:400,
    height:400,
    backgroundColor:"green",
    justifyContent:"center",
    alignSelf:"center"
    
  },
  cameraContainer:{
    width:300,
    height:300,
    borderRadius:10,
    overflow:"hidden",
    backgroundColor:"green",
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
  modalContainer:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  },
})
