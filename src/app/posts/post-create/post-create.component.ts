import { PostsService } from './../posts.service';

import { Component, EventEmitter, Output} from '@angular/core';
import { NgForm } from '@angular/forms';

import {Post} from '../post.model'
@Component({
  selector: 'post-create',
  templateUrl:'./post-create.component.html',
    styleUrls:['./post-create.component.css']

})

export class postcreatecomponent {


  titlevalue: any;
  contentvalue: any;
  // @Output()
  // posted: EventEmitter<Post>=new EventEmitter<Post>();

  constructor(public postService:PostsService){

  }
  onAddPost(formelement:NgForm){
    if(formelement.invalid){
      return;
    }

      const post:Post={
        title:formelement.value.title,
        content:formelement.value.content
      };
      // console.log(this.posted);
      // this.posted.emit(post);
      this.postService.setPosts(post);
      formelement.resetForm();



  }


}


