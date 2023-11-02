import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { addDeviceTokenApi } from '../apis/account';
import { Notifications } from 'react-native-notifications';
import { genTextFromRuleAutomated } from './helper';

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        GetFCMToken();
    }
}

export async function GetFCMToken() {
    let fcm_token = await AsyncStorage.getItem("fcm_token");

    console.log("old token fcm ", fcm_token);
    if (!fcm_token) {
        try {
            let fcm_token = await messaging().getToken();
            console.log("new token ", fcm_token);
            await AsyncStorage.setItem("fcm_token", fcm_token);
        } catch (error) {
            console.log(error, "#1 error GetFCMToken");
        }
    }

}

export const NotificationListener = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
    });


    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
            }
        });

    messaging().onMessage(async remoteMessage => {
        console.log("notification on froground state ......", remoteMessage);
        const { notification, data } = remoteMessage;
        const { rule } = data

        const rule_data = JSON.parse(rule);

        Notifications.postLocalNotification({
            title: notification?.title,
            body: genTextFromRuleAutomated(rule_data),
        });
    })

    messaging().setBackgroundMessageHandler(async remoteMessage => {
        // Handle background messages here
        const { notification, data } = remoteMessage;
        const { rule } = data

        console.log('Message handled in the background!', remoteMessage);
        Notifications.postLocalNotification({
            title: notification?.title,
            body: "",
        });
    });
}