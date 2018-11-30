import { Component, OnInit, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { User } from 'shared-library/shared/model';
import { Utils } from 'shared-library/core/services';
import { AppState, appState } from '../../../store';
import { Store, select } from '@ngrx/store';
import * as useractions from '../../../user/store/actions';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserActions } from 'shared-library/core/store/actions';


@Component({
  selector: 'app-invite-friends',
  templateUrl: './invite-friends.component.html',
  styleUrls: ['./invite-friends.component.scss']
})
export class InviteFriendsComponent implements OnInit {

  displayedColumns = ['friends', 'game_played',
    'won', 'lost'];
  uFriends: Array<any>;
  userDict$: Observable<{ [key: string]: User }>;
  userDict: { [key: string]: User } = {};
  dataSource: any;
  subs: Subscription[] = [];
  defaultAvatar = 'assets/images/default-avatar.png';


  constructor(private store: Store<AppState>, private renderer: Renderer2, private userActions: UserActions, private utils: Utils) {
    this.userDict$ = this.store.select(appState.coreState).pipe(select(s => s.userDict));
    this.subs.push(this.userDict$.subscribe(userDict => this.userDict = userDict));
    this.subs.push(this.store.select(appState.coreState).pipe(select(s => s.user)).subscribe(user => {
      if (user) {
        this.store.dispatch(new useractions.LoadUserFriends({ 'userId': user.userId }));
      }
    }));
    this.subs.push(this.store.select(appState.userState).pipe(select(s => s.userFriends)).subscribe(uFriends => {

      if (uFriends !== null && uFriends !== undefined) {
        this.uFriends = [];
        uFriends.myFriends.map((friend, index) => {
          this.store.dispatch(this.userActions.loadOtherUserProfile(Object.keys(friend)[0]));
          this.uFriends.push(friend[Object.keys(friend)[0]]);
          this.uFriends[index].userId = Object.keys(friend)[0];
        });
      }
    }));
  }

  ngOnInit() {

  }

  getImageUrl(user: User) {
    return this.utils.getImageUrl(user, 44, 40, '44X40');
  }

}
