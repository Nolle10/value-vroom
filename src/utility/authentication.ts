import { create } from 'zustand'
import { queryClient } from '../App'
import { baseUrl } from '../api/apiUrl'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist } from "zustand/middleware"
import { decode } from 'base-64'

export enum AuthenticationState {
    Unauthenticated,
    Authenticating,
    Authenticated,
    Error
}

interface AuthenticationStore {
    state: AuthenticationState,
    token: string,
    login: (username: string, password: string) => Promise<void>,
    signedIn: () => boolean,
    signOut: () => void,
}

export const useAuthenticationStore = create(persist<AuthenticationStore>(
    (set, get) => ({
        state: AuthenticationState.Unauthenticated,
        token: "",
        login: async (username: string, password: string) => {
            set({ state: AuthenticationState.Authenticating })

            const response = await oldFetch(baseUrl + "/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    grant_type: "password",
                    username: username,
                    password: password,
                }).toString(),
            });

            if (response.ok) {
                const response_data = await response.json()
                set({ state: AuthenticationState.Authenticated, token: response_data.access_token })
            } else {
                set({ state: AuthenticationState.Error })
            }

            queryClient.invalidateQueries()
        },
        signedIn: () => {
            if (get().state !== AuthenticationState.Authenticated)
                return false

            const token = get().token
            if (token === "") {
                return false
            }

            const payload = JSON.parse(decode(token.split(".")[1]))
            const expiry = new Date(payload.exp * 1000)
            const now = new Date()
            if (now > expiry) {
                set({ state: AuthenticationState.Unauthenticated, token: "" })
                return false
            }
            return true
        },
        signOut: () => {
            set({ state: AuthenticationState.Unauthenticated, token: "" })
            queryClient.invalidateQueries()
        }
    }),
    {
        name: "authentication-storage",
        getStorage: () => AsyncStorage,
    }
))


// A crude way to add the token to all requests, we
// should change the code-gen to use a custom fetcher
const oldFetch = window.fetch;
window.fetch = function () {
    // console.error(arguments)
    if (useAuthenticationStore.getState().state === AuthenticationState.Authenticated) {
        arguments[1].headers = { 'Authorization': 'Bearer ' + useAuthenticationStore.getState().token, ...arguments[1].headers };
    }
    return oldFetch.apply(window, arguments as any);
}
