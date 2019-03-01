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

  constructor(private route: ActivatedRoute, private postService: PostService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.getPost();
    console.log(this);
  }

  getPost() {
    const id = this.route.snapshot.paramMap.get('id');
    return this.postService.getPostData(id).subscribe(data => (this.post = data));
  }

  updatePost() {
    const formData = {
      title: this.post.title,
      content: this.post.content,
      link: this.post.link ? this.post.link : '',
      surging: this.post.surging
    }
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.update(id, formData);
    this.editing = false;
  }

  delete() {
    const id = this.route.snapshot.paramMap.get('id');
    if (confirm("You sure you want to delete this?")) {
      this.postService.delete(id);
      this.router.navigate(["/sheet"]);
    }
  }

  surging(value: number) {
    const id = this.route.snapshot.paramMap.get('id');
    if (this.post.id) {
      this.postService.update(id, { surging: value + 1 });
    }
  }

}
