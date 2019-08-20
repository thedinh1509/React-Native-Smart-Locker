import React, { Component } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, View, ImageBackground, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';

const getLockerDataUrl = 'https://re-server2.herokuapp.com/api/mobile/locker';

export default class NumberCode extends Component {
    static navigationOptions = ({}) => {
        return {
            tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name={'dialpad'} size={25} color={tintColor}/>
        }
    };
    constructor(props){
        super(props);
        this.state = { 
            isLoading: true,
            refreshing: false,
            dataLocker: [
                {
                    name: '',
                    password: '',
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
            if (item.name !== this.state.dataSource[i].name){
                this.state.dataLocker[i].password = '####';
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
                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 50, fontFamily: 'cursive', color: 'white' }}>
                            Number Code
                        </Text>
                    </View>
                    <View style={{ flex: 7 }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', borderRadius: 5, backgroundColor: '#32A5FF', marginVertical: 10, marginHorizontal: 25 }}>
                            <View style={{ flex: 2, alignItems: 'center' }}>
                                <MaterialCommunityIcons name={`numeric-1-box-outline`} size={100} color={'white'}/>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'space-evenly', marginVertical: 6 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                                    Locker 1
                                </Text>
                                <Text style={{ fontSize: 16, color: 'white' }}>
                                    Registered by:
                                </Text>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>
                                    {this.state.dataLocker[0].name}
                                </Text>
                            </View>
                            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                                    Code
                                </Text>
                                <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white', margin: 5 }}>
                                    {this.state.dataLocker[0].password}
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', borderRadius: 5, backgroundColor: '#32A5FF', marginVertical: 10, marginHorizontal: 25 }}>
                            <View style={{ flex: 2, alignItems: 'center' }}>
                                <MaterialCommunityIcons name={`numeric-2-box-outline`} size={100} color={'white'}/>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'space-evenly', marginVertical: 6 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                                    Locker 2
                                </Text>
                                <Text style={{ fontSize: 16, color: 'white' }}>
                                    Registered by:
                                </Text>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>
                                    {this.state.dataLocker[1].name}
                                </Text>
                            </View>
                            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                                    Code
                                </Text>
                                <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white', margin: 5 }}>
                                    {this.state.dataLocker[1].password}
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', borderRadius: 5, backgroundColor: '#32A5FF', marginVertical: 10, marginHorizontal: 25 }}>
                            <View style={{ flex: 2, alignItems: 'center' }}>
                                <MaterialCommunityIcons name={`numeric-3-box-outline`} size={100} color={'white'}/>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'space-evenly', marginVertical: 6 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                                    Locker 3
                                </Text>
                                <Text style={{ fontSize: 16, color: 'white' }}>
                                    Registered by:
                                </Text>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>
                                    {this.state.dataLocker[2].name}
                                </Text>
                            </View>
                            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                                    Code
                                </Text>
                                <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white', margin: 5 }}>
                                    {this.state.dataLocker[2].password}
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', borderRadius: 5, backgroundColor: '#32A5FF', marginVertical: 10, marginHorizontal: 25 }}>
                            <View style={{ flex: 2, alignItems: 'center' }}>
                                <MaterialCommunityIcons name={`numeric-4-box-outline`} size={100} color={'white'}/>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'space-evenly', marginVertical: 6 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                                    Locker 4
                                </Text>
                                <Text style={{ fontSize: 16, color: 'white' }}>
                                    Registered by:
                                </Text>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>
                                    {this.state.dataLocker[3].name}
                                </Text>
                            </View>
                            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                                    Code
                                </Text>
                                <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white', margin: 5 }}>
                                    {this.state.dataLocker[3].password}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}/>
                </ScrollView>
            </ImageBackground>
        );
    }
}