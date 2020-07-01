import { NgModule } from '@angular/core';

import { AppSharedModule } from '../../shared/shared.module';

import { InviteFriendsRoutingModule } from './invite-friends-routing.module';
import { InviteFriendsComponent } from './invite-friends.component';

@NgModule({
  declarations: [InviteFriendsComponent],
  imports: [InviteFriendsRoutingModule, AppSharedModule],
})
export class InviteFriendsModule {}
