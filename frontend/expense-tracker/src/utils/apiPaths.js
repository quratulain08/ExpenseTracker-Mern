export const BASE_URL = import.meta.env.VITE_API_URL;





export const API_PATHS = {
    Auth:{
        LOGIN: "/api/v1/auth/login",
        REGISTER: "/api/v1/auth/register",
        GET_USER_INFO: "/api/v1/auth/user",

    },
    DASHBOARD:{
        GET_DATA: "/api/v1/dashboard",
    },
    INCOME:{
        ADD_INCOME: "/api/v1/income/add",
        GET_ALL_INCOME: "/api/v1/income/get",
        DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
        DOWNLOAD_INCOME: "/api/v1/income/downloadexcel",
        UPLOAD_ICON: "/api/v1/income/upload-icon",
    },
    EXPENSE:{
         ADD_EXPENSE: "/api/v1/expense/add",
        GET_ALL_EXPENSE: "/api/v1/expense/get",
        DELETE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`,
        DOWNLOAD_EXPENSE: "/api/v1/expense/downloadexcel",
        UPLOAD_ICON: "/api/v1/expense/upload-icon",
    },
    IMAGE:{
        UPLOAD_IMAGE: "/api/v1/auth/upload-image",
    }
};