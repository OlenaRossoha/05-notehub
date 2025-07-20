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

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface FetchNotesResponse {
  data: Note[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export async function fetchNotes({
  page,
  perPage,
  search,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const queryParams: Record<string, string | number> = {
    page,
    perPage,
  };

  // ✅ Добавляем параметр только если search не пустой
  if (search && search.trim() !== "") {
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

export interface CreateNoteParams {
  title: string;
  content?: string;
  tag: NoteTag; // строго типизирован
}

export async function createNote(note: CreateNoteParams): Promise<Note> {
  const response: AxiosResponse<Note> = await axiosInstance.post(
    "/notes",
    note
  );
  return response.data;
}

export async function deleteNote(id: string): Promise<{ message: string }> {
  const response: AxiosResponse<{ message: string }> =
    await axiosInstance.delete(`/notes/${id}`);
  return response.data;
}
