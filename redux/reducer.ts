import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import userReducer from "@/redux/user/service/user.slice";
import judicialReducer from "@/redux/judicial-precedent/service/judicial.slice";
import lawlawReducer from "@/redux/lawlaw/service/lawlaw.slice";

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

const lawlawPersistConfig = {
  key: "lawlaw",
  storage,
  whitelist: ["lawlawState"],
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedJudicialReducer = persistReducer(
  judicialPersistConfig,
  judicialReducer
);
const persistedLawlawReducer = persistReducer(
  lawlawPersistConfig,
  lawlawReducer
);

export const rootReducer = combineReducers({
  user: persistedUserReducer,
  judicial: persistedJudicialReducer,
  lawlaw: persistedLawlawReducer,
});
