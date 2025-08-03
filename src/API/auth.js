import { jwtDecode } from "jwt-decode";

export function setupAutoLogout(token, navigate, setLoginPage, setToken, setYourCompanies, setYourProducts, setYourCustomers, setYourInvoices, Toast) {
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        const expiry = decoded.exp * 1000; // convert to ms
        const now = Date.now();
        const timeUntilExpiry = expiry - now;

        if (timeUntilExpiry <= 0) {
            // Token already expired
            performLogout(navigate, setLoginPage, setToken, setYourCompanies, setYourProducts, setYourCustomers, setYourInvoices, Toast);
            return true;
        }

        // Set timeout to logout when token expires
        const timeoutId = setTimeout(() => {
            performLogout(navigate, setLoginPage, setToken, setYourCompanies, setYourProducts, setYourCustomers, setYourInvoices, Toast);
        }, timeUntilExpiry);

        return timeoutId;
    } catch (err) {
        console.error("Invalid token:", err);
        performLogout(navigate, setLoginPage, setToken, setYourCompanies, setYourProducts, setYourCustomers, setYourInvoices);
        return true;
    }
}

function performLogout(navigate, setLoginPage, setToken, setYourCompanies, setYourProducts, setYourCustomers, setYourInvoices, Toast) {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userDetail");

    // Reset app state
    setToken("");
    setLoginPage({ isActive: true, isLogined: false });
    setYourCompanies([]);
    setYourProducts([]);
    setYourCustomers([]);
    setYourInvoices([]);

    // Navigate to login
    navigate("/");

    Toast.fire({
        icon: "warning",
        title: "Your session has expired. Please log in again."
    });
}