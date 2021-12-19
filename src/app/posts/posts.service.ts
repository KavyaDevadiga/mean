import { Injectable } from '@angular/core';
import {Post} from './post.model'
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';
@Injectable({providedIn:'root'})
export class PostsService{
  private posts:Post[] =[];
  private postsUpdated=new Subject<Post[]>();
  constructor (private http:HttpClient, private router:Router){}
  getPosts(){
    this.http.get<{message:string,posts:any}>('http://localhost:3000/api/posts')
    .pipe(map((postData=>{
      return postData.posts.map((post: { title: any; content: any; _id: any; })=>{
        return{
          title:post.title,
          content:post.content,
          id:post._id
        }
      })
    })))
    .subscribe((backposts)=>{
      this.posts=backposts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPost(id:string){
    console.log("fetching post")
    return this.http.get<{_id:string, title:string, content:string}>('http://localhost:3000/api/posts/'+id);
  }

  getPostUpdated(){
    return this.postsUpdated.asObservable();
  }
  setPosts(title:string,content:string,image:File){
    const postData=new FormData();
    postData.append("title",title);
    postData.append("content",content);
    postData.append("image",image,title);

    this.http.post<{message:string,post:any}>('http://localhost:3000/api/posts',postData)
    .pipe(map((bpost=>{
        return{
          title:bpost.post.title,
          content:bpost.post.content,
          id:bpost.post._id
        }

    })))
    .subscribe((backpost)=>{
      const post:Post={id:backpost.id,title:backpost.title,content:backpost.content}
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(["/"]);
    });
  }
  updatePost(id:string, title:string, content:string){
    const post:Post={id:id,title:title,content:content};
    this.http.patch<{message:string,post:{title:string,content:string,_id:string}}>('http://localhost:3000/api/posts/'+id,post)
    .pipe(map((postData=>{
        return{
          title:postData.post.title,
          content:postData.post.content,
          id:postData.post._id
        }
    })))
    .subscribe((xpost)=>{
      this.posts=this.posts.filter(cpost=>cpost.id!=xpost.id);
      this.posts.push(xpost);
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(["/"]);
    })

  }
  deletePost(pid:string){
    this.http.delete('http://localhost:3000/api/posts/'+pid)
    .subscribe(()=>{
     this.posts=this.posts.filter(post=>post.id!=pid);
     this.postsUpdated.next([...this.posts]);
    })
  }
}















