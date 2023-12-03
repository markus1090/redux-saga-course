import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postReducer from '../features/postSlice';
import userReducer from '../features/usersSlice';
import currentUserReducer from '../features/currentUserSlice';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    posts: postReducer,
    users: userReducer,
    currentUser: currentUserReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
                ],
            },
        })
})

export type RootState = ReturnType<typeof rootReducer>;
export const persistor = persistStore(store);