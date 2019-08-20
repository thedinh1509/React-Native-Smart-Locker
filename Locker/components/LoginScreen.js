import React, { Component } from 'react';
import {Text, View, Image, ActivityIndicator} from 'react-native';
import {Button, CheckBox, Input, Icon} from 'react-native-elements';

const getUserDataUrl = 'https://re-server2.herokuapp.com/api/mobile/user';

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            isLoading: true,
            username: '',
            password: '',
            userData: [],
        };
    }
    // componentDidMount() {
    //     this.getUserData();
    // }
    getUserData(){
        return fetch(getUserDataUrl)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isLoading: false,
                dataUser: responseJson,
            })
        })
        .catch((error) => {
            console.error(error);
            this.setState({isLoading: true});
        })
    }
    render() {
        this.getUserData();
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 4, alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Image 
                        style={{ width: 230, height: 200, resizeMode: 'contain' }}
                        source={require('../images/logo.png')}
                    />
                </View>
                <View style={{ flex: 4, alignItems: 'center' }}>
                    <Input
                        containerStyle={{ width: 300, margin: 10 }}
                        inputContainerStyle={{ borderColor: 'black', borderWidth: 1, borderBottomWidth: 1, borderRadius: 7, borderStyle: 'dashed' }}
                        leftIcon={ <Icon name='person' size={30}/> }
                        placeholder='Username'
                        autoCapitalize={'none'}
                        onChangeText={ (username) => this.setState({username}) }
                        value={ this.state.username }
                    />
                    <Input
                        containerStyle={{ width: 300, margin: 10 }}
                        inputContainerStyle={{ borderColor: 'black', borderWidth: 1, borderBottomWidth: 1, borderRadius: 7, borderStyle: 'dashed' }}
                        leftIcon={ <Icon name='lock' size={27}/> }
                        secureTextEntry={true}
                        placeholder='Password'
                        onChangeText={ (password) => this.setState({password}) }
                        value={ this.state.password }
                    />
                    {/* <View style={{ flexDirection: 'row' }}>                      
                        <CheckBox
                            title='Remember me'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            containerStyle={{ width: 150, backgroundColor: 'white', borderColor: 'white' }}
                            textStyle={{ fontSize: 15, color: 'black', fontWeight: '400' }}
                            checked={this.state.checked}
                            onPress={ () => {this.setState({checked: !this.state.checked})} }
                        />
                        <Button
                            title="Forgot password?"
                            type="clear"
                            containerStyle={{ width: 150, marginTop: 8 }}
                            titleStyle={{ fontSize: 15}}
                        />
                    </View> */}
                    <Button
                        title = "LOGIN"
                        type='outline'
                        titleStyle={{ fontSize: 20, color: 'white' }}
                        buttonStyle={{ width: 150, height: 50, borderRadius: 20, backgroundColor: '#32A5FF', marginTop: 25 }}
                        // onPress = {() => this.props.navigation.navigate('Dashboard')}
                        onPress = {() => {
                            if (this.state.isLoading){
                                alert('Cannot connect to server')
                            } else {
                                let isSuccess = false;
                                for (let i = 0; i < this.state.dataUser.length; i++ ) {
                                    if ((this.state.dataUser[i].name === this.state.username) && (this.state.dataUser[i].password === this.state.password)){
                                        this.state.userData = this.state.dataUser[i];
                                        isSuccess = true;
                                    }
                                }
                                if (isSuccess == true) {
                                    this.props.navigation.navigate('PROFILE', {userData: this.state.userData});
                                    this.props.navigation.navigate('QR CODE', {userData: this.state.userData});
                                    this.props.navigation.navigate('NUMBER CODE', {userData: this.state.userData});
                                    this.props.navigation.navigate('HOME', {userData: this.state.userData});
                                } else {
                                    alert('Username or Password is incorrect.\nPlease try again.')
                                }
                            }
                        }}
                    />
                </View>
                <View style={{ flex: 2, alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, color: 'black', marginTop: 30 }}>
                        Do not have an account yet?
                    </Text>
                    <Button
                        title="Create Account"
                        type="clear"
                        titleStyle={{ fontSize: 17}}
                        onPress = {() => {
                            if (this.state.isLoading){
                                alert('Cannot connect to server')
                            } else {
                                this.props.navigation.navigate('Register')
                            }
                        }}
                    />
                </View>
            </View>
        )
    }
}