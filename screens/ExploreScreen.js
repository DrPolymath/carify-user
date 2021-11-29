import React from 'react'
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { SliderBox } from "react-native-image-slider-box";

const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      name: "Honda Jazz",
      url: "https://firebasestorage.googleapis.com/v0/b/carify-c094d.appspot.com/o/images%2FmodelLogo%2FHondaJazz.jpg?alt=media&token=481e2123-e675-494d-93c0-0c8f95ee8f89",
      images: [
           "https://images.wapcar.my/file1/3a5442e600394e61b43767ad10a079ad_1072x604.jpg",
           "https://images.wapcar.my/file1/0c34ca3128b345a7bc95481d50711bff_1072x604.jpg",
           "https://images.wapcar.my/file1/6a2f15dfb2d746d6b7c83709aee11875_1072x604.jpg",

      ],
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      name: "Toyota Vios",
      url: "https://firebasestorage.googleapis.com/v0/b/carify-c094d.appspot.com/o/images%2FmodelLogo%2FToyotaVios.jpg?alt=media&token=77a52273-17ee-4d7b-99c3-d6d45134e72b",
      images: [
            "https://images.wapcar.my/file1/216d6b01d75f4dc897b932f2c87bfb4e_1072x604.jpg",
            "https://images.wapcar.my/file1/617b75e0e1bf4e8488c0d07d19818632_1072x604.jpg",
            "https://images.wapcar.my/file1/331f81050ae249a6b93c953b1d8deb2d_1072x604.jpg",

        ],
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      name: "Kia Cerato",
      url: "https://firebasestorage.googleapis.com/v0/b/carify-c094d.appspot.com/o/images%2FmodelLogo%2FKiaCerato.jpg?alt=media&token=71f53bc0-5f94-4178-8b4d-63b617cc858d",
      images: [
            "https://images.wapcar.my/file1/7a966fc5a82f40e59ca9f40a794d0728_1072x604.jpg",
            "https://images.wapcar.my/file1/0c34ca3128b345a7bc95481d50711bff_1072x604.jpg",
            "https://images.wapcar.my/file1/6a2f15dfb2d746d6b7c83709aee11875_1072x604.jpg",

        ],
      title: "Third Item",
    },
  ];

const ExploreScreen = () => {

    const { colors } = useTheme();

    return (
        <SafeAreaView style={{ flex: 1, margin: 15 }}>
            <FlatList
                style={{flex: 1}}
                showsVerticalScrollIndicator={false}
                horizontal={false}
                data={DATA}
                renderItem={({item}) => (
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View style={{ flex: 3 }}>
                                <Image
                                    style={{
                                        width: 50,
                                        height: 50,
                                        resizeMode: 'contain'
                                    }}
                                    source={{
                                        uri: item.url,
                                    }} 
                                />
                            </View>
                            <View style={{ flex: 12 }}>
                                <Text style={{ color: colors.primary, fontSize: 20}}>{item.name}</Text>
                                <Text style={{ fontSize: 10}}>1.5L E 2020</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <MaterialCommunityIcons name="dots-vertical" size={24} color="grey" />
                            </View>
                        </View>
                        <SliderBox 
                            images={item.images}
                            parentWidth={330}
                            ImageComponentStyle={{borderRadius: 15, marginTop: 5 }}
                        />
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default ExploreScreen

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        margin: 10,
        padding: 15,
        borderWidth: 0,
        borderRadius: 20,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 3,
    },
    cardHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 32,
    },
})
