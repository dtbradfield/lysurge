import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css']
})
export class PostDashboardComponent implements OnInit {
  title: string;
  link: string = null;
  content: string;

  buttonText: string = "Create Tab";
  
  constructor(private auth: AuthService, private postService: PostService) { }

  ngOnInit() {
  }

  createPost() {
    const data = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      content: this.content,
      link: this.link,
      date: new Date(),
      title: this.title,
      numberComments: 0,
      surging: 1
    }
    this.postService.create(data);
    this.title = '';
    this.content = '';
    this.link = '';
    this.buttonText = 'Tab Added!';
    setTimeout(() => this.buttonText = "Create Tab", 3000);
  }

}
