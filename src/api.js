import mockData from './mock-data';
import NProgress from 'nprogress';

export const extractLocations = (events) => {
    const extractedLocations = events.map((event) => event.location);
    const locations = [...new Set(extractedLocations)];
    return locations;
};

const checkToken = async (accessToken) => {
    const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    const result = await response.json();
    return result;
};

const removeQuery = () => {
    let newurl;
    if (window.history.pushState && window.location.pathname) {
        newurl =
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname;
        window.history.pushState("", "", newurl);
    } else {
        newurl = window.location.protocol + "//" + window.location.host;
        window.history.pushState("", "", newurl);
    }
};

const getToken = async (code) => {
    const encodeCode = encodeURIComponent(code);
    const response = await fetch(
        'https://7g67xfrpr6.execute-api.us-east-1.amazonaws.com/dev/api/token/' + encodeCode
    );
    const { access_token } = await response.json();
    access_token && localStorage.setItem("access_token", access_token);

    return access_token;
};

export const getEvents = async () => {
    NProgress.start();
    if (window.location.href.startsWith("http://localhost")) {
        NProgress.done();
        return mockData;
    }
    if (!navigator.onLine) {
        const events = localStorage.getItem("lastEvents");
        NProgress.done();
        return events ? JSON.parse(events) : [];
    }
    console.log("Start of getEvents");
    const token = await getAccessToken();
    console.log("After getAccessToken");
    localStorage.setItem("localStorageTest", "This should be save in local storage.");
    if (token) {
        removeQuery();
        const url = "https://7g67xfrpr6.execute-api.us-east-1.amazonaws.com/dev/api/get-events/" + token;
        const response = await fetch(url);
        const result = await response.json();
        console.log("Result before the if statement:");
        if (result) {
            NProgress.done();
            console.log("Before localStorage.setItem");
            localStorage.setItem("lastEvents", JSON.stringify(result.events));
            console.log("After localStorage.setItem");
            return result.events;
        } else return null;
    }
};

// export const getEvents = async () => {
//     NProgress.start();
//     if (window.location.href.startsWith("http://localhost")) {
//         NProgress.done();
//         return mockData;
//     }
//     if (!navigator.onLine) {
//         const events = localStorage.getItem("lastEvents");
//         NProgress.done();
//         console.log("offline data: ", events)
//         return events ? JSON.parse(events) : [];
//     }
//     const token = await getAccessToken();
//     if (token) {
//         removeQuery();
//         const url = "https://7g67xfrpr6.execute-api.us-east-1.amazonaws.com/dev/api/get-events/" + token;
//         const response = await fetch(url);
//         if (!response.ok) {
//             console.error('Network request failed:', response.statusText);
//             NProgress.done();
//             return null;
//         }
//         const result = await response.json();
//         if (result) {
//             NProgress.done();
//             localStorage.setItem("lastEvents", JSON.stringify(result.events));
//             return result.events;
//         } else return null;

//     }
// };

export const getAccessToken = async () => {
    const accessToken = localStorage.getItem('access_token');
    const tokenCheck = accessToken && (await checkToken(accessToken));

    if (!accessToken || tokenCheck.error) {
        await localStorage.removeItem("access_token");
        const searchParams = new URLSearchParams(window.location.search);
        const code = await searchParams.get("code");
        if (!code) {
            const response = await fetch(
                "https://7g67xfrpr6.execute-api.us-east-1.amazonaws.com/dev/api/get-auth-url"
            );
            const result = await response.json();
            const { authUrl } = result;
            return (window.location.href = authUrl);
        }
        return code && getToken(code);
    }
    return accessToken;
};
