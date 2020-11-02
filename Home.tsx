import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Button,
    FlatList,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native';
import Modal from 'react-native-modal';
import TextInputBox from './TextInputBox';
import Icon from 'react-native-vector-icons/FontAwesome5';

const sampleItem = [
    {
        id: 1,
        name: "Tomato",
        Qty: "500",
        Price: "25",
        color: "red",
    },
    {
        id: 2,
        name: "Carrot",
        Qty: "500",
        Price: "35",
        color: "purple",
    },
    {
        id: 3,
        name: "Onion",
        Qty: "500",
        Price: "35",
        color: "green",
    },
    {
        id: 4,
        name: "Potato",
        Qty: "500",
        Price: "35",
        color: "orange",
    },
    {
        id: 5,
        name: "Onion",
        Qty: "500",
        Price: "35",
        color: "steelblue",
    },
]
const len = sampleItem.length;
const Home = ({ navigation }) => {

    const [productItems, setProductItems] = useState(sampleItem);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);

    const [productVal, setProductVal] = useState({
        id: 0,
        name: '',
        Qty: '',
        Price: '',
        color: '',
    })

    const renderCards = ({ id, name, Qty, Price, color, img }) => {
        return (
            <View style={{
                backgroundColor: "white",
                borderRadius: 10,
                marginHorizontal: 15,
                marginVertical: 5,
                width: "90%",
                padding: 15,

            }}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    {/* image */}
                    {
                        img ?
                            <Image source={{ uri: img }} style={{ width: 50, height: 50 }} />
                            : null
                    }

                    <Text style={[styles.text, { color: color }]}>{name}</Text>
                    <Text style={styles.text}>{Qty}</Text>
                    <Text style={styles.text}>{Price}</Text>
                </View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                }}>
                    <TouchableOpacity style={{
                        marginVertical: 5,
                        marginHorizontal: 10,
                        backgroundColor: "steelblue",
                        padding: 5,
                        borderRadius: 5
                    }} onPress={()=> {
                        let editval ={
                            id,
                            name,
                            Qty,
                            Price,
                            color,
                        };
                        setProductVal(editval)
                        setIsEditModalVisible(!isEditModalVisible)
                    }}>
                        <Icon name="edit" color="white" size={18} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        marginVertical: 5,
                        marginHorizontal: 10,
                        backgroundColor: "steelblue",
                        padding: 5,
                        borderRadius: 5
                    }} onPress={()=> DeleteItem(id)}>
                        <Icon name="trash" color="white" size={20} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    const renderHeader = () => {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: "center",
                borderRadius: 10,
                marginHorizontal: 15,
                marginVertical: 5,
                width: "90%",
                padding: 15,
            }}>
                <Text style={styles.text}>Name</Text>
                <Text style={styles.text}>Qty(gm)</Text>
                <Text style={styles.text}>Price(rs)</Text>
            </View>
        )
    }
    const renderFooter = () => {
        return (
            <View style={{
                marginBottom: 20
            }}>
                <Text style={[styles.text, { textAlign: "center" }]}>This is footer</Text>
            </View>
        )
    }
    const UpdateItemFunc =()=>{
        console.log(productVal);
        let dataVal = productItems.map((item)=>{
            if(item.id === productVal.id){
                return productVal
            }else{
                return item
            }
        });
        setProductItems(dataVal);
        setIsEditModalVisible(!isEditModalVisible);
    }
    const DeleteItem =(id)=> {
        console.log(id)
        let dataItems = productItems.filter((e)=> e.id!== id);
        setProductItems(dataItems)
    }
    const OnSubmit = () => {
        let dataVal = productVal;
        dataVal.id = sampleItem.length + 1;
        dataVal.color = "purple";
        console.log(dataVal) // is contains the newly entered values list
        // sampleItem.push(dataVal);
        setProductItems([...productItems, dataVal]);
        setIsModalVisible(!isModalVisible)
    }
    return (
        <View style={{
            flex: 1,
            // justifyContent: "center",
            // alignItems: "center",
        }}>
            {/* <Text style={{
                fontSize: 16,
                fontFamily: "Montserrat-ExtraBold"
            }}>Welcome To, Home Screen</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('Details')}>
                <Text>Details</Text>
            </TouchableOpacity>
            <Button title="Open Drawer" onPress={()=> navigation.openDrawer()}/> */}
            {
                len > 0 ?
                    <FlatList
                        data={productItems}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => renderCards(item)}
                        numColumns={1}
                        ListHeaderComponent={renderHeader}
                        ListFooterComponent={renderFooter}
                    />
                    :
                    <Text style={styles.text}>No Items to Render</Text>
            }
            <TouchableOpacity style={{
                position: 'absolute',
                width: 50,
                height: 50,
                backgroundColor: "red",
                bottom: 20,
                right: 20,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
            }} onPress={() => setIsModalVisible(!isModalVisible)}>
                <Text style={{
                    fontSize: 25,
                    color: "white",
                }}>+</Text>
            </TouchableOpacity>
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => setIsModalVisible(!isModalVisible)}

            >
                <View style={{
                    backgroundColor: "white"
                }}>
                    <ScrollView>
                        <Text style={[styles.text, {
                            textAlign: 'center',
                        }]}>List Inputs</Text>
                        <View style={{
                            alignItems: "center",
                        }}>
                            <TextInputBox
                                placeholder="Product Name"
                                secureTextEntry={false}
                                val={productVal.name}
                                autofocus={false}
                                setVal={(e) => setProductVal({ ...productVal, name: e })}
                            />
                            <TextInputBox
                                placeholder="Product Qty"
                                secureTextEntry={false}
                                val={productVal.Qty}
                                autofocus={false}
                                setVal={(e) => setProductVal({ ...productVal, Qty: e })}
                            />
                            <TextInputBox
                                placeholder="Product Price"
                                secureTextEntry={false}
                                val={productVal.Price}
                                autofocus={false}
                                setVal={(e) => setProductVal({ ...productVal, Price: e })}
                            />
                            <TouchableOpacity style={styles.buttonContainer} onPress={OnSubmit}>
                                <Text style={styles.text}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
            {/* edit modal */}
            <Modal
                isVisible={isEditModalVisible}
                onBackdropPress={() => setIsEditModalVisible(!isEditModalVisible)}

            >
                <View style={{
                    backgroundColor: "white"
                }}>
                    <ScrollView>
                        <Text style={[styles.text, {
                            textAlign: 'center',
                        }]}>Edit The Inputs</Text>
                        <View style={{
                            alignItems: "center",
                        }}>
                            <TextInputBox
                                placeholder="Product Name"
                                secureTextEntry={false}
                                val={productVal.name}
                                autofocus={false}
                                setVal={(e) => setProductVal({ ...productVal, name: e })}
                            />
                            <TextInputBox
                                placeholder="Product Qty"
                                secureTextEntry={false}
                                val={productVal.Qty}
                                autofocus={false}
                                setVal={(e) => setProductVal({ ...productVal, Qty: e })}
                            />
                            <TextInputBox
                                placeholder="Product Price"
                                secureTextEntry={false}
                                val={productVal.Price}
                                autofocus={false}
                                setVal={(e) => setProductVal({ ...productVal, Price: e })}
                            />
                            <TouchableOpacity style={styles.buttonContainer} onPress={UpdateItemFunc}>
                                <Text style={styles.text}>Update</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "Montserrat-Medium",
        fontSize: 15,
        lineHeight: 20,
        letterSpacing: 1
    },
    buttonContainer: {
        backgroundColor: "red",
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
        margin: 10
    },
})
export default Home;
