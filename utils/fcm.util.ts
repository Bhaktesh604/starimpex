"use client"
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported, onMessage } from "firebase/messaging";
import { FIREBASE_CONFIG, FIREBASE_VAPID_KEY } from "./constants";

export const firebaseApp = initializeApp(FIREBASE_CONFIG);
const messaging = (async () => {
    try {
        const isSupportedBrowser = await isSupported();
        if (isSupportedBrowser) {
            return getMessaging(firebaseApp);
        }
        console.log('Firebase not supported this browser');
        return null;
    } catch (err) {
        console.log('Something went wrong',err);
        return null;
    }
});

export const getFcmToken = async ():Promise<string> => {
    registerServiceWorker();
    return new Promise((resolve, reject) => {
        Notification.requestPermission().then(async (permission) => {
            const getMessageInstance = await messaging();
            if (permission === 'granted') {
                if(getMessageInstance){
                    getToken(getMessageInstance, { vapidKey: FIREBASE_VAPID_KEY }).then((currentToken) => {
                        if (currentToken) {
                            resolve(currentToken)
                        } else {
                            console.log('No registration token available. Request permission to generate one.');
                            resolve("")
                        }
                    }).catch((err) => {
                        console.log('An error occurred while retrieving token. ', err);
                        resolve("")
                    });
                }
                resolve("")
            }
            resolve("")
        }).catch((err) => {
            console.log('Error while requesting permission',err)
            resolve("")
        })
    })
}

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/firebase-messaging-sw.js')
            .then(function (registration) {
                return registration.scope;
            })
            .catch(function (err) {
                console.log('An error occurred while service worker register',err)
                return null;
            });
    }

    return null;
}

