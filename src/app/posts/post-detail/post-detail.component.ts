import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PostService } from '../post.service';
import { Post } from '../post';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post;
  editing: boolean = false;
  replyContent: string;
  replyButtonText: string = "Reply";
  replyMode: boolean = false;
  id = this.route.snapshot.paramMap.get('id');
  
  constructor(private route: ActivatedRoute, private postService: PostService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.getPost();
    console.log(this);
  }

  getPost() {
    return this.postService.getPostData(this.id).subscribe(data => (this.post = data));
  }

  updatePost() {
    const formData = {
      title: this.post.title,
      content: this.post.content,
      link: this.post.link ? this.post.link : ''
    }
    this.postService.update(this.id, formData);
    this.editing = false;
  }

  delete() {
    if (confirm("You sure you want to delete this?")) {
      this.postService.delete(this.id);
      this.router.navigate(["/sheet"]);
    }
  }

  onReplyMode() {
    this.replyMode = true;
  }

}
