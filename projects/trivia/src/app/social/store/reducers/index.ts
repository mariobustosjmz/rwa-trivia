import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';

import { Subscription, Subscribers, Blog } from 'shared-library/shared/model';
import {
    subscriptionSaveStatus, getTotalSubscriptionStatus,
    subscriptionRemoveStatus, checkEmailSubscriptionStatus,
    socialShareImageUrl, blogs
} from './social.reducer';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';

export * from './social.reducer';

export interface SocialState {
    subscriptionSaveStatus: String;
    getTotalSubscriptionStatus: Subscribers;
    subscriptionRemoveStatus: String;
    checkEmailSubscriptionStatus: Boolean;
    socialShareImageUrl: UploadTaskSnapshot;
    blogs: any;
}

export const reducer: ActionReducerMap<SocialState> = {
    subscriptionSaveStatus: subscriptionSaveStatus,
    getTotalSubscriptionStatus: getTotalSubscriptionStatus,
    subscriptionRemoveStatus: subscriptionRemoveStatus,
    checkEmailSubscriptionStatus: checkEmailSubscriptionStatus,
    socialShareImageUrl: socialShareImageUrl,
    blogs: blogs
};

export const socialState = createFeatureSelector<SocialState>('social');
