import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/core/auth.service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  content: string;
  buttonText: string = "Reply";
  replyMode: boolean = false;


  constructor(private route: ActivatedRoute, private postService: PostService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  createComment() {
    const data = {
      replyAuthor: this.auth.authState.displayName || this.auth.authState.email,
      replyAuthorId: this.auth.currentUserId,
      replyContent: this.content,
      replyDate: new Date()
    }
    const postId = this.route.snapshot.paramMap.get('id');
    this.content = '';
    this.buttonText = 'Comment Added!';
    setTimeout(() => {
      this.buttonText = "Reply";
    }, 3000);
  }

  onReply() {
    this.replyMode = !this.replyMode;
  }

}
