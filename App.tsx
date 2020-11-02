import React, { useState,useRef } from 'react';
import {
  View,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  TextInput,
  ImageBackground,
  Image,
  Animated,
} from 'react-native'
import TextInputBox from './TextInputBox';
import Icons from 'react-native-vector-icons/FontAwesome5'

const App = (props) => {

  const [username, setUsername] = useState('');
  const [pawd, setPswd] = useState('');
  const [result, setResult] = useState({
    error: false,
    msg: 'success'
  });
  const [showpwd, setShowpwd] = useState(false);

  const fadeAnimation = useRef(new Animated.Value(0)).current;
  // const [val, setVal] = useState({
  //   username : '',
  //   password: '',
  // })


  const Animatedfade = ()=>{
    Animated.timing(fadeAnimation,{
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    setTimeout(()=>{
      Animated.timing(fadeAnimation,{
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    },4000)
  }

  const handleClick = () => {
    // validation or api backend
    if (username === 'admin' && pawd === '1234') {
      console.log('validation success');
      setResult({
        error: false,
        msg: 'Success'
      })
      Animatedfade();
      setTimeout(()=>{
        props.navigation.navigate('Dashboard');
      },5000)
    } else {
      console.log('validation failed');
      setResult({
        error: true,
        msg: 'Error Occured'
      });
      Animatedfade();
    }
    console.log(username, pawd)
    // Alert.alert("You have submitted !!!");
  }

  const handleReset = () => {
    setUsername('');
    setPswd('');
  }
  return (
    <ImageBackground source={require('./assets/bg.jpg')} style={styles.container} resizeMode="cover">

      {/* image container */}
      <View style={{
        alignItems: "center",
        margin: 10
      }}>
        <Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} style={{
          width: 50,
          height: 50,
          borderRadius: 100
        }} />
      </View>
      {/* username container */}
      <View style={{
        flexDirection: 'row',
        backgroundColor: "white",
        borderRadius: 10,
        margin: 5,
        justifyContent: "space-around",
        alignItems: "center"
      }}>
        <Icons
          name="user"
          size={20}
          color="red"
        />
        <TextInputBox
          placeholder="username"
          secureTextEntry={false}
          autofocus={true}
          val={username}
          setVal={(e) => setUsername(e)}
        />
      </View>
      {/* password container */}
      <View style={{
        flexDirection: 'row',
        backgroundColor: "white",
        borderRadius: 10,
        margin: 5,
        justifyContent: "space-around",
        alignItems: "center"
      }}>
        <Icons
          name={showpwd ? "eye-slash" : "eye"}
          size={20}
          color="red"
          onPress={()=> setShowpwd(!showpwd)}
        />
        <TextInputBox
          placeholder="password"
          secureTextEntry={showpwd ? false : true}
          autofocus={false}
          val={pawd}
          setVal={(e) => setPswd(e)}
        />
      </View>
      {/* button container */}
      <View style={{
        flexDirection:'row',
        justifyContent: "center"
      }}>
        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={handleClick}>
          <Text style={styles.textStyle}>submit</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={handleReset}>
          <Text style={styles.textStyle}>Reset</Text>
        </TouchableHighlight>
      </View>

      {/* animated container */}
      <Animated.View style={{
        width: "100%",
        height: 50,
        padding: 10,
        backgroundColor: result.error ? "red" : "green",
        opacity: fadeAnimation,
      }}>
        <Text style={{
          textAlign: "center",
          fontFamily: "Montserrat-SemiBold",
          letterSpacing: 3,
          color: "white",
          fontSize: 15
        }}>{result.msg}</Text>
      </Animated.View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  buttonContainer: {
    backgroundColor: "red",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    margin: 10
  },
  textStyle: {
    color: "white",
    fontSize: 13,
    textTransform: "uppercase",
    fontFamily:"Montserrat-Regular"
  }
})

export default App;
