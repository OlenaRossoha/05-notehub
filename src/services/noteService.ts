import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Note, NoteTag } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Тип параметрів для запиту нотаток
export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

// Тип відповіді для запиту нотаток
export interface FetchNotesResponse {
  data: Note[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

// Отримання списку нотаток з урахуванням пошуку і пагінації
export async function fetchNotes({
  page,
  perPage,
  search,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const queryParams: Record<string, string | number> = {
    page,
    perPage,
  };

  if (search?.trim()) {
    queryParams.search = search.trim();
  }

  const response: AxiosResponse<FetchNotesResponse> = await axiosInstance.get(
    "/notes",
    {
      params: queryParams,
    }
  );

  return response.data;
}

// Тип параметрів для створення нотатки
export interface CreateNoteParams {
  title: string;
  content?: string;
  tag: NoteTag;
}

// Створення нової нотатки
export async function createNote(note: CreateNoteParams): Promise<Note> {
  const response: AxiosResponse<Note> = await axiosInstance.post(
    "/notes",
    note
  );
  return response.data;
}

// Видалення нотатки. API повертає саму видалену нотатку.
export async function deleteNote(id: number): Promise<Note> {
  const response: AxiosResponse<Note> = await axiosInstance.delete(
    `/notes/${id}`
  );
  return response.data;
}
