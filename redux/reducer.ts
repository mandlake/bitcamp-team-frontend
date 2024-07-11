import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import userReducer from "@/components/_service/user/user.slice";
import judicialReducer from "@/components/_service/judicial-precedent/judicial.slice";
import lawyerReducer from "@/components/_service/lawyer/lawyer.slice";
import chatReducer from "@/components/_service/chat/chat.slice";

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["userState"],
};
const judicialPersistConfig = {
  key: "judicial",
  storage,
  whitelist: ["judicialState"],
};

const lawyerPersistConfig = {
  key: "lawyer",
  storage,
  whitelist: ["lawyerState"],
};

const chatPersistConfig = {
  key: "chat",
  storage,
  whitelist: ["chatState"],
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedJudicialReducer = persistReducer(
  judicialPersistConfig,
  judicialReducer
);
const persistedLawyerReducer = persistReducer(
  lawyerPersistConfig,
  lawyerReducer
);
const persistedChatReducer = persistReducer(chatPersistConfig, chatReducer);

export const rootReducer = combineReducers({
  user: persistedUserReducer,
  judicial: persistedJudicialReducer,
  lawyer: persistedLawyerReducer,
  chat: persistedChatReducer,
});
