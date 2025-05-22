import CalendarComponent from "@/components/dashboard/Calendar";
import SafeAreaLayout from "@/components/layout/SafeAreaLayout";
import { auth, db } from "@/config/firebase";
import SIZES from "@/constants/size";
import { Theme } from "@/constants/theme";
import { UserData } from "@/types";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { MotiView } from "moti";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Button, Card, Divider, Text } from "react-native-paper";

const DashboardScreen: React.FC = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data() as UserData);
        }
      }
    };
    fetchUserData();
  }, []);

  return (
    <SafeAreaLayout>

      <ScrollView style={{ flex: 1 }}>

        {/* Welcome Section */}
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring", duration: 500 }}
          style={{ marginBottom: 20 }}
        >
          <Text variant="titleLarge" style={{ color: Theme.text, fontSize: SIZES.header }}>Welcome,</Text>
          <Text variant="bodyMedium" style={{ color: "green", fontSize: SIZES.title }}> {/* "#aaa" */}
            {userData?.name || userData?.email || "User"}
          </Text>
        </MotiView>

        {/* User Info Card */}
        <Card style={[styles.card, {padding: 0}]}>
          <Card.Title
            title={userData?.name || userData?.email || "User"}
            subtitle={userData?.emailVerified ? "Email: Verified ✅" : "Email: Unverified ❌"}
            left={(props) => (
              <Avatar.Image
                {...props}
                source={{ uri: "https://i.pravatar.cc/119" }}
                size={50}
              />
            )}
            titleStyle={{ color: Theme.text, fontSize: SIZES.title }}
            subtitleStyle={{ color: "#aaa", fontSize: SIZES.contentText }}
          />
        </Card>

        {/* Phone Number Status */}
        <Text variant="titleLarge" style={{ color: Theme.text, fontSize: SIZES.title, marginBottom: 10 }}>
          Phone Number
        </Text>
        <Card style={styles.card}>
          {userData?.phoneNumber ? (
                <Card.Content style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 5 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 20
                    }}
                  >
                    <FontAwesome5 name="phone-alt" size={24} />
                    <Text style={{ color: Theme.text, fontSize: SIZES.contentText }}>{userData.phoneNumber}</Text>
                  </View>

                  {userData?.phoneNumberVerified ? (
                    <FontAwesome5 name="check-circle" size={24} color="green" />
                  ) : (
                    <MaterialIcons name="pending-actions" size={24} color="orange" />
                  )}
                </Card.Content>
            
          ) : (
            <Text variant="bodyMedium" style={{ color: "#aaa", fontSize: SIZES.contentText }}>No phone number is verified yet.</Text>
          )}
        </Card>

        {/* Contact Information Status */}
        <Text variant="titleLarge" style={{ color: Theme.text, fontSize: SIZES.title, marginBottom: 10 }}>
          Contact Information
        </Text>

        <Card style={styles.card}>
          {userData?.contactNumbers.contact1.phoneNumber || userData?.contactNumbers.contact2.phoneNumber ? (
            Object.entries(userData.contactNumbers).map((item) => {
              const {contactName, phoneNumber, verified } = item[1];
              if( !phoneNumber ) return (<React.Fragment key={item[0]}><Text variant="bodyMedium" style={{ color: "#aaa", fontSize: SIZES.contentText }}>{item[0] === 'contact1' ? "Primary" : "Secondary"} contact&apos;s not verified yet.</Text></React.Fragment>)
              return (
              <React.Fragment key={item[0]}>
                <Card.Content style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 5 }}>
                  <Text style={{ color: Theme.text, fontSize: SIZES.contentText }}>{contactName || "Contact"}: {phoneNumber}</Text>
                  {verified ? (
                    <FontAwesome5 name="check-circle" size={20} color="green" />
                  ) : (
                    <MaterialIcons name="pending-actions" size={24} color="orange" />
                  )}
                </Card.Content>
                {item[0] === 'contact1' && (<Divider style={{ backgroundColor: "#333" }} />)}
              </React.Fragment>
            )})
          ) : (
            <Text variant="bodyMedium" style={{ color: "#aaa", fontSize: SIZES.contentText }}>No contact(s) verified yet.</Text>
          )}

        </Card>

        {/* Actions */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring", duration: 500 }}
        >
          <Button
            mode="contained"
            buttonColor={Theme.primary} //"#1E88E5"
            style={[{ marginBottom: 10 }]}
            // onPress={() => router.push("/(auth)/register/add-friends")}
            onPress={() => router.push("/(auth)/register/contacts-verification")}
          >
            <Text style={{fontSize: SIZES.title, color: "#FFFFFF", paddingVertical: 6}}>Verify More Friends</Text>
            
          </Button>
          <Button
            mode="contained"
            buttonColor="#E53935"
            onPress={async () => {
              await auth.signOut();
              router.replace("/(auth)/login");
            }}
          >
            <Text style={{fontSize: SIZES.title, color: "#FFFFFF", paddingVertical: 6}}>Signout</Text>
          </Button>
        </MotiView>

        <View style={{height:0, borderBottomWidth: 1, borderBottomColor: "#aaa", marginVertical: 30}} />

        {/* Scheduler Section */}
        <MotiView>
          <Text variant="titleLarge" style={{ color: Theme.text, fontSize: SIZES.title, marginBottom: 15 }}>Set Your Schedule</Text>

          <CalendarComponent />
          
        </MotiView>
      </ScrollView>

    </SafeAreaLayout>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "transparent",
    marginBottom: 20,
    padding: 10,
    // borderWidth: 1,
    // borderColor: "#aaa"
    // elevation: 0,
    // boxShadow: "none"
  }
});