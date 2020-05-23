import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Dishes } from './dishReducer';
import { Leaders } from './leaderReducer';
import { Comments } from './commentsReducer';
import { Promotions } from './promotionReducer';
import thunk from "redux-thunk";
import logger from "redux-logger";
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';
import { Feedback } from "./feedbackReducer";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            leaders: Leaders,
            comments: Comments,
            promotions: Promotions,
            feedback: Feedback,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}