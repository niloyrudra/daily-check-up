import ActionPrimaryButton from "@/components/form-components/ActionPrimaryButton";
import AuthScreenLayout from "@/components/layout/AuthScreenLayout";
import { auth, db } from "@/config/firebase";
import SIZES from "@/constants/size";
import { useRouter } from "expo-router";
import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

const VerifyEmail: React.FC = () => {
  const [verified, setVerified] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const checkVerification = async () => {
      await auth.currentUser?.reload();
      if (auth.currentUser?.emailVerified) {
        setVerified(true);

        // Update verification status in Firestore
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, { emailVerified: true });
      }
    };

    const interval = setInterval(checkVerification, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthScreenLayout title="Email Verification">
      <View style={{gap: 20, justifyContent: "center", alignItems: "center"}}>
        <View
          style={{
            gap: 6
          }}
        >
          <Text style={[{fontSize: SIZES.contentText}, (verified && {color: "green"})]}>{verified ? "Email Verified!" : "Waiting for email verification..."}</Text>
          {!verified && (<ActivityIndicator size={24} color="blue" />)}
        </View>
        {verified && <ActionPrimaryButton buttonTitle="Continue" onSubmit={() => router.push("/(auth)/register/onboarding-three")} />}
      </View>
    </AuthScreenLayout>
  );
};

export default VerifyEmail;