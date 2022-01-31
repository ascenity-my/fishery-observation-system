import { useState } from "react";

export default function useToken() {
    const getToken = () => {
        const str = localStorage.getItem("token");
        const userToken = JSON.parse(str);
        return userToken?.token;
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (token) => {
        localStorage.setItem("token", JSON.stringify(token));
        setToken(token);
    }

    return {
        token,
        setToken: saveToken,
    };
}