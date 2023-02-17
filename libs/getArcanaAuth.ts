import { AuthProvider } from "@arcana/auth";

const auth = new AuthProvider("b12cc0b1f13a0a0543e5059ab4fdb4f5a662902d", {
    theme: "light",
});

const getAuth = () => {
    return auth;
};


export default getAuth;
