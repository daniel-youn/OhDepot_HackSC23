import * as React from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';

const Card = (props) => { 
    return(
        <View style={styles.cardcss}>
        <Image
            style={styles.imagecss}
            source={props.Quri}
            />
            <View style={styles.cardtext}>
                <Text style={styles.cardtitle}>{props.title}</Text>
                <Text style={styles.cardorg}>{props.Org}</Text>
                <Text style={styles.cardinfo}>{props.Info}</Text>
                {/* <Text style={styles.cardrec}>{props.Rec_Don}</Text> */}
                {/* <Text style={styles.cardatt}>{props.Att}</Text> */}
                <Pressable style={styles.buttoncss}>
                     <Text style={styles.buttontextcss}>Donate</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    imagecss: {
        width: '100%', 
        height: 200,
        borderTopLeftRadius: 13,
        borderTopRightRadius: 13,
    },
    cardcss: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#18191F',
    },
    cardtext: {
        padding: 15,
        paddingHorizontal: 25,
    },
    cardtitle: {
        fontFamily: "Georgia",
        fontSize: 28,
        fontWeight: "400",
    },
    cardorg: {
        fontFamily: "Din Alternate",
        paddingTop: 8,
        fontSize: 18,
        textDecorationLine: "underline",
    },
    cardinfo: {
        fontFamily: "Din Alternate",
        paddingTop: 28,
        fontSize: 14,
    },
    buttoncss: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 14,
        borderWidth: 1.5,
        elevation: 3,
        backgroundColor: '#B1C9D3',
      },
      buttontextcss: {
        fontFamily: "Din Alternate",
        fontSize: 20,
        fontWeight: "600",
        letterSpacing: 0.25,
      },
});

export default Card;