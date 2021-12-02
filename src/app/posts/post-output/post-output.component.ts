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

  constructor(public postService:PostsService){

    console.log(postService);

  }
  ngOnInit(){
    this.posts=this.postService.getPosts();
    this.subscriber=this.postService.getPostUpdated()
    .subscribe((posts:Post[])=>{
      this.posts=posts;
    });

  }
  ngOnDestroy(){
    this.subscriber.unsubscribe();
  }

}
