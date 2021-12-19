import { PostsService } from './../posts.service';
import { mimeType } from './mime-type.validator';
import { Component, EventEmitter, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {Post} from '../post.model'
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit } from '@angular/core';
@Component({
  selector: 'post-create',
  templateUrl:'./post-create.component.html',
    styleUrls:['./post-create.component.css']

})

export class postcreatecomponent implements OnInit {


  titlevalue: any;
  contentvalue: any;
  private mode='create';
  private postId:any;
  postp:any;
  isloading=false;
  form:any;
  imageURL:any;
  // @Output()
  // posted: EventEmitter<Post>=new EventEmitter<Post>();

  constructor(public postService:PostsService, public route:ActivatedRoute){

  }
  ngOnInit(){
    this.form=new FormGroup({
      'title':new FormControl(null,{validators: [Validators.required, Validators.minLength(3)]}),
      'content':new FormControl(null,{validators: [Validators.required]}),
      'image':new FormControl(null, {validators:[Validators.required],asyncValidators:[mimeType]})
    });
    this.route.paramMap.subscribe((params:ParamMap)=>{
      if(params.has('postId')){
        this.mode='edit';
        this.postId=params.get('postId');
        this.isloading=true;
        this.postService.getPost(this.postId).subscribe(
          backpost=>{
            this.isloading=false;
            this.postp={id:backpost._id,title:backpost.title,content:backpost.content}
            this.form.setValue({'title':this.postp.title,'content':this.postp.content})

          }
        );
      }
      else{
        this.mode='create';
        this.postId="null";
      }

    });
  }
  onImageSelect(event:any){
    if(event.target!=null){
      const file=(event.target).files[0];
      this.form.patchValue({image:file});
      this.form.get('image').updateValueAndValidity();
      console.log(this.form);
      const reader= new FileReader();
      reader.onload=()=>{
        this.imageURL=reader.result as string;
      };
      reader.readAsDataURL(file);

    }

  }
  onAddPost(){
    console.log(this.mode);
    if(this.form.invalid){
      console.log(this.form)
      return;
    }
      this.isloading=true;
      const post:Post={
        id:this.postId,
        title:this.form.value.title,
        content:this.form.value.content
      };

      // this.posted.emit(post);
      if(this.mode=='create'){
        this.postService.setPosts(post.title,post.content,this.form.value.image);

      }
      else{

        this.postService.updatePost(post.id,post.title,post.content);
      }

      this.form.reset();



  }


}


