import { Inject, Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface PostingRequest {
    title: string;
    description: string;
    subject: string;
    location: string;
    meetingTime: string;
}

export interface PostingResponse {
    id: number;
    title: string;
    description: string;
    subject: string;
    location: string;
    meetingTime: string;
    authorUsername: string;
    createdAt: string;
    // Below does not exist on backend yet
    imageUrl?: string;
    type?: 'in-person' | 'virtual';
    memberCount?: number;
    isJoined?: boolean;
}

@Injectable({ providedIn: 'root' })
export class EventService {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    // --- GET all postings (no auth needed) ---
    getAll(): Observable<PostingResponse[]> {
        return this.http.get<PostingResponse[]>(`${this.apiUrl}/postings`);
    }

    // --- GET single post (no auth needed) ---
    getById(id: number): Observable<PostingResponse> {
        return this.http.get<PostingResponse>(`${this.apiUrl}/postings/${id}`);
    }

    // --- POST create a new post (auth required and interceptor handles token) ---
    create(posting: PostingRequest): Observable<PostingResponse> {
        return this.http.post<PostingResponse>(`${this.apiUrl}/postings`, posting);
    }

    // --- PUT update a post (auth needed) ---
    update(id: number, posting: PostingRequest): Observable<PostingResponse> {
        return this.http.put<PostingResponse>(`${this.apiUrl}/postings/${id}`, posting);
    }

    // --- DELETE a post (auth needed) ---
    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/postings/${id}`);
    }
}