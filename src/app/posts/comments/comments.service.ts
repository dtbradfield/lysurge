import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Comment } from '../comment';

@Injectable()
export class PostService {
  commentsCollection: AngularFirestoreCollection<Comment>;
  postDoc: AngularFirestoreDocument<Comment>;

  constructor(private afs: AngularFirestore) {
    this.commentsCollection = this.afs.collection('comments', ref => ref.orderBy('date', 'asc'))
  }

  getComments(): Observable<Comment[]> {
    return this.commentsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Comment;
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    }))
  }

  getPostData(id: string) {
    this.postDoc = this.afs.doc<Comment>(`posts/${id}`);
    return this.postDoc.valueChanges();
  }

  getPost(id: string) {
    return this.afs.doc<Comment>(`posts/${id}`);
  }

  create(data: Comment) {
    this.commentsCollection.add(data);
  }

  delete(id: string) {
    this.getPost(id).delete();
  }

  update(id: string, formData) {
    return this.getPost(id).update(formData);
  }

}
