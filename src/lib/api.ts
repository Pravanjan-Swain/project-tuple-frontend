import axios from 'axios';
import { AUTH_ROUTES, CUSTOMER_ROUTES, DELIVERER_ROUTES, MANAGER_ROUTES,} from '../types/api';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Create axios instance with default config
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Add request interceptor for JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API functions
export const authApi = {
  register: async (data: typeof AUTH_ROUTES.REGISTER.request) => {
    const response = await api.post<typeof AUTH_ROUTES.REGISTER.response>(AUTH_ROUTES.REGISTER.path, data);
    return response.data;
  },

  login: async (data: typeof AUTH_ROUTES.LOGIN.request) => {
    const response = await api.post<typeof AUTH_ROUTES.LOGIN.response>(AUTH_ROUTES.LOGIN.path, data);
    return response.data;
  },

  logout: async () => {
    const response = await api.post<typeof AUTH_ROUTES.LOGOUT.response>(AUTH_ROUTES.LOGOUT.path);
    return response.data;
  },

  changepassword: async (data: typeof AUTH_ROUTES.CHANGE_PASSWORD.request) => {
    const response = await api.post<typeof AUTH_ROUTES.CHANGE_PASSWORD.response>(AUTH_ROUTES.CHANGE_PASSWORD.path, data);
    return response.data;
  }
};

// Customer API functions
export const customerApi = {
  getManagers: async () => {
    const response = await api.get<typeof CUSTOMER_ROUTES.GET_MANAGERS.response>(CUSTOMER_ROUTES.GET_MANAGERS.path);
    return response.data;
  },

  getPublications: async () => {
    const response = await api.get<typeof CUSTOMER_ROUTES.GET_PUBLICATIONS.response>(CUSTOMER_ROUTES.GET_PUBLICATIONS.path);
    return response.data;
  },

  getSubscriptions: async () => {
    const response = await api.get<typeof CUSTOMER_ROUTES.GET_SUBSCRIPTIONS.response>(CUSTOMER_ROUTES.GET_SUBSCRIPTIONS.path);
    return response.data;
  },

  createSubscription: async (data: typeof CUSTOMER_ROUTES.CREATE_SUBSCRIPTION.request) => {
    const response = await api.post<typeof CUSTOMER_ROUTES.CREATE_SUBSCRIPTION.response>(
      CUSTOMER_ROUTES.CREATE_SUBSCRIPTION.path,
      data
    );
    return response.data;
  },

  updateSubscription: async (id: string, data: typeof CUSTOMER_ROUTES.UPDATE_SUBSCRIPTION.request) => {
    const response = await api.put<typeof CUSTOMER_ROUTES.UPDATE_SUBSCRIPTION.response>(
      CUSTOMER_ROUTES.UPDATE_SUBSCRIPTION.path.replace(':id', id),
      data
    );
    return response.data;
  },

  cancelSubscription: async (id: string) => {
    const response = await api.delete<typeof CUSTOMER_ROUTES.CANCEL_SUBSCRIPTION.response>(
      CUSTOMER_ROUTES.CANCEL_SUBSCRIPTION.path.replace(':id', id)
    );
    return response.data;
  },

  requestPause: async (data: typeof CUSTOMER_ROUTES.REQUEST_PAUSE.request) => {
    const response = await api.post<typeof CUSTOMER_ROUTES.REQUEST_PAUSE.response>(
      CUSTOMER_ROUTES.REQUEST_PAUSE.path,
      data
    );
    return response.data;
  },

  getBills: async () => {
    const response = await api.get<typeof CUSTOMER_ROUTES.GET_BILLS.response>(CUSTOMER_ROUTES.GET_BILLS.path);
    return response.data;
  },

  getBillDetails: async (id: string) => {
    const response = await api.get<typeof CUSTOMER_ROUTES.GET_BILL_DETAILS.response>(
      CUSTOMER_ROUTES.GET_BILL_DETAILS.path.replace(':id', id)
    );
    return response.data;
  },

  makePayment: async (data: typeof CUSTOMER_ROUTES.MAKE_PAYMENT.request) => {
    const response = await api.post<typeof CUSTOMER_ROUTES.MAKE_PAYMENT.response>(
      CUSTOMER_ROUTES.MAKE_PAYMENT.path,
      data
    );
    return response.data;
  },
};

// Deliverer API functions
export const delivererApi = {
  getRoutes: async () => {
    const response = await api.get<typeof DELIVERER_ROUTES.GET_ROUTES.response>(DELIVERER_ROUTES.GET_ROUTES.path);
    return response.data;
  },

  getSchedule: async () => {
    const response = await api.get<typeof DELIVERER_ROUTES.GET_SCHEDULE.response>(DELIVERER_ROUTES.GET_SCHEDULE.path);
    return response.data;
  },

  getDeliveryItems: async () => {
    const response = await api.get<typeof DELIVERER_ROUTES.GET_DELIVERY_ITEMS.response>(DELIVERER_ROUTES.GET_DELIVERY_ITEMS.path);
    return response.data;
  },

  updateDeliveryStatus: async (id: string, data: typeof DELIVERER_ROUTES.UPDATE_DELIVERY_STATUS.request) => {
    const response = await api.put<typeof DELIVERER_ROUTES.UPDATE_DELIVERY_STATUS.response>(
      DELIVERER_ROUTES.UPDATE_DELIVERY_STATUS.path.replace(':id', id),
      data
    );
    return response.data;
  },

  getEarnings: async (query?: typeof DELIVERER_ROUTES.GET_EARNINGS.query) => {
    const response = await api.get<typeof DELIVERER_ROUTES.GET_EARNINGS.response>(
      DELIVERER_ROUTES.GET_EARNINGS.path,
      { params: query }
    );
    return response.data;
  },
};

// Manager API functions
export const managerApi = {
  getAreas: async () => {
    const response = await api.get<typeof MANAGER_ROUTES.GET_AREAS.response>(MANAGER_ROUTES.GET_AREAS.path);
    return response.data;
  },

  getCustomers: async () => {
    const response = await api.get<typeof MANAGER_ROUTES.GET_CUSTOMERS.response>(MANAGER_ROUTES.GET_CUSTOMERS.path);
    return response.data;
  },

  addDeliverer: async (data: typeof MANAGER_ROUTES.ADD_DELIVERER.request) => {
    const response = await api.post<typeof MANAGER_ROUTES.ADD_DELIVERER.response>(
      MANAGER_ROUTES.ADD_DELIVERER.path,
      data
    );
    return response.data;
  },

  generateBills: async (data: typeof MANAGER_ROUTES.GENERATE_BILLS.request) => {
    const response = await api.post<typeof MANAGER_ROUTES.GENERATE_BILLS.response>(
      MANAGER_ROUTES.GENERATE_BILLS.path,
      data
    );
    return response.data;
  },

  generateFinancialReport: async (query: typeof MANAGER_ROUTES.GENERATE_FINANCIAL_REPORT.query) => {
    const response = await api.get<typeof MANAGER_ROUTES.GENERATE_FINANCIAL_REPORT.response>(
      MANAGER_ROUTES.GENERATE_FINANCIAL_REPORT.path,
      { params: query }
    );
    return response.data;
  },

  processDelivererPayments: async (data: typeof MANAGER_ROUTES.PROCESS_DELIVERER_PAYMENTS.request) => {
    const response = await api.post<typeof MANAGER_ROUTES.PROCESS_DELIVERER_PAYMENTS.response>(
      MANAGER_ROUTES.PROCESS_DELIVERER_PAYMENTS.path,
      data
    );
    return response.data;
  },
};