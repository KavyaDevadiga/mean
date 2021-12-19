import { postcreatecomponent } from './posts/post-create/post-create.component';
import { Post } from './posts/post.model';
import { postOutputComponent } from './posts/post-output/post-output.component';
import { NgModule } from '@angular/core';
import { RouterModule ,Routes} from '@angular/router';

const routes:Routes=[
  {path:'',component:postOutputComponent},
  {path:'create',component:postcreatecomponent},
  {path:'edit/:postId',component:postcreatecomponent}
];
@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule{}
