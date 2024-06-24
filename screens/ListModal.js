import React, {useState} from "react";
import {
    Button,
    Dimensions,
    Text,
    View,
    StyleSheet,
    FlatList,
    Modal,
    TextInput,
    Animated,
    TouchableOpacity
} from "react-native";
import {Swipeable} from "react-native-gesture-handler";
import {FontAwesome} from "@expo/vector-icons";
import {AnimatedView} from "react-native-reanimated/lib/typescript/reanimated2/component/View";

const ListModal = () => {
    // Etat pour la visibilité du modal
    const [modalVisible, setModalVisible] = useState(false);
    // Etat pour le texte saisi
    const [inputText, setInputText] = useState("");
    // Etat pour stocker la liste des tâches
    const [itemList, setItemList] = useState([]);
    // Etat pour l'élément en cours de modification
    const [editItem, setEditItem] = useState(null);

    // Fonction pour ajouter un nouvel élément dans la liste
    const handleAddItem = () => {
        // Vérification que le champ n'est pas vide (trim() enlève les espace dans le champ
        if (inputText.trim().length > 0) {
            //On ajoute l'élément
            setItemList([
                ...itemList,
                {id: Math.random().toString(), value: inputText.trim()},
            ]);
            //Réinitialisation du champ input et pn ferme le modal
            setInputText("");
            setModalVisible(false);
        }
    };

    // Fonction pour modifier un élément dans la liste
    const handleEditItem = (itemId, itemValue) => {
        // On défini l'élément à modifier
        setEditItem({id: itemId, value: itemValue});

        // On prérempli le champ de texte (input) avec l'élément à modifier
        setInputText(itemValue);

        // On ouvre le modal pour faire éditer
        setModalVisible(true);
    };

    // Fonction pour sauvegarder les modifications apportées
    const handleSaveEditItem = () => {
        if (inputText.trim().length > 0 && editItem) {
            // On met à jour la liste des éléments
            setItemList(
                itemList.map((item) =>
                    item.id === editItem.id ? {...item, value: inputText.trim()} : item,
                ),
            );
            // On réinitialise les variables temporaires
            setEditItem(null);
            setInputText("");
            setModalVisible(false);
        }
    };

    // Fonction pour supprimer un élément dans la liste
    const handleRemoveItem = (itemId) => {
        setItemList((currentItem) =>
            currentItem.filter((item) => item.id !== itemId),
        );
    };

// Fonction de rendu pour chaque élément de la liste
    const  renderListItem = (itemData) => {
        const renderRightActions = (_,dragX) => {
            // cinfiguration des animations
            const scaleEdit =  dragX.interpolate({
                inputRange:[-100,0],
                outputRange: [1, 0.9],
                extrapolate: "clamp"
            });

            const scaleDelete = dragX.interpolate({
                inputRange:[-50,0],
                outputRange: [1, 0.9],
                extrapolate: "clamp"
            });

            // rendu des boutons d'édition et de suppressio
            return (
                <View style={styles.swipeableRow}>
                    <Animated.View style={[styles.editAction,{transform:[{scale: scaleEdit}]}]}></Animated.View>
                    <TouchableOpacity onPress={() => handleEditItem(itemData.item.id, itemData.item.value )}>
                        <FontAwesome name="pencil" size={24} color="white" />
                    </TouchableOpacity>

                    <Animated.View style={[styles.deleteAction,{transform:[{scale: scaleDelete}]}]}></Animated.View>
                    <TouchableOpacity onPress={() => handleRemoveItem(itemData.item.id)}>
                        <FontAwesome name="trash-o" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )
        }
        // rendu de l'élément de la liste
        return(
        <Swipeable renderRightActions={renderRightActions}>
            <View style={styles.listItemContainer}>
                <Text style={styles.listItem}>{itemData.item.value}</Text>

            </View>
        </Swipeable>
        )
    }




    return (
        <View style={styles.centeredView}>
            <Button title="Ajouter un élément" onPress={() => {
                // réinitialisation des  etats et ouverture modal
                setEditItem(null);
                setInputText("");
                setModalVisible(true)
            }}/>
            {/* Liste des éléments */}
            <FlatList data={itemList} renderListItem={} keyExtractor={(item) => item.id}/>
            {/* Modal pour ajouter ou modifier un élément */}
            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {
                setModalVisible(!modalVisible)
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput style={styles.input} placeholderTextColor="Ajoutez votre texte" value={inputText}
                                   onChangeText={setInputText}/>
                        <View style={styles.buttonContainer}>
                            <Button title="Annuler" onPress={() => {
                                // On réinitialise les variables temporaires
                                setEditItem(null);
                                setInputText("");
                                setModalVisible(false);
                            }}/>
                            <Button title={editItem ? "Sauvegarder" : "AJouter la liste"}
                                    onPress={editItem ? handleSaveEditItem : handleAddItem}/>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "stretch",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    input: {
        height: 40,
        marginBottom: 20,
        borderWidth: 1,
        padding: 10,
    },
    swipeableRow: {
        width: 192,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    editAction: {
        backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center",
        width: 96,
        height: "100%",
    },
    deleteAction: {
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        width: 96,
        height: "100%",
    },
    listItemContainer: {
        padding: 20,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: Dimensions.get("window").width,
    },
    listItem: {
        fontSize: 18,
    },
});

export default ListModal;
