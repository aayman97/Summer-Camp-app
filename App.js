import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, StyleSheet, Text, View, Dimensions, Image, Animated, Platform, TextInput, ImageBackground } from 'react-native';
import { AntDesign, Fontisto, Ionicons, FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler'
const { height, width } = Dimensions.get('screen')
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();


const SPACING = 3;


const data = [
  {
    name: "blank",
    image: ""
  },
  {
    name: "Alice Park Lake 1",
    image: [require('./assets/Lake1.jpg'), require('./assets/Lake2.jpg'), require('./assets/Lake3.jpg')]
  },
  {
    name: "Alice Park Lake",
    image: [require('./assets/Lake2.jpg'), require('./assets/Lake1.jpg'), require('./assets/Lake3.jpg')]
  },
  {
    name: "Alice Park Lake 2",
    image: [require('./assets/Lake3.jpg'), require('./assets/Lake2.jpg'), require('./assets/Lake1.jpg')]
  },
  {
    name: "Alice Park Lake 3",
    image: [require('./assets/Lake4.jpg'), require('./assets/Lake1.jpg'), require('./assets/Lake3.jpg')]
  },
  {
    name: "blank",
    image: ""
  },
]

const Home = ({ navigation }) => {

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const flatlistRef = React.useRef()
  const itemSize = Platform.OS === 'ios' ? (width > 1200 ? width * 0.4 : width * 0.73) : (width > 800 ? width * 0.35 : width * 0.7);



  return (
    <View style={styles.container}>
      <View style={{
        width,
        flexDirection: 'row',
        height: itemSize * 0.4,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: itemSize * 0.04,
        marginTop: Platform.OS === 'ios' ? '10%' : '3%'
      }}>
        <View style={{
          flexDirection: 'row', width: width > 800 ? '85%' : '78%', alignItems: 'center', borderRadius: 50,
          justifyContent: 'space-between', backgroundColor: 'white', height: '50%', paddingHorizontal: 20,
          shadowOpacity: 0.2, shadowRadius: 5, shadowOffset: {
            height: 2
          }, elevation: 20,
        }}>
          <AntDesign name="search1" size={35} color="#5e8092" />
          <TextInput placeholder="Search" style={{ fontSize: 20, width: width > 800 ? '90%' : '78%', fontWeight: 'bold' }} />
        </View>

        <TouchableOpacity style={{
          width: width > 800 ? width * 0.11 : width * 0.15,
          backgroundColor: '#5e7f93',
          height: "50%",
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10
        }}>
          <FontAwesome name="sliders" size={32} color="white" />
        </TouchableOpacity>
      </View>

      <Text style={{
        alignSelf: 'flex-start',
        marginLeft: itemSize * 0.05,
        fontSize: 26,
        fontWeight: 'bold'
      }}>Choose Your Campsite</Text>

      <Animated.FlatList
        ref={flatlistRef}
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.key}
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0}
        contentContainerStyle={{ alignItems: 'center', bottom: '12%' }}
        snapToInterval={itemSize}
        snapToAlignment='start'
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {

          const inputRange = [
            (index - 2) * itemSize,
            (index - 1) * itemSize,
            index * itemSize,
          ];

          const heightAnimation = scrollX.interpolate({
            inputRange,
            outputRange: [itemSize * 1.2, itemSize * 1.5, itemSize * 1.2],
          });

          const heightAnimationForTablet = scrollX.interpolate({
            inputRange,
            outputRange: [itemSize * 1, itemSize * 1.55, itemSize * 1],
          });

          const opacityAnimation = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });

          const bottomAnimation = scrollX.interpolate({
            inputRange,
            outputRange: ["18%", "-18%", "18%"],
            extrapolate: 'clamp'
          });

          const bottomAnimationForTablet = scrollX.interpolate({
            inputRange,
            outputRange: ["18%", "-20%", "18%"],
            extrapolate: 'clamp'
          });

          if (index === 0) {
            return <View style={{ width: (width - itemSize) / 2 }} />;
          }
          else if (index === data.length - 1) {
            return <View style={{ width: (width - itemSize) / 2 }} />;
          }
          else {

            return (
              <Animated.View style={{
                width: itemSize,
                position: 'relative',
                opacity: 1
              }}>
                <Animated.View
                  style={{
                    marginHorizontal: SPACING,
                    padding: SPACING * 2,
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderRadius: 34,
                  }}
                >
                  <Animated.Image
                    source={item.image[0]}
                    style={{
                      width: '100%',
                      height: width > 800 ? heightAnimationForTablet : heightAnimation,
                      resizeMode: 'cover',
                      borderRadius: 24,
                      margin: 0,
                      marginBottom: 10,
                    }}
                  />

                  <Animated.View style={{
                    position: 'absolute',
                    width: '80%',
                    height: width > 800 ? '42%' : '45%',
                    backgroundColor: 'white',
                    borderRadius: 24,
                    bottom: width > 800 ? bottomAnimationForTablet : bottomAnimation,
                    opacity: opacityAnimation,
                    shadowOpacity: 0.6,
                    shadowRadius: 5,
                    elevation: 5,
                    padding: 15,
                  }}>

                    <Text style={{
                      color: 'black',
                      fontSize: 17
                    }}><AntDesign name="star" size={24} color="#e69a3c" /> 4.8</Text>

                    <Text style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      marginTop: Platform.OS === 'android' ? 7 : 10,
                    }}>{item.name}</Text>

                    <Text style={{ fontWeight: 'bold', fontSize: 15, marginTop: Platform.OS === 'android' ? "6%" : "5%", }}>$35 <Text style={{ fontWeight: '300' }}>per night</Text></Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 15, marginTop: Platform.OS === 'android' ? "2%" : "3%", }}>8 <Text style={{ fontWeight: '300' }}>guests max</Text></Text>

                    <TouchableOpacity style={{
                      backgroundColor: '#435952',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: Platform.OS === 'android' ? 9 : 13,
                      borderRadius: 20,
                      marginTop: Platform.OS === 'android' ? "6%" : "8%",
                    }}

                      onPress={() => {
                        navigation.navigate('Details', { image: item.image, name: item.name })
                      }}
                    >

                      <Text style={{ color: 'white', fontWeight: '600', fontSize: 15 }}>Explore</Text>
                    </TouchableOpacity>
                  </Animated.View>

                  <Animated.View style={{
                    position: 'absolute',
                    width: itemSize * 0.17,
                    height: itemSize * 0.17,
                    borderRadius: 100,
                    backgroundColor: 'rgba(79,82,67,255)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    left: '80%',
                    top: '5%',
                    opacity: opacityAnimation
                  }}>
                    <TouchableOpacity>
                      <AntDesign name="heart" size={24} color="white" />
                    </TouchableOpacity>
                  </Animated.View>
                </Animated.View>


              </Animated.View>
            );
          }

        }}
      />
    </View>
  );
}

const Details = ({ route, navigation }) => {

  const { image, name } = route.params;
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const itemSize = Platform.OS === 'ios' ? (width > 1200 ? width * 0.4 : width * 0.73) : (width > 800 ? width * 0.35 : width * 0.7);
  return (

    <View style={{
      position: 'absolute',
    }}>
      <Animated.FlatList
        data={image}
        keyExtractor={(_, i) => { return i }}
        horizontal
        pagingEnabled={true}
        snapToInterval={width}
        decelerationRate="fast"
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          return (
            <ImageBackground style={{ width, height: height * 0.60 }} source={item}>

            </ImageBackground>
          )
        }}
      />


      <View style={{
        flexDirection: 'row',
        position: 'absolute',
        top: '73%',
        left: '40%'
      }}>
        {
          image.map((item, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width
            ]

            const outputRange = [0.4, 1, 0.4]
            const opacityAnimation = scrollX.interpolate({
              inputRange,
              outputRange,
              extrapolate: 'clamp'
            })
            return (
              <Animated.View style={{
                width: itemSize * 0.03,
                height: itemSize * 0.03,
                borderRadius: itemSize * 0.1,
                backgroundColor: 'white',
                marginHorizontal: itemSize * 0.025,
                opacity: opacityAnimation
              }} />

            )
          })
        }
      </View>
      <Animated.View style={{
        width,
        height: height > 895 ? '90%' : '75%',
        position: 'absolute',
        backgroundColor: 'white',
        top: height > 895 ? '76.7%' : '81.6%',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: height > 895 ? (width > 800 ? '3%' : '6%') : (width > 800 ? '3%' : '5%')
      }}>
        <Text style={{
          color: '#2c2c2c',
          fontSize: height > 895 ? 20 : 17,
          fontWeight: 'bold'
        }}><AntDesign name="star" size={height > 895 ? 30 : 24} color="#e69a3c" /> 4.8 <Text style={{ fontSize: 12, color: 'rgba(0, 0, 0,0.4)' }}>(76 ratings)</Text></Text>

        <Text style={{
          fontSize: height > 895 ? 35 : 25,
          fontWeight: 'bold',
          marginTop: height > 895 ? 25 : 12,
          color: '#2c2c2c'
        }}>{name}</Text>

        <Text style={{
          width: '83%',
          fontWeight: '500',
          color: 'rgba(0, 0, 0,0.4)',
          lineHeight: 17,
          marginTop: height > 895 ? 15 : 12,
        }}>Alice Lake is surrounded by towering mountains, dense forests and grassy areas. There are four fresh water lakes that dominate the landscape and make swimming and fishing very enjoyable pastimes.</Text>

        <Text style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#2c2c2c',
          marginTop: height > 895 ? 30 : 10,
        }}>Activities available at this park</Text>

        <View style={{ flexDirection: 'row', marginTop: height > 895 ? 20 : 7, }}>
          <View style={{
            width: itemSize * 0.18,
            height: itemSize * 0.18,
            borderRadius: 10,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            shadowOpacity: 0.2,
            shadowRadius: 5,
            shadowOffset: {
              width: -2,
              height: 2
            },
            elevation: 4,
            borderWidth: 2,
            borderColor: '#c2c2c2'
          }}>
            <MaterialIcons name="directions-bike" size={35} color="#2c2c2c" />
          </View>

          <View style={{
            width: itemSize * 0.18,
            height: itemSize * 0.18,
            borderRadius: 10,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            shadowOpacity: 0.2,
            shadowRadius: 5,
            shadowOffset: {
              width: -2,
              height: 2
            },
            elevation: 4,
            marginLeft: '2.5%',
            borderWidth: 2,
            borderColor: '#c2c2c2'
          }}>
            <MaterialCommunityIcons name="hiking" size={35} color="#2c2c2c" />
          </View>


          <View style={{
            width: itemSize * 0.18,
            height: itemSize * 0.18,
            borderRadius: 10,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            shadowOpacity: 0.2,
            shadowRadius: 5,
            shadowOffset: {
              width: -2,
              height: 2
            },
            elevation: 4,
            marginLeft: '2.5%',
            borderWidth: 2,
            borderColor: '#c2c2c2'
          }}>
            <MaterialCommunityIcons name="fish" size={35} color="#2c2c2c" />
          </View>


          <View style={{
            width: itemSize * 0.18,
            height: itemSize * 0.18,
            borderRadius: 10,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            shadowOpacity: 0.2,
            shadowRadius: 5,
            shadowOffset: {
              width: -2,
              height: 2
            },
            elevation: 4,
            marginLeft: '2.5%',
            borderWidth: 2,
            borderColor: '#c2c2c2'
          }}>
            <MaterialCommunityIcons name="rowing" size={35} color="#2c2c2c" />
          </View>


        </View>

        <View style={{
          width,
          backgroundColor: 'white',
          height: height > 895 ? (width > 800 ? itemSize * 0.7 : itemSize * 0.35) : (width > 800 ? itemSize * 0.7 : itemSize * 0.3),
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          elevation: 10,
          shadowOpacity: 0.1,
          padding: height > 895 ? '5%' : '4%',
          paddingHorizontal: height > 895 ? '6%' : '6%', alignItems: 'center',

        }}>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: (width > 800 ? 20 : 16), }}>$35 <Text style={{ fontWeight: '300' }}>per night</Text></Text>
            <Text style={{ fontWeight: 'bold', fontSize: (width > 800 ? 20 : 16), marginTop: Platform.OS === 'android' ? "2%" : "3%", }}>8 <Text style={{ fontWeight: '300' }}>guests max</Text></Text>
          </View>

          <TouchableOpacity style={{
            backgroundColor: '#435952',
            alignItems: 'center',
            justifyContent: 'center',
            padding: Platform.OS === 'android' ? 15 : 0,
            borderRadius: 30,
            width: height > 895 ? (width > 800 ? itemSize * 1.2 : itemSize * 0.74) : (width > 800 ? itemSize * 1.2 : itemSize * 0.72),
            marginLeft: height > 895 ? (width > 800 ? itemSize * 1 : itemSize * 0.18) : (width > 800 ? itemSize * 1 : itemSize * 0.22),
            height: height > 895 ? itemSize * 0.2 : itemSize * 0.17
          }}
          >
            <Text style={{ color: 'white', fontWeight: '600', fontSize: height > 895 ? 20 : 18 }}>Explore</Text>
          </TouchableOpacity>

        </View>
      </Animated.View>
      <Animated.View style={{
        position: 'absolute',
        width: itemSize * 0.17,
        height: itemSize * 0.17,
        borderRadius: 100,
        backgroundColor: 'rgba(79,82,67,255)',
        justifyContent: 'center',
        alignItems: 'center',
        left: '85%',
        top: '9%',
      }}>
        <TouchableOpacity>
          <AntDesign name="heart" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={{
        position: 'absolute',
        width: itemSize * 0.17,
        height: itemSize * 0.17,
        borderRadius: 100,
        backgroundColor: 'rgba(79,82,67,255)',
        justifyContent: 'center',
        alignItems: 'center',
        right: '85%',
        top: '9%',
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}
const Screen2 = () => {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text style={{ color: 'black', fontSize: 30 }}>Screen2</Text>
    </View>
  )
}

const Screen3 = () => {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text style={{ color: 'black', fontSize: 30 }}>Screen3</Text>
    </View>
  )
}
const HomeWithBottomTabs = () => {
  return (
    <Tab.Navigator tabBarOptions={{
      style: {
        position: 'absolute', elevation: 1, height: Platform.OS === 'ios' ? '10%' : '8%',
        shadowOpacity: 0.3, shadowRadius: 1, borderTopLeftRadius: 30, borderTopRightRadius: 30
      }
      , showLabel: false
    }}>
      <Tab.Screen name="HomeTab" component={Home} options={{
        tabBarIcon: (props) => {
          return (

            <View style={{ top: '5%' }}>
              <Fontisto name="tent" size={width > 800 ? 23 : 40} color="rgba(79,82,67,255)" />
            </View>
          )
        }
      }} />
      <Tab.Screen name="Screen2" component={Screen2} options={{
        tabBarIcon: (props) => {
          return (

            <View style={{ top: '5%' }}>
              <Ionicons name="ios-calendar" size={width > 800 ? 23 : 40} color="rgba(79,82,67,255)" />
            </View>
          )
        }
      }} />
      <Tab.Screen name="Screen3" component={Screen3} options={{
        tabBarIcon: (props) => {
          return (

            <View style={{ top: '5%' }}>
              <Ionicons name="ios-person-sharp" size={width > 800 ? 23 : 40} color="rgba(79,82,67,255)" />
            </View>
          )
        }
      }} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeWithBottomTabs} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
