import { jwtDecode } from "jwt-decode";

export function setupAutoLogout(token, navigate, fetchToken ,setLoginPage) {

    if (!token) return;

    try {
        const decoded = jwtDecode(token);
        const expiry = decoded.exp * 1000; // convert to ms
        const now = Date.now();
        const timeout = expiry - now;

        if (timeout <= 0) {
            // Token expired, clear localStorage and redirect
            localStorage.removeItem("token");
            localStorage.removeItem("userDetail");
            setLoginPage({ isActive: true, isLogined: false });
            navigate("/");
        } else {
            fetchToken();
        }
    } catch (err) {
        console.error("Invalid token:", err);
        // Clear invalid token and redirect
        localStorage.removeItem("token");
        localStorage.removeItem("userDetail");
        navigate("/");
    }
}