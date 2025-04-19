import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
    const token: Ref<string | null> = ref(null);
    const storedToken = localStorage.getItem('token');
    if(storedToken) {
        try {
            const decodedPayload = atob(storedToken.split('.')[1]);
            const payload = JSON.parse(decodedPayload);
            if (payload.exp) {
                if (payload.exp > Math.floor(Date.now() / 1000)) {
                    console.log("jwt token not expired.");
                    token.value = storedToken;
                } else {
                    console.log(`jwt token expired or payload.exp : ${payload.exp} not a number`);
                    localStorage.removeItem('token');
                }
            } else {
                console.log("jwt token.payload lack of exp");
                localStorage.removeItem('token');
            }
        } catch (error) {
            console.log("Something wrong happens when parsing localStorage.token:", error);
            localStorage.removeItem('token');
        }
    } else {
        console.log("No jwt token found in localStorage.");
    }
})