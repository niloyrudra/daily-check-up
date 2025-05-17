import { Theme } from '@/constants/theme';
import { Stack } from 'expo-router';

const DashboardLayout = () => {
    return (
        <Stack
            screenOptions={{
                contentStyle: {
                    backgroundColor: Theme.background
                }
            }}
            initialRouteName='home'
        >
            <Stack.Screen name="home" options={{ headerShown:false }} />
        </Stack>
    )
}
export default DashboardLayout;