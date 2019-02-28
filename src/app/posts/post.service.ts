import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Post } from './post';

@Injectable()
export class PostService {
  postsCollection: AngularFirestoreCollection<Post>;
  postDoc: AngularFirestoreDocument<Post>;

  constructor(private afs: AngularFirestore) {
    this.postsCollection = this.afs.collection('posts', ref => ref.orderBy('date', 'desc'))
  }

  getPosts(): Observable<Post[]> {
    return this.postsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    }))
  }

  getPostData(id: string) {
    this.postDoc = this.afs.doc<Post>(`posts/${id}`);
    return this.postDoc.valueChanges();
  }
  
  getPost(id: string) {
    return this.afs.doc<Post>(`posts/${id}`);
  }
  
  create(data: Post) {
    this.postsCollection.add(data);
  }

  delete(id: string) {
    this.getPost(id).delete();
  }
   
  update(id: string, formData) {
    return this.getPost(id).update(formData);
  }

}
