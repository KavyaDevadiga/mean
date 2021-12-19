import { PostsService } from './../posts.service';
import { Component, OnInit } from "@angular/core";
import { Subscription } from 'rxjs';
import { Post } from "../post.model";
import { OnDestroy } from '@angular/core';

@Component({
  selector:'output-post',
  templateUrl:'./post-output.component.html',
  styleUrls:['./post-output.component.css']
})
export class postOutputComponent implements OnInit, OnDestroy{
  // @Input() posts:Post[]= [];
  posts:Post[]= [];
  subscriber:Subscription=new Subscription();
  isloading=false;
  constructor(public postService:PostsService){

    console.log(postService);

  }
  ngOnInit(){
    this.isloading=true;
    this.postService.getPosts();
    this.subscriber=this.postService.getPostUpdated()
    .subscribe((posts:Post[])=>{
      this.isloading=false;
      this.posts=posts;
      console.log(this.posts)
    });
    console.log(this.subscriber);

  }
  postdelete(id:string){
    this.postService.deletePost(id);

  }
  ngOnDestroy(){
    this.subscriber.unsubscribe();
  }


}
