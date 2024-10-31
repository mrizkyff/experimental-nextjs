'use client'
import axios from "axios";

// create axios
const apiClient = axios.create({
    baseURL: "http://192.168.7.7:3012",
})

apiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken'); // Ambil token dari localStorage
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Tambahkan header Authorization
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

// Tambahkan interceptor untuk respons
apiClient.interceptors.response.use(
  (response) => {
    // Cek status response, jika bukan 401 atau 403
    if (response.status !== 401 && response.status !== 403) {
      // Panggil endpoint request-new-token
      if(!response.request.responseURL.includes("/v1/bo/auth/request-token") && !response.request.responseURL.includes("/login")){
          return requestNewToken().then(() => response); // Kembalikan response setelah token baru didapat
      }
    }
    return response; // Kembalikan response jika status 401 atau 403
  },
  (error) => {
    return Promise.reject(error); // Tangani error
  }
);


const login = async () => {
    const response = await apiClient.post("/v1/bo/auth/login/gm", {
        email: "gm@az.com",
        password: "Admin123**",
    });
    localStorage.setItem("accessToken", response.data.Data.accessToken);
    localStorage.setItem("refreshToken", response.data.Data.refreshToken);
    console.log(response);
}

const listLanguageSetting = async () => {
    const response = await apiClient.get("/v1/bo/setting_bahasa?page=1&page_size=100&type=muatparts");
    console.log(response);
}

const credentialCheck = async () => {
    const response = await apiClient.get("/v1/bo/auth/credential-check");
    console.log(response);
}

const requestNewToken = async () => {
    const response = await apiClient.post("/v1/bo/auth/request-token", {
        refreshToken: localStorage.getItem("refreshToken"),
    });
    localStorage.setItem("accessToken", response.data.Data.accessToken);
    console.log(response);
}

export default function Page() {
    return (
        <>
            <h1>
                Hello World
            </h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => login()}>
                Login
            </button>
            <button className="pl-2 bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => listLanguageSetting()}>
                Protected Resource
            </button>
            
            <button className="pl-2 bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => credentialCheck()}>
                Credential Check
            </button>
        </>
    );
}