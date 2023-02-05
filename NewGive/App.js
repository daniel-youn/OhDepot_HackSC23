import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Pressable, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";
import Card from './components/Card';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


let card_array = [
  { id:0, title: "Ahmedabad Vaccine Initiative", Org: "Gates Foundation", Info: "The foundation supports the state’s goals in the areas of maternal, newborn, and child health, childhood nutrition, family planning, immunization, and disease control, as well as supporting agricultural development, digital financial inclusion, and women’s economic empowerment.", Rec_Don: "5", Att: "Vaccines", Quri: require("./assets/Asset1.jpeg") },
]

function populateCarousel() {
  axios
  .get("http://localhost:8080/api/Get5Rand",
  )
  .then((response => {
    console.log(response.data);
    card_array = [];
    response.data.forEach((item) => {
      card_array.push({
        id: item.taxID,
        title: item.title,
        Org: item.organization,
        Info: item.message,
        Quri: require("./assets/Asset1.jpeg")
      })
    });
    console.log("get request sent");
  }))
  console.log("populate carousel called");
}


function HomeScreen() {
  const PAYPAL_CLIENT_ID = {
    clientId: 'AascEU3oS1FkPI7SIMyK-v3Nw8rQ1m80ZqsxgmNfqZExNwb6QermUSIL_tE7zsI4crQs2uiF8UkG-oLK'
  }
  const [succeeded, setSucceeded] = useState(false);
  const [paypalErrorMessage, setPaypalErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);
  const [billingDetails, setBillingDetails] = useState("");


  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: 1,
            },
          },
        ],
        // remove the applicaiton_context object if you need your users to add a shipping address
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
};

// handles when a payment is confirmed for paypal
const onApprove = (data, actions) => {
  return actions.order.capture().then(function (details) {
    const {payer} = details;
    setBillingDetails(payer);
    setSucceeded(true);
  })
};
// handles payment errors
const onError = (data,actions)=>{
 setPaypalErrorMessage("Something went wrong with your payment");
}

  const [count, setCount] = useState(0);
  useEffect(()=>{
    populateCarousel();
    console.log('homescreen use effect called.');
  }, [])

  function handleCount() {
    if(count < 4) {
      setCount(count + 1);
    }
    else {
      setCount(0);
    }
  }
  return (
    <View style={styles.container} >
      <View style={styles.rec_container}>
          <Card title={card_array.at(count).title} 
            Org={card_array.at(count).Org}
            Info={card_array.at(count).Info}
            Rec_Don={card_array.at(count).Rec_Don}
            Quri={card_array.at(count).Quri}
          />
        <PayPalScriptProvider options= {{"client-id": PAYPAL_CLIENT_ID.clientId }}>
          <PayPalButtons
              style={{
                color: "silver",
                shape: "pill",
                label: "pay",
                tagline: false,
                layout: "horizontal",
                height: 25,
              }}
              createOrder={createOrder}
              onApprove={onApprove}
          />
        </PayPalScriptProvider>
        </View>
        <View style={styles.button_container}>
          <Pressable style={styles.favbuttoncss}>
            <Text style={styles.favbuttontextcss}>★</Text>
          </Pressable>
          <Text style={styles.numtextcss}>{(count + 1)}/5</Text>
          <Pressable style={styles.nextbuttoncss} onPress={handleCount}>
            <Text style={styles.nextbuttontextcss}>Next</Text>
          </Pressable>
        </View>

          {/* <Component {...pageProps} /> */}
    </View>
  );
}

// function ExploreScreen() {
//   return (
//     <View style={styles.container}>
//       <Text>Explore!</Text>
//     </View>
//   );
// }

function ProfileScreen() {
    return (
      <View style={styles.container}>
        <Text>Profile!</Text>
      </View>
    );
  }

function LogInScreen()
{
  const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

const handleUsernameChange = event => {
setUsername(event.target.value);
};

const handlePasswordChange = event => {
setPassword(event.target.value);
}

return (

  <View style={styles.container}>
    <View style={styles.signupformat}>
    <p style={styles.bigsignup}>
      Login
    </p>
    <p style={styles.littlesignup}>
      Welcome back, <br /> Big Bird
    </p>
    </View>
    <View style={styles.allformscss}>
      <TextInput
          style={styles.formcontainercss}
          textAlign={'center'}
          onChangeText={handleUsernameChange}
          placeholder="Username"
          keyboardType="Text"
        />
        <Text>
        ‎
        </Text>
        <TextInput
          style={styles.formcontainercss}
          textAlign={'center'}
          onChangeText={handlePasswordChange}
          placeholder="Password"
          keyboardType="Text"
        />
          <Pressable style={styles.submitbuttoncss}>
  <Text style={styles.nextbuttontextcss}>Submit</Text>
  </Pressable>
    </View>
    
  

  </View>

);
}

function SignUpScreen()
{
  const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const[email, setEmail] = useState('');
const handleUsernameChange = event => {
setUsername(event.target.value);
};

const handlePasswordChange = event => {
setPassword(event.target.value);
}
const handleEmailChange = event => {
  setEmail(event.target.value);
  }

return (

  <View style={styles.container}>
    <View style={styles.signupformat}>
    <Text style={styles.bigsignup}>
      Sign Up
    </Text>
    <Text style={styles.littlesignup}>
      Be a part of positive change with every <br />donation, and receive impact updates
    </Text>
    </View>
    <View style={styles.allformscss}>
    <TextInput
          style={styles.formcontainercss}
          textAlign={'center'}
          onChangeText={handleEmailChange}
          placeholder="Email"
          keyboardType="Text"
        />
        <Text>
        ‎
        </Text>
      <TextInput
          style={styles.formcontainercss}
          textAlign={'center'}
          onChangeText={handleUsernameChange}
          placeholder="Username"
          keyboardType="Text"
        />
        <Text>
        ‎
        </Text>
        <TextInput
          style={styles.formcontainercss}
          textAlign={'center'}
          onChangeText={handlePasswordChange}
          placeholder="Password"
          keyboardType="Text"
        />
          <Pressable style={styles.submitbuttoncss}>
  <Text style={styles.nextbuttontextcss}>Submit</Text>
  </Pressable>
    </View>
   
  

  </View>

);
}

function ExploreScreen()
{
  const [search, setSearch] = useState('');
  const handleSearchChange = event => {
    setSearch(event.target.value);
  }
  return(
    <View style={styles.container}>
       <View style={styles.button_container}>
      <Text style={styles.welcome}>
        Hey, Jordan!   
      </Text>
      <View style={styles.favorite2}>
      <Pressable style={styles.favbuttoncss}>
                     <Text style={styles.favbuttontextcss}>★</Text>
          </Pressable>
      </View>
    
    </View>
 
    <TextInput
          style={styles.formcontainercsssmall}
          textAlign={'center'}
          onChangeText={handleSearchChange}
          placeholder="Search With Love"
          keyboardType="Text"
        />
   
    
    <View style={styles.cardcss}>
      <Text style={(styles.vaccinecss)}> Vaccines <br/></Text>
        <View>
        < Text style={{marginTop: 30, fontSize: 20, marginLeft: 25, marginRight: 25, marginBottom: 30}}> A vaccine provides immunity to a particular infectious or malignant disease</Text>
        </View>
      </View>

      <View style={{marginTop: 20}}>

      {/* <View style={styles.cardcss}>
        <Image
            style={styles.imagecss}
            source={"assets/research.jpg"}
            />
            <View style={styles.cardtext}>
                <Text style={styles.cardtitle}>Winship Cancer Center</Text>
                <Text style={styles.cardorg}>Atlanta, GA</Text>
                <Text style={styles.cardinfo}>12 March, 2020</Text>
                {/* <Text style={styles.cardrec}>{props.Rec_Don}</Text> */}
                {/* <Text style={styles.cardatt}>{props.Att}</Text> */}
                {/* <Pressable style={styles.buttoncss}>
                     <Text style={styles.buttontextcss}>Donate</Text>
                </Pressable>
            </View>
        </View> */} 
      </View>
      
    </View>
    
  );
  

}
// const Stack = createStackNavigator();

export default function App() {
  const [update, setUpdate] = useState(0);
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>

<Tab.Navigator
  screenOptions={({ route }) => ({
    headerShown: false,
    tabBarStyle: {
      height: 90,
      paddingHorizontal: 20,
      paddingTop: 0,
      paddingBottom: 44,
      backgroundColor: '#FFFCF7',
      position: 'absolute',
      borderTopWidth: 0,
    },
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'Home') {
        iconName = focused
          ? 'ios-heart-circle-sharp'
          : 'ios-heart-circle-outline';
      } else if (route.name === 'Explore') {
        iconName = focused ? 'ios-compass' : 'ios-compass-outline';
      }
      else if (route.name === 'Profile') {
        iconName = focused ? 'ios-person-circle' : 'ios-person-circle-outline';
      }

      // You can return any component that you like here!
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: '#ACCBA1',
    tabBarInactiveTintColor: 'gray',

})}>
          <Tab.Screen name="Home" 
          options={{tabBarLabelStyle: {fontFamily: "Din Alternate", fontSize: 16, fontWeight: "600",}, headerShown: false}} component={HomeScreen} />
          <Tab.Screen name="Explore" 
          options={{tabBarLabelStyle: {fontFamily: "Din Alternate", fontSize: 16, fontWeight: "600",}, headerShown: false}} component={ExploreScreen} />
          <Tab.Screen name="Profile" 
          options={{tabBarLabelStyle: {fontFamily: "Din Alternate", fontSize: 16, fontWeight: "600",}, headerShown: false}} component={SignUpScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF7',
  },
  rec_container: {
    paddingTop: 90,
    paddingHorizontal: 30,
  },
  button_container: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  nextbuttoncss: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 14,
    borderWidth: 2,
    elevation: 3,
    backgroundColor: '#BAD3B1',
    maxWidth: '400'
  },
  nextbuttontextcss: {
    fontFamily: "Helvetica",
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 0.25,
  },
  favbuttoncss: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 44,
    borderRadius: 14,
    borderWidth: 1.5,
    elevation: 3,
    backgroundColor: '#FFF4CC',
    maxWidth: '200'
  },
  favbuttontextcss: {
    paddingVertical: 0,
    fontFamily: "Helvetica",
    fontSize: 20,
    fontWeight: "600",
    color: "#FFBD12",
    letterSpacing: 0.25,
  },
  numtextcss: {
    paddingHorizontal: 30,
    fontFamily: "Din Alternate",
    fontSize: 24,
    fontWeight: "600",
    letterSpacing: 0.25,
  },
  formbodycss: {
    backgroundColor: 'fffcf7',
    color: '18191F',
    fontFamily: "Helvetica",
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 0.25,
  },
  formcontainercss:{
    paddingVertical: 25,
    paddingHorizontal: 20,
    width: '100%',
    maxWidth: '100%',
    height: '5',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: '16',
    fontFamily: "Helvetica",
    fontSize: 20,
    fontWeight: "500",
    letterSpacing: 0.25,
  },
  formcontainercsssmall: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    width: '90%',
    maxWidth: '90%',
    height: '5',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: '16',
    fontFamily: "Helvetica",
    fontSize: 20,
    fontWeight: "500",
    letterSpacing: 0.25,
  },
  allformscss:{
    maxWidth: '100%',
    paddingTop: 20,
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
    top:200
  },
  submitbuttoncss: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 130,
    borderRadius: 14,
    borderWidth: 1.5,
    elevation: 3,
    backgroundColor: '#BAD3B1',
    maxWidth: '100%'
  },
  bigsignup: {
    fontSize: 50,
    fontWeight: "800",
    font: "Helvetica",
    paddingVertical: 10,
    marginBottom: 10,
  },
  littlesignup: {
  paddingVertical: 5,
  fontSize: 20,
  fontWeight: '100',
  font: "Arial",
  },
  signupformat: {
    top: 200,
    left: 60,
  },
  welcome: {
    font: "Arial",
    fontSize: 40,
    fontWeight: '600',
    marginTop: 65,
    marginLeft: 20,
  },
  favorite2: {
    allignItems: 'right',
    marginLeft: 10,
  },
  exploresearch: {
    allignItems: 'center',
    justifyContent: 'center',
    leftMargin: 500,
    
  },
  cardcss: {
    backgroundColor: '#C9E9E5',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#18191F',
    marginTop: 30,
    allignItems: 'center',
},
vaccinecss: {
  fontSize: 30,
  font: "Arial",
  marginLeft: 20,
},
imagecss: {
  width: '100%', 
  height: 200,
  borderTopLeftRadius: 13,
  borderTopRightRadius: 13,
},
});
