import { Injectable } from '@angular/core';
import {Post} from './post.model'
import { Subject } from 'rxjs';

@Injectable({providedIn:'root'})
export class PostsService{
  private posts:Post[] =[];
  private postsUpdated=new Subject<Post[]>();
  getPosts(){
    return [...this.posts];
  }
  getPostUpdated(){
    return this.postsUpdated.asObservable();
  }
  setPosts(postInput:Post){
    const post:Post=postInput;
    this.posts.push(post);
    this.postsUpdated.next([...this.posts])
    

  }
}















