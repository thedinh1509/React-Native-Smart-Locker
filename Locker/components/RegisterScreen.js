import React, { Component } from 'react';
import {Text, View, Alert, ActivityIndicator} from 'react-native';
import {Button, CheckBox, Input, Icon} from 'react-native-elements';

const getUserDataUrl = 'https://re-server2.herokuapp.com/api/mobile/user';
const postRegisteredAccountUrl = 'https://re-server2.herokuapp.com/api/mobile/registerAccount';

export default class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            isLoading: true,
            username: '',
            password: '',
            repassword: '',
            email: '',
        };
    }
    componentDidMount() {
        this.getUserData();
    }
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
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Text style={{ fontSize: 50, fontWeight: 'bold', fontFamily: 'cursive', color: '#32A5FF' }}>
                        Register
                    </Text>
                </View>
                <View style={{ flex: 5, alignItems: 'center', justifyContent: 'space-between', marginTop: 50 }}>
                    <Input
                        containerStyle={{ width: 320 }}
                        inputContainerStyle={{ borderColor: 'black', borderWidth: 1, borderBottomWidth: 1, borderRadius: 7, borderStyle: 'dashed' }}
                        leftIcon={ <Icon name='person' size={30}/> }
                        placeholder='Username'
                        autoCapitalize={'none'}
                        onChangeText={ (username) => this.setState({username}) }
                        value={ this.state.username }
                    />
                    <Input
                        containerStyle={{ width: 320 }}
                        inputContainerStyle={{ borderColor: 'black', borderWidth: 1, borderBottomWidth: 1, borderRadius: 7, borderStyle: 'dashed' }}
                        leftIcon={ <Icon name='lock' size={30}/> }
                        secureTextEntry={true}
                        placeholder='Password'
                        onChangeText={ (password) => this.setState({password}) }
                        value={ this.state.password }
                    />
                    <Input
                        containerStyle={{ width: 320 }}
                        inputContainerStyle={{ borderColor: 'black', borderWidth: 1, borderBottomWidth: 1, borderRadius: 7, borderStyle: 'dashed' }}
                        leftIcon={ <Icon name='lock' size={30}/> }
                        secureTextEntry={true}
                        placeholder='Retype password'
                        onChangeText={ (repassword) => this.setState({repassword}) }
                        value={ this.state.repassword }
                    />                
                    <Input
                        containerStyle={{ width: 320 }}
                        inputContainerStyle={{ borderColor: 'black', borderWidth: 1, borderBottomWidth: 1, borderRadius: 7, borderStyle: 'dashed' }}
                        leftIcon={ <Icon name='email' size={30}/> }
                        placeholder='Email'
                        keyboardType={'email-address'}
                        autoCapitalize={'none'}
                        onChangeText={ (email) => this.setState({email}) }
                        value={ this.state.email }
                    />
                    <CheckBox
                        title='I agree to the Terms of Service and Privacy Policy'
                        containerStyle={{ width: 300, backgroundColor: 'white', borderColor: 'transparent', marginTop: -20 }}
                        textStyle={{ fontWeight: 'normal' }}
                        checked={this.state.checked}
                        onPress={ () => {this.setState({checked: !this.state.checked})} }
                    />
                </View>
                <View style={{ flex: 3, alignItems: 'center' }}>
                    <Button
                        title='Register'
                        type='outline'
                        titleStyle={{ fontSize: 20, color: 'white' }}
                        buttonStyle={{ width: 150, height: 50, borderRadius: 20, backgroundColor: '#32A5FF', marginTop: 10 }}
                        onPress={ () => {
                            let exist = [{username: false, email: false}];
                            for (let i = 0; i < this.state.dataUser.length; i++ ) {
                                if (this.state.dataUser[i].name === this.state.username){
                                    exist.username = true;
                                }
                                if (this.state.dataUser[i].email === this.state.email){
                                    exist.email = true;
                                }
                            }
                            if (this.state.username.length < 6 || this.state.username.length > 20){
                                alert('Username must contain 6-20 characters.\nPlease try again.')
                            } else if (exist.username == true){
                                alert('Username already exists.\nPlease try again.')
                            } else if (this.state.password.length < 8){
                                alert('Password must contain at least 8 characters.\nPlease try again.')
                            } else if (this.state.repassword !== this.state.password){
                                alert('Retype password does not match.\nPlease try again.')
                            } else if (this.state.email.length < 15){
                                alert('Email must contain at least 15 characters.\nPlease try again.')
                            } else if (this.state.email.includes('@') == false){
                                alert('Email address is invalid.\nPlease try again.');
                            } else if (exist.email == true){
                                alert('Email already exists.\nPlease try again.')
                            } else if (this.state.checked == false){
                                alert('To register, you must agree to the Term of Service and Privacy Policy.\nPlease try again.')
                            } else {
                                const newAccount = {
                                    name: this.state.username,
                                    email: this.state.email,
                                    password: this.state.password,
                                    rpassword: this.state.repassword,
                                };
                                
                                fetch(postRegisteredAccountUrl, {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(newAccount),
                                })
                                .then((response) => response.json())
                                .then((responseJson) => {
                                    this.setState({
                                        isLoading: false,
                                        result: responseJson,
                                    });
                                })
                                .catch((error) => {
                                  console.error(error);
                                });
                                if (this.state.isLoading){
                                    alert('Cannot connect to server')
                                } else {
                                    Alert.alert('Congratulations', 'Registered successfully.');
                                    this.setState({username:'', password:'', repassword:'', email:'', checked: false});
                                    this.getUserData();
                                }

                                // alert(this.state.result);
                                // if (this.state.result === 'success'){
                                //     Alert.alert('Congratulations', 'Registered successfully');
                                //     this.setState({username:'', password:'', repassword:'', email:'', checked: false});
                                // }
                                // else if (this.state.result === 'wrong'){
                                //     Alert.alert('Failed', 'Please register again!')
                                // }
                            }
                        }}
                    />
                    <Button
                        title='Back'
                        type='outline'
                        titleStyle={{ fontSize: 20, color: '#32A5FF' }}
                        buttonStyle={{ width: 150, height: 50, borderWidth: 2, borderRadius: 20, borderColor: '#32A5FF', backgroundColor: 'white', marginTop: 50 }}
                        onPress={ () => this.props.navigation.navigate('Login')}
                    />
                </View>
            </View>
        );
    }
}