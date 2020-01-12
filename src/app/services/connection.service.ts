import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  url: string = 'https://pelicar.herokuapp.com/send';
  constructor(private http: HttpClient) { }

  sendMessage(messageContent: any) {
    return this.http.post(this.url,
      JSON.stringify(messageContent),
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' });
  }
}
