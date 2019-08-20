import React, { Component } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, View, ImageBackground, TouchableOpacity, ScrollView, RefreshControl, ActivityIndicator} from 'react-native';
import QRCode from 'react-native-qrcode';
import {Overlay} from 'react-native-elements';

const getLockerDataUrl = 'https://re-server2.herokuapp.com/api/mobile/locker';

export default class NumberCode extends Component {
    static navigationOptions = ({}) => {
        return {
            tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name={`qrcode`} size={28} color={tintColor}/>
        }
    };
    constructor(props){
        super(props);
        this.state = { 
            isLoading: true,
            isVisible: false,
            qrcode:'',
            dataLocker: [
                {
                    name: '',
                    password: '',
                    match: false,
                }
            ],
        }
    }
    componentDidMount(){
        this.getLockerData();
    }
    refreshLocker = () => {
        this.setState({refreshing: true});
        this.getLockerData();
      }
    getLockerData(){
        return fetch(getLockerDataUrl)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({ 
                isLoading: false,
                refreshing: false,
                dataSource: responseJson,
            })
        })
        .catch((error) =>{
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
        const item = this.props.navigation.getParam('userData', '');
        for (let i = 0; i < this.state.dataSource.length; i++){
            this.state.dataLocker[i] = this.state.dataSource[i];
            if (item.name === this.state.dataSource[i].name){
                this.state.dataLocker[i].match = true;
            }
        }
        return (
            <ImageBackground source={require('../images/background.jpg')} style={{width: '100%', height: '100%'}}>
                <ScrollView style = {{ flex: 1 }} justifyContent='space-evenly' scrollEnabled={false} 
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.refreshLocker}
                        />
                    }
                >
                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Text style={{ fontSize: 50, fontFamily: 'cursive', color: 'white' }}>
                            QR Code
                        </Text>
                    </View>
                    <View style={{ flex: 4, flexDirection: 'row' }}>
                        <TouchableOpacity 
                            activeOpacity={0.5} 
                            style={{ flex: 3, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#32A5FF', margin: 10, marginStart: 20 }}
                            onPress={ () => {
                                if (this.state.dataLocker[0].match == true){
                                    this.setState({qrcode: this.state.dataLocker[0].password});
                                    this.setState({isVisible: true});
                                }
                                else {
                                    this.setState({isVisible: false});
                                }
                            }}
                        >
                            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>
                                Locker
                            </Text>
                            <MaterialCommunityIcons name={`numeric-1-box-outline`} size={120} color={'white'}/>
                            <Text style={{ fontSize: 15, color: 'white' }}>
                                Registered by:
                            </Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                                {this.state.dataLocker[0].name}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            activeOpacity={0.5} 
                            style={{ flex: 3, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#32A5FF', margin: 10, marginEnd: 20 }}
                            onPress={ () => {
                                if (this.state.dataLocker[1].match == true){
                                    this.setState({qrcode: this.state.dataLocker[1].password});
                                    this.setState({isVisible: true});
                                }
                                else {
                                    this.setState({isVisible: false});
                                }
                            }}
                        >
                            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>
                                Locker
                            </Text>
                            <MaterialCommunityIcons name={`numeric-2-box-outline`} size={120} color={'white'}/>
                            <Text style={{ fontSize: 15, color: 'white' }}>
                                Registered by:
                            </Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                                {this.state.dataLocker[1].name}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 4, flexDirection: 'row' }}>
                        <TouchableOpacity 
                            activeOpacity={0.5} 
                            style={{ flex: 3, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#32A5FF', margin: 10, marginStart: 20 }}
                            onPress={ () => {
                                if (this.state.dataLocker[2].match == true){
                                    this.setState({qrcode: this.state.dataLocker[2].password});
                                    this.setState({isVisible: true});
                                }
                                else {
                                    this.setState({isVisible: false});
                                }
                            }}
                        >
                            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>
                                Locker
                            </Text>
                            <MaterialCommunityIcons name={`numeric-3-box-outline`} size={120} color={'white'}/>
                            <Text style={{ fontSize: 15, color: 'white' }}>
                                Registered by:
                            </Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                                {this.state.dataLocker[2].name}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            activeOpacity={0.5} 
                            style={{ flex: 3, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#32A5FF', margin: 10, marginEnd: 20 }}
                            onPress={ () => {
                                if (this.state.dataLocker[3].match == true){
                                    this.setState({qrcode: this.state.dataLocker[3].password});
                                    this.setState({isVisible: true});
                                }
                                else {
                                    this.setState({isVisible: false});
                                }
                            }}
                        >
                            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white' }}>
                                Locker
                            </Text>
                            <MaterialCommunityIcons name={`numeric-4-box-outline`} size={120} color={'white'}/>
                            <Text style={{ fontSize: 15, color: 'white' }}>
                                Registered by:
                            </Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                                {this.state.dataLocker[3].name}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}/>
                    <Overlay
                        isVisible={this.state.isVisible}
                        onBackdropPress={() => this.setState({isVisible: false})}
                        width='auto'
                        height='auto'
                    >
                        <QRCode
                            value={this.state.qrcode}
                            size={250}
                            bgColor='black'
                            fgColor='white'
                        />
                    </Overlay>
                </ScrollView>
            </ImageBackground>
        );
    }
}