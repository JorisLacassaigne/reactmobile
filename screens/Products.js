import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { GlobalStyles } from "../styles/AppStyles";
import navigation from "../components/Navigation";

export default function Products({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://10.111.26.120:3000/produits").then((response) =>
      response
        .json()
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        }),
    );
  });

  return (
    <View style={GlobalStyles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("ProductCard", { item: item })}
          >
            <View style={GlobalStyles.item}>
              <Text style={GlobalStyles.title}>{item.designation}</Text>
              <Image
                style={GlobalStyles.image}
                source={{
                  uri: "https://cdn.pixabay.com/photo/2013/09/18/18/24/chocolate-183543_1280.jpg",
                }}
              />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.reference}
      />
    </View>
  );
}
