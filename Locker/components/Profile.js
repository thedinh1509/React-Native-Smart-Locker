import React, { Component } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, View, ImageBackground} from 'react-native';
import {Button} from 'react-native-elements';

export default class Profile extends Component {
    static navigationOptions = ({}) => {
        return {
            tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name={`account`} size={28} color={tintColor}/>
        }
    };
    render() {
        const item = this.props.navigation.getParam('userData', '');
        return (
            <ImageBackground source={require('../images/background.jpg')} style={{width: '100%', height: '100%'}}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Text style={{ fontSize: 50, fontFamily: 'cursive', color: 'white' }}>
                            Profile
                        </Text>
                    </View>
                    <View style={{ flex: 6, borderWidth: 2, borderColor: 'white', borderRadius: 15, marginVertical: 10, marginHorizontal: 30 }}>
                        <View style={{ flex: 4, alignItems: 'center' }}>
                            <MaterialCommunityIcons name={`account-circle`} size={170} color={'white'}/>
                        </View>
                        <View style={{ flex: 6, justifyContent: 'space-evenly', marginVertical: 20 }}>
                            <Text style={{ fontSize: 20, color: 'white', marginLeft: 20 }}>
                                Username:  {item.name}
                            </Text>
                            <Text style={{ fontSize: 20, color: 'white', marginLeft: 20 }}>
                                Email:  {item.email}
                            </Text>
                            <Text style={{ fontSize: 20, color: 'white', marginLeft: 20 }}>
                                ID: {item._id}
                            </Text>
                        </View>
                    </View>
                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                        <Button
                            title="LOGOUT"
                            type={'clear'}
                            titleStyle={{ fontSize: 20, color: 'white' }}
                            buttonStyle={{ width: 150, height: 50, borderRadius: 20 }}
                            containerStyle={{backgroundColor: '#32A5FF' }}
                            onPress={() => this.props.navigation.navigate('Welcome')}
                        />
                    </View>
                </View>
            </ImageBackground>
        );
    }
}