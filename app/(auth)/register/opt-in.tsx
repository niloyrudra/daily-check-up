import { auth, db } from "@/config/firebase";
import { useRouter } from "expo-router";
import { Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

import ArrowButton from "@/components/ArrowButton";
import ActionPrimaryButton from "@/components/form-components/ActionPrimaryButton";
import CheckboxField from "@/components/form-components/Checkbox";
import AuthScreenLayout from "@/components/layout/AuthScreenLayout";
import SIZES from "@/constants/size";
import STYLES from "@/constants/styles";
import { Theme } from "@/constants/theme";
import { doc, updateDoc } from "firebase/firestore";


interface FormValues {
  optIn: boolean;
}

const OptInScreen: React.FC = () => {
  const router = useRouter();
  const initialValues: FormValues = { optIn: false };
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    console.log(values);
    try {
      setLoading(true)

      const user = auth.currentUser;
      if (!user) throw new Error("Not logged in");

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        optInStatus: values.optIn,
      });

      if (values.optIn) {
        Alert.alert("Congratulations!", "You are successfully Opt-in for our SMS and Calling services.");
      } else {
        Alert.alert("Opt-in Cancellation Successful!", "You have successfully cancelled your Opt-in for our SMS and Calling services.");
      }

      // ✅ Navigate after success
      router.push("/(auth)/register/membership");
    } catch (error: any) {
      console.log("Error:", error.message);
      Alert.alert("Sorry!", "Something went wrong. Please try again or later!");
      setLoading(false)
    }
    finally {
      setLoading(false)
    }
  };


  return (
    <AuthScreenLayout title="Notification Confirmation">

      <ArrowButton />

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <View style={[STYLES.childContentCentered, {marginTop: 20}]}>

            <View
              style={[ STYLES.childContentCentered, { gap:20, marginBottom: 30 }]}
            >

              <Text style={{color:Theme.primary, fontSize: SIZES.contentText, fontWeight: "800"}}>Please, make your confirmation about receiving texts from Daily Check-up by switching the button ON.</Text>

              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: "#aaaaaa50",
                  borderRadius: 40,
                  height: 40,
                  width: 60
                }}
              >
                <CheckboxField name="optIn" />
              </View>


              <Text style={{color:Theme.primary, fontSize: SIZES.contentText}}>I want to receive SMS notifications for my scheduled check-ups.</Text>
            </View>

            <ActionPrimaryButton
              buttonTitle="Continue"
              onSubmit={handleSubmit}
              isLoading={loading}
              buttonStyle={{width: "auto", paddingHorizontal: 30}}
            />

          </View>
        )}
      </Formik>
    </AuthScreenLayout>
  );
};

export default OptInScreen;