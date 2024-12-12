import { View, Text,Image } from 'react-native'
import React from 'react'

const Homeicon = () => {
  return (
    <View style={{justifyContent:'center',alignItems:'center', flexDirection:'row'}}>
      <Image style={{width:90, height:70}} source={require("../assets/mainicon.png")} tintColor={"orange"}/>
      <Text style={{fontSize:35, fontWeight:'bold', marginRight:23, letterSpacing:1}}>&nbsp;SwiftCart</Text>
    </View>
  )
}

export default Homeicon