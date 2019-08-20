import React, { Component } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, View, ImageBackground, Alert, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Button, Input, Overlay} from 'react-native-elements';

const getLockerDataUrl = 'https://re-server2.herokuapp.com/api/mobile/locker';
const postRegisteredLockerUrl = 'https://re-server2.herokuapp.com/api/mobile/registerLocker';

export default class Home extends Component {
    static navigationOptions = ({}) => {
        return {
            tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name={`home`} size={28} color={tintColor}/>
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            isLoading: true,
            username: '',
            locker: '',
            code: '',
            recode: '',
        };
    }
    componentDidMount() {
        this.getLockerData();
    }
    getLockerData(){
        return fetch(getLockerDataUrl)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({ 
                isLoading: false,
                dataLocker: responseJson,
            })
        })
        .catch((error) =>{
            console.error(error);
            this.setState({isLoading: true});
        });
    }

    render() {
        const userLogin = this.props.navigation.getParam('userData', '');
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return (
            <ImageBackground source={require('../images/background.jpg')} style={{width: '100%', height: '100%'}}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={{ flex: 3, alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Text style={{ fontSize: 50, fontFamily: 'cursive', color: 'white' }}>
                            Welcome to
                        </Text>
                        <Text style={{ fontSize: 45, fontFamily: 'monospace', color: '#32A5FF' }}>
                            Smart Locker
                        </Text>
                    </View>
                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, color: 'white', margin: 10}}>
                            Hi,{" "}
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                                {userLogin.name}
                            </Text>
                        </Text>
                        <Text style={{ fontSize: 20, color: 'white'}}>
                            Choose one method to open your locker
                        </Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', width: 320 }}>
                        <TouchableOpacity 
                            activeOpacity={0.5} 
                            onPress={ () => Alert.alert(
                                'Number Code', 
                                'Get a code in tab "Number Code" and enter it to open locker.',
                            )}
                            style={{ flex: 3, alignItems: 'center', justifyContent: 'space-evenly', borderWidth: 3, borderColor: '#32A5FF', backgroundColor: 'white', margin: 10 }}
                        >
                            <MaterialCommunityIcons name={`dialpad`} size={60} color={'#32A5FF'}/>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#32A5FF' }}>
                                Number Code
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            activeOpacity={0.5}
                            onPress={ () => Alert.alert(
                                'Qr Code', 
                                'Get a Qr code in tab "Qr Code" and scan it to open locker.',
                            )}
                            style={{ flex: 3, alignItems: 'center', justifyContent: 'space-evenly', borderWidth: 3, borderColor: '#32A5FF', backgroundColor: 'white', margin: 10  }}
                        >
                            <MaterialCommunityIcons name={`qrcode`} size={62} color={'#32A5FF'}/>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#32A5FF' }}>
                                Qr Code
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{ flex: 1.5, alignItems: 'center', justifyContent: 'center', width: 300, borderWidth: 3, borderColor: '#32A5FF', backgroundColor: 'white', margin: 5 }}
                        onPress={ () => {
                            this.getLockerData();
                            this.setState({username:'', locker:'', code:'', recode:''});
                            this.setState({isVisible: true});
                        }}
                    >
                        <MaterialCommunityIcons name={`locker-multiple`} size={60} color={'#32A5FF'}/>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#32A5FF' }}>
                            Register Locker
                        </Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1.5, alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Text
                            style={{ fontSize: 17, color: 'white' }}
                            onPress={ () => Alert.alert(
                                'About us', 
                                'Truong The Dinh\nLe Tang Vinh Phu\nNguyen Hien Quang',
                            )}
                        >
                            About us
                        </Text>
                        <Text 
                            style={{ fontSize: 17, color: 'white', margin: 10 }}
                            onPress={ () => Alert.alert(
                                'Version Details', 
                                'Fixed:\nUpdated:',
                            )}
                        >
                            Version: 1.0.1
                        </Text>
                    </View>
                </View>
                <Overlay
                    isVisible={this.state.isVisible}
                    onBackdropPress={() => this.setState({isVisible: false})}
                    width={300}
                    height= {550}
                >
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1.5, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 40, fontWeight: 'bold', fontFamily: 'cursive', color: '#32A5FF' }}>
                                Register Locker
                            </Text>
                        </View>
                        <View style={{ flex: 7, alignItems: 'center', justifyContent: 'space-evenly', marginTop: 0 }}>
                            <Input
                                containerStyle={{ width: 200 }}
                                inputContainerStyle={{ borderColor: 'black', borderWidth: 1, borderBottomWidth: 1, borderRadius: 7, borderStyle: 'dashed', paddingHorizontal: 20 }}
                                label='Username:'
                                labelStyle={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}
                                editable={false}
                                // onChangeText={ (username) => this.setState({username}) }
                                value={ this.state.username = userLogin.name }
                            />
                            <Input
                                containerStyle={{ width: 200 }}
                                inputContainerStyle={{ borderColor: 'black', borderWidth: 1, borderBottomWidth: 1, borderRadius: 7, borderStyle: 'dashed', paddingHorizontal: 20 }}
                                label='Locker:'
                                labelStyle={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}
                                placeholder='Only number'
                                keyboardType={'numeric'}
                                onChangeText={ (locker) => this.setState({locker}) }
                                value={ this.state.locker }
                            />
                            <Input
                                containerStyle={{ width: 200 }}
                                inputContainerStyle={{ borderColor: 'black', borderWidth: 1, borderBottomWidth: 1, borderRadius: 7, borderStyle: 'dashed', paddingHorizontal: 20 }}
                                label='Code:'
                                labelStyle={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}
                                placeholder='Only 5 numbers'
                                keyboardType={'numeric'}
                                secureTextEntry={true}
                                maxLength={5}
                                onChangeText={ (code) => this.setState({code}) }
                                value={ this.state.code }
                            />
                            <Input
                                containerStyle={{ width: 200 }}
                                inputContainerStyle={{ borderColor: 'black', borderWidth: 1, borderBottomWidth: 1, borderRadius: 7, borderStyle: 'dashed', paddingHorizontal: 20 }}
                                label='Retype code:'
                                labelStyle={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}
                                placeholder='Only 5 numbers'
                                keyboardType={'numeric'}
                                secureTextEntry={true}
                                maxLength={5}
                                onChangeText={ (recode) => this.setState({recode}) }
                                value={ this.state.recode }
                            />
                        </View>
                        <View style={{ flex: 1.5, alignItems: 'center', justifyContent: 'center' }}>
                            <Button
                                title='Register'
                                type='outline'
                                titleStyle={{ fontSize: 20, color: 'white' }}
                                buttonStyle={{ width: 120, height: 50, backgroundColor: '#32A5FF', marginTop: 10 }}
                                onPress={ () => {
                                    let checkLocker = {number: false, registered: false};
                                    for (let i = 0; i < this.state.dataLocker.length; i++){
                                        if (this.state.dataLocker[i].number == this.state.locker){
                                            checkLocker.number = true;
                                            if (this.state.dataLocker[i].name !== '' && this.state.dataLocker[i].password !== ''){
                                                checkLocker.registered = true;
                                            }
                                        }
                                    }
                                    if (this.state.username != userLogin.name){
                                        alert('Username does not match.\nPlease try again.')
                                    } else if (checkLocker.number === false){
                                        alert('This locker does not exist.\nPlease try again.');
                                        this.setState({locker:''});
                                    } else if (checkLocker.registered === true){
                                        alert('This locker has been already registered.\nPlease try again.');
                                        this.setState({locker:''});
                                    } else if (this.state.code.length < 5 || this.state.code.length > 5 ){
                                        alert('The code is not enough 5 numbers.\nPlease try again.');
                                        this.setState({code:''});
                                    } else if (this.state.code !== this.state.recode){
                                        alert('The retype code does not match.\nPlease try again.');
                                        this.setState({recode:''});
                                    } else {
                                        const newLocker = {
                                            name: this.state.username,
                                            number: this.state.locker,
                                            password: this.state.code,
                                        };
                                        fetch(postRegisteredLockerUrl, {
                                            method: 'POST',
                                            headers: {
                                                Accept: 'application/json',
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify(newLocker),
                                        })
                                        .then((response) => response.json())
                                        .then((responseJson) => {
                                            this.setState({
                                                result: responseJson,
                                            });
                                        })
                                        .catch((error) => {
                                        console.error(error);
                                        });

                                        Alert.alert('Congratulations', 'Registered successfully.');
                                        this.setState({username:'', locker:'', code:''});
                                        this.getLockerData();    
                                        this.setState({isVisible: false});         
                                    }
                                }}
                            />
                        </View>
                    </View>
                </Overlay>
            </ImageBackground>
        );
    }
}