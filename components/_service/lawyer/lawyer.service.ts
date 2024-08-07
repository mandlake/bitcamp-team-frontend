import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPostApi,
  createReplyApi,
  deleteFileApi,
  deleteLawyerApi,
  deletePostApi,
  deleteReplyApi,
  downloadFileApi,
  downloadPostFileApi,
  getAllLawyerApi,
  getFilesByLawyerIdApi,
  getLawyerByIdApi,
  getLawyerByUsernameApi,
  getLawyerDetailByIdApi,
  getLawyerDetailByUsernameApi,
  getLawyersByLawApi,
  getPostsByLawyerIdApi,
  getRepliesByLawyerIdApi,
  insertLawyerApi,
  lawyerJoinApi,
  lawyerLoginApi,
  lawyerLogoutApi,
  lawyerSaveDetailApi,
  searchLawyerApi,
  updateDetailLawyerApi,
  updateLawyerApi,
  updateReplyApi,
  uploadFilesApi,
} from "./lawyer.api";
import { ILawyer, ILawyerDetail } from "@/components/_model/lawyer/lawyer";

export const lawyerLogin: any = createAsyncThunk(
  "lawyer/lawyerLogin",
  async (lawyer: ILawyer) => {
    const data: any = await lawyerLoginApi(lawyer);
    return data;
  }
);

export const lawyerLogout: any = createAsyncThunk(
  "lawyer/lawyerLogout",
  async () => {
    const data: any = await lawyerLogoutApi();
    return data;
  }
);

export const lawyerJoin: any = createAsyncThunk(
  "lawyer/lawyerJoin",
  async (lawyer: ILawyer) => {
    const data: any = await lawyerJoinApi(lawyer);
    return data;
  }
);

export const lawyerSaveDetail: any = createAsyncThunk(
  "lawyer/lawyerSaveDetail",
  async (lawyer: ILawyerDetail) => {
    const data: any = await lawyerSaveDetailApi(lawyer);
    return data;
  }
);

export const getAllLawyer: any = createAsyncThunk(
  "lawyer/getAllLawyer",
  async () => {
    const data: any = await getAllLawyerApi();
    return data;
  }
);

export const getLawyerById: any = createAsyncThunk(
  "lawyer/getLawyerById",
  async (id: string) => {
    const data: any = await getLawyerByIdApi(id);
    return data;
  }
);

export const getLawyerByUsername: any = createAsyncThunk(
  "lawyer/getLawyerByUsername",
  async (username: string) => {
    const data: any = await getLawyerByUsernameApi(username);
    return data;
  }
);

export const getLawyerDetailByUsername: any = createAsyncThunk(
  "lawyer/getLawyerDetailByUsername",
  async (username: string) => {
    const data: any = await getLawyerDetailByUsernameApi(username);
    return data;
  }
);

export const getLawyerDetailById: any = createAsyncThunk(
  "lawyer/getLawyerDetailById",
  async (id: number) => {
    const data: any = await getLawyerDetailByIdApi(id);
    return data;
  }
);

export const updateLawyer: any = createAsyncThunk(
  "lawyer/updateLawyer",
  async (lawyer: ILawyer) => {
    const data: any = await updateLawyerApi(lawyer);
    return data;
  }
);

export const updateDetailLawyer: any = createAsyncThunk(
  "lawyer/updateDetailLawyer",
  async (lawyer: ILawyerDetail) => {
    const data: any = await updateDetailLawyerApi(lawyer);
    return data;
  }
);

export const deleteLawyer: any = createAsyncThunk(
  "lawyer/deleteLawyer",
  async (id: number) => {
    const data: any = await deleteLawyerApi(id);
    return data;
  }
);

export const insertLawyer: any = createAsyncThunk(
  "lawyer/insertLawyer",
  async (lawyer: ILawyer) => {
    const data: any = await insertLawyerApi(lawyer);
    return data;
  }
);

// 파일 업로드
export const uploadFiles: any = createAsyncThunk(
  "lawyer/uploadFiles",
  async ({ lawyerId, files }: any) => {
    const data: any = await uploadFilesApi(lawyerId, files);
    return data;
  }
) as any;

// 파일 다운로드
export const downloadFiles: any = createAsyncThunk(
  "lawyer/downloadFiles",
  async (id: string) => {
    const data: any = await downloadFileApi(id);
    return data;
  }
);

// 변호사아이디로 업로드한 파일 가져오기
export const getFilesByLawyerId: any = createAsyncThunk(
  "lawyer/getFilesByLawyerId",
  async (lawyerId: string) => {
    const data: any = await getFilesByLawyerIdApi(lawyerId);
    return data;
  }
);

// 파일 삭제
export const deleteFile: any = createAsyncThunk(
  "lawyer/deleteFile",
  async (id: string) => {
    const data: any = await deleteFileApi(id);
    return data;
  }
);

export const getLawyersByLaw: any = createAsyncThunk(
  "lawyer/getLawyersByLaw",
  async (law: string) => {
    const data: any = await getLawyersByLawApi(law);
    return data;
  }
);

export const searchLawyer: any = createAsyncThunk(
  "lawyer/searchLawyer",
  async (search: string) => {
    const data: any = await searchLawyerApi(search);
    return data;
  }
);

// 포스트 생성
export const createPost: any = createAsyncThunk(
  "lawyer/createPost",
  async ({ lawyerId, post, files }: any) => {
    const data: any = await createPostApi(lawyerId, post, files);
    return data;
  }
);

// 변호사아이디로 작성 포스트 찾기
export const getPostsByLawyerId: any = createAsyncThunk(
  "lawyer/getPostsByLawyerId",
  async (lawyerId: string) => {
    const data: any = await getPostsByLawyerIdApi(lawyerId);
    return data;
  }
);

// 포스트 수정
export const updatePost: any = createAsyncThunk(
  "lawyer/updatePost",
  async ({ postId, updatedPost, files }: any) => {
    const data: any = await createPostApi(postId, updatedPost, files);
    return data;
  }
);

// 포스트 삭제
export const deletePost: any = createAsyncThunk(
  "lawyer/deletePost",
  async (postId: string) => {
    const data: any = await deletePostApi(postId);
    return data;
  }
);

// 포스트 내 파일 다운로드
export const downloadPostFiles: any = createAsyncThunk(
  "lawyer/downloadPostFiles",
  async (id: string) => {
    const data: any = await downloadPostFileApi(id);
    return data;
  }
);

// 답변 생성
export const createReply: any = createAsyncThunk(
  "lawyer/createReply",
  async ({ lawyerId, articleId, reply }: any) => {
    const data: any = await createReplyApi(lawyerId, articleId, reply);
    return data;
  }
);

// 변호사아이디로 작성한 댓글 찾기
export const getRepliesByLawyerId: any = createAsyncThunk(
  "lawyer/getRepliesByLawyerId",
  async (lawyerId: string) => {
    const data: any = await getRepliesByLawyerIdApi(lawyerId);
    return data;
  }
);

// 댓글 수정
export const updateReply: any = createAsyncThunk(
  "lawyer/updateReply",
  async ({ id, reply }: any) => {
    const data: any = await updateReplyApi(id, reply);
    return data;
  }
);

// 댓글 삭제
export const deleteReply: any = createAsyncThunk(
  "lawyer/deleteReply",
  async (id: string) => {
    const data: any = await deleteReplyApi(id);
    return data;
  }
);
