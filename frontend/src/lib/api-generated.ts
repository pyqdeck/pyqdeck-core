/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Error {
  /** @example "error" */
  status?: string;
  /** @example "Detailed error message here" */
  message?: string;
  /** @example 400 */
  code?: number;
}

export interface Pagination {
  /** @example 100 */
  total?: number;
  /** @example 20 */
  limit?: number;
  /** @example 1 */
  page?: number;
  /** @example 5 */
  totalPages?: number;
}

export interface SuccessResponse {
  /** @example "success" */
  status?: string;
  /** @example "Operation successful" */
  message?: string;
  /** @example 200 */
  code?: number;
}

export interface Bookmark {
  /** @example "65a12345b67890cdef666666" */
  id?: string;
  /**
   * Reference to User
   * @example "65b98765a43210fedcba9876"
   */
  userId: string;
  /** @example "question" */
  targetType: "question" | "paper";
  /**
   * ID of the bookmarked document
   * @example "65a12345b67890cdef123456"
   */
  targetId: string;
  /**
   * Optional personal note on the bookmark
   * @example "Important question for finals!"
   */
  note?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface Branch {
  /** @example "65a12345b67890cdef111111" */
  id?: string;
  /**
   * Reference to University
   * @example "60d0fe4f5311236168a109ca"
   */
  universityId: string;
  /** @example "Computer Engineering" */
  name: string;
  /** @example "COMP" */
  shortName: string;
  /** @example "07" */
  branchCode?: string;
  /** @example "computer-engineering" */
  slug: string;
  /**
   * Old slugs that 301-redirect to the current slug
   * @example ["cse","it"]
   */
  redirectSlugs?: string[];
  /**
   * @default true
   * @example true
   */
  isActive?: boolean;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface Module {
  id?: string;
  /** Reference to Syllabus */
  syllabusId: string;
  /** @min 1 */
  moduleNumber: number;
  title: string;
  description?: string;
  /** Percentage weightage in the exam */
  weightage?: number;
  /** Course outcome mapping (e.g. CO1, CO2) */
  coMapping?: string;
  /** @example "lexical-analysis" */
  slug: string;
  /** Old slugs that 301-redirect to the current slug */
  redirectSlugs?: string[];
  /** @default 0 */
  order?: number;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface Paper {
  /** @example "65a12345b67890cdef333333" */
  id?: string;
  /**
   * Reference to SubjectOffering
   * @example "60d0fe4f5311236168a109cb"
   */
  subjectOfferingId: string;
  /** @example "Data Structures End Semester Exam Nov 2023" */
  title: string;
  /** @example 2023 */
  examYear: number;
  /** @example "end-sem" */
  examType: "regular" | "re-exam" | "supplementary" | "end-sem" | "internal";
  /** @example "Nov-Dec" */
  session?: string;
  /** @example "R2019" */
  regulation?: string;
  /**
   * Duration in minutes
   * @example 180
   */
  duration?: number;
  /** @example 80 */
  maxMarks?: number;
  /** @example "dsa-end-sem-nov-2023" */
  slug: string;
  /**
   * Reference to User
   * @example "65b98765a43210fedcba9876"
   */
  uploadedBy?: string;
  /**
   * @default "pending"
   * @example "approved"
   */
  status?: "draft" | "pending" | "approved" | "rejected";
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface PlatformConfig {
  /** @default false */
  devMode?: boolean;
  /** @default false */
  contentFreeze?: boolean;
  /** @default false */
  maintenanceMode?: boolean;
}

export interface Question {
  /** @example "65a12345b67890cdef123456" */
  id?: string;
  /** @example "Explain the architecture of a compiler in detail." */
  text: string;
  /**
   * Cleaned text used for deduplication and search
   * @example "explain the architecture of a compiler in detail"
   */
  normalizedText?: string;
  /** @example "long" */
  type: "mcq" | "short" | "long" | "numerical" | "coding";
  /** @example "medium" */
  difficulty?: "easy" | "medium" | "hard";
  /** @example "understand" */
  bloomLevel?:
    | "remember"
    | "understand"
    | "apply"
    | "analyze"
    | "evaluate"
    | "create";
  /** @example 10 */
  marks?: number;
  /**
   * Estimated solving time in minutes
   * @example 15
   */
  estimatedTime?: number;
  /**
   * References to Tag documents
   * @example ["compiler-design","architecture"]
   */
  tags?: string[];
  /** @example ["https://example.com/compiler-diagram.png"] */
  images?: string[];
  /**
   * LaTeX equation strings
   * @example ["E = mc^2"]
   */
  equations?: string[];
  /** @example ["void main() { printf(\"Hello\"); }"] */
  codeSnippets?: string[];
  /** @example "explain-compiler-architecture" */
  slug?: string;
  /**
   * @default "en"
   * @example "en"
   */
  language?: string;
  /**
   * Reference to User
   * @example "65b98765a43210fedcba9876"
   */
  createdBy?: string;
  /**
   * @default false
   * @example true
   */
  isVerified?: boolean;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface QuestionPaperMap {
  id?: string;
  /** Reference to Paper */
  paperId: string;
  /** Reference to Question */
  questionId: string;
  /** @example "A" */
  section?: string;
  questionNumber?: number;
  /** Marks as it appears in this specific paper (may differ from question default) */
  marks?: number;
  /** @default 0 */
  order?: number;
  /** @default false */
  compulsory?: boolean;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface QuestionSyllabusMap {
  id?: string;
  /** Reference to Question */
  questionId: string;
  /** Reference to Module */
  moduleId?: string;
  /** Reference to Topic */
  topicId?: string;
  /**
   * AI or manual confidence score for this mapping
   * @min 0
   * @max 1
   */
  confidenceScore?: number;
  /** @default "manual" */
  mappedBy?: "manual" | "ai";
  /** @default false */
  verified?: boolean;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface Semester {
  /** @example "65a12345b67890cdef112233" */
  id?: string;
  /**
   * Reference to Branch
   * @example "65a12345b67890cdef111111"
   */
  branchId: string;
  /**
   * @min 1
   * @max 8
   * @example 5
   */
  number: number;
  /** @example "semester-5" */
  slug: string;
  /** @example "Semester 5" */
  title?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface Subject {
  /** @example "65a12345b67890cdef222222" */
  id?: string;
  /** @example "Data Structures and Algorithms" */
  name: string;
  /** @example "DSA" */
  shortName?: string;
  /** @example "CS301" */
  subjectCode?: string;
  /** @example "Fundamental study of data organization and algorithm complexity." */
  description?: string;
  /** @example 4 */
  credits?: number;
  /** @example "data-structures-and-algorithms" */
  slug: string;
  /**
   * Old slugs that 301-redirect to the current slug
   * @example ["dsa-old","algo-ds"]
   */
  redirectSlugs?: string[];
  /**
   * @default true
   * @example true
   */
  isActive?: boolean;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface SubjectOffering {
  /** @example "65a12345b67890cdef111222" */
  id?: string;
  /**
   * Reference to University
   * @example "60d0fe4f5311236168a109ca"
   */
  universityId: string;
  /**
   * Reference to Branch
   * @example "65a12345b67890cdef111111"
   */
  branchId: string;
  /**
   * Reference to Semester
   * @example "65a12345b67890cdef112233"
   */
  semesterId: string;
  /**
   * Reference to Subject
   * @example "65a12345b67890cdef222222"
   */
  subjectId: string;
  /** @example "R2022" */
  regulation?: string;
  /** @example "2023-24" */
  academicYear?: string;
  /** @example "mu-it-sem5-dsa-r2022" */
  slug: string;
  /**
   * @default true
   * @example true
   */
  isActive?: boolean;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface Syllabus {
  id?: string;
  /** Reference to SubjectOffering (one-to-one) */
  subjectOfferingId: string;
  description?: string;
  /** @default true */
  isActive?: boolean;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface Tag {
  id?: string;
  name: string;
  slug: string;
  description?: string;
  /** Old slugs that 301-redirect to the current slug */
  redirectSlugs?: string[];
  /** @default 0 */
  usageCount?: number;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface Topic {
  id?: string;
  /** Reference to Module */
  moduleId: string;
  title: string;
  description?: string;
  /** @example "lexical-analyzer" */
  slug: string;
  /** Old slugs that 301-redirect to the current slug */
  redirectSlugs?: string[];
  keywords?: string[];
  /** @default 0 */
  order?: number;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface University {
  /** @example "60d0fe4f5311236168a109ca" */
  id?: string;
  /** @example "University of Mumbai" */
  name: string;
  /** @example "MU" */
  shortName: string;
  /** @example "university-of-mumbai" */
  slug: string;
  /** @example "https://mu.ac.in" */
  websiteUrl?: string;
  /** @example "https://example.com/logo.png" */
  logo?: string;
  /** @example "A premier institution for higher education." */
  description?: string;
  /** @example "Maharashtra" */
  state?: string;
  /**
   * @default "India"
   * @example "India"
   */
  country?: string;
  /**
   * Old slugs that 301-redirect to the current slug
   * @example ["bom-uni","mumbai-university"]
   */
  redirectSlugs?: string[];
  /**
   * @default true
   * @example true
   */
  isActive?: boolean;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface Upload {
  id?: string;
  /** @format uri */
  url: string;
  /** Provider-specific identifier (Cloudinary/S3 key) */
  publicId?: string;
  /** @example "application/pdf" */
  mimeType?: string;
  /** File size in bytes */
  size?: number;
  /** Reference to User */
  uploadedBy: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface User {
  /**
   * The auto-generated id of the user
   * @example "65b98765a43210fedcba9876"
   */
  id?: string;
  /**
   * The unique ID from Clerk authentication
   * @example "user_2N9Wv7N0u8M6X1Y2Z3A4B5C6"
   */
  clerkId: string;
  /**
   * The name of the user
   * @example "John Doe"
   */
  name: string;
  /**
   * The email of the user
   * @format email
   * @example "john.doe@example.com"
   */
  email: string;
  /**
   * The profile image URL from Clerk
   * @example "https://img.clerk.com/..."
   */
  avatarUrl?: string | null;
  /**
   * Reference to University
   * @example "60d0fe4f5311236168a109ca"
   */
  universityId?: string | null;
  /**
   * Reference to Branch
   * @example "65a12345b67890cdef111111"
   */
  branchId?: string | null;
  /**
   * Reference to Semester
   * @example "65a12345b67890cdef112233"
   */
  semesterId?: string | null;
  /**
   * The role of the user
   * @default "normal"
   * @example "normal"
   */
  role?: "normal" | "admin" | "editor";
  /**
   * @default true
   * @example true
   */
  isActive?: boolean;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "http://localhost:3000/api/v1",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title PYQDeck API Explorer
 * @version 1.0.0
 * @baseUrl http://localhost:3000/api/v1
 * @contact PYQDeck Support <noreply@example.com> (http://localhost:3000/support)
 *
 *
 * Welcome to the official **PYQDeck API Documentation**.
 *
 * This API powers the PYQDeck platform, enabling users to access, bookmark, and study Previous Year Questions (PYQs) efficiently.
 *
 * ### 🔑 Authentication
 * Most endpoints require a valid Clerk JWT token. Include it in the header:
 * `Authorization: Bearer <your_clerk_token>`
 *
 * ### 📊 Rate Limiting
 * - **Standard API**: 100 requests per 15 minutes.
 * - **Webhooks**: 50 requests per 15 minutes.
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  analytics = {
    /**
 * @description Aggregates total users, papers, questions, pending queues, and chart data for the Admin Studio.
 *
 * @tags Analytics
 * @name StudioOverviewList
 * @summary Get studio dashboard overview metrics
 * @request GET:/analytics/studio-overview
 * @secure
 * @response `200` `(SuccessResponse & {
    data?: {
    metrics?: object,
    charts?: object,
    queues?: object,

},

})` Studio overview retrieved successfully
 * @response `401` `Error`
 * @response `403` `Error`
 */
    studioOverviewList: (params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data?: {
            metrics?: object;
            charts?: object;
            queues?: object;
          };
        },
        Error
      >({
        path: `/analytics/studio-overview`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  bookmarks = {
    /**
 * No description
 *
 * @tags Bookmarks
 * @name ListBookmarks
 * @summary List my bookmarks
 * @request GET:/bookmarks
 * @secure
 * @response `200` `(SuccessResponse & {
    data?: {
    items?: (Bookmark)[],
    pagination?: Pagination,

},

})` List of bookmarks
 * @response `401` `Error`
 */
    listBookmarks: (
      query?: {
        type?: "question" | "paper";
        /** @default 1 */
        page?: number;
        /** @default 20 */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data?: {
            items?: Bookmark[];
            pagination?: Pagination;
          };
        },
        Error
      >({
        path: `/bookmarks`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Bookmarks
 * @name ToggleBookmark
 * @summary Toggle bookmark (add/remove)
 * @request POST:/bookmarks/toggle
 * @secure
 * @response `200` `(SuccessResponse & {
    data?: {
    isBookmarked?: boolean,
    bookmark?: Bookmark,

},

})` Toggled state
 * @response `401` `Error`
 */
    toggleBookmark: (data: Bookmark, params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data?: {
            isBookmarked?: boolean;
            bookmark?: Bookmark;
          };
        },
        Error
      >({
        path: `/bookmarks/toggle`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Bookmarks
     * @name DeleteBookmark
     * @summary Delete a specific bookmark
     * @request DELETE:/bookmarks/{id}
     * @secure
     * @response `204` `void` Deleted
     * @response `401` `Error`
     */
    deleteBookmark: (id: string, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/bookmarks/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  branches = {
    /**
 * No description
 *
 * @tags Branches
 * @name ListAllBranches
 * @summary List all branches across all universities
 * @request GET:/branches
 * @response `200` `(SuccessResponse & {
    data?: {
    items?: (Branch)[],
    pagination?: Pagination,

},

})` Paginated branches
 */
    listAllBranches: (
      query?: {
        universityId?: string;
        /**
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * @min 1
         * @max 100
         * @default 20
         */
        limit?: number;
        isActive?: true | "all";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data?: {
            items?: Branch[];
            pagination?: Pagination;
          };
        },
        any
      >({
        path: `/branches`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Semesters
 * @name ListSemesters
 * @summary List semesters for a branch
 * @request GET:/branches/{branchId}/semesters
 * @response `200` `(SuccessResponse & {
    data?: {
    items?: (Semester)[],
    pagination?: Pagination,

},

})` Semesters list
 */
    listSemesters: (branchId: string, params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data?: {
            items?: Semester[];
            pagination?: Pagination;
          };
        },
        any
      >({
        path: `/branches/${branchId}/semesters`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Semesters
 * @name CreateSemester
 * @summary Create a semester (Admin only)
 * @request POST:/branches/{branchId}/semesters
 * @secure
 * @response `201` `(SuccessResponse & {
    data?: Semester,

})` Created
 * @response `403` `Error`
 */
    createSemester: (
      branchId: string,
      data: Semester,
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data?: Semester;
        },
        Error
      >({
        path: `/branches/${branchId}/semesters`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Semesters
 * @name GetSemesterByNumber
 * @summary Get semester by number within a branch
 * @request GET:/branches/{branchId}/semesters/{number}
 * @response `200` `(SuccessResponse & {
    data?: Semester,

})` Semester details
 * @response `404` `Error`
 */
    getSemesterByNumber: (
      branchId: string,
      number: number,
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data?: Semester;
        },
        Error
      >({
        path: `/branches/${branchId}/semesters/${number}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Semesters
 * @name UpdateSemester
 * @summary Update a semester (Admin only)
 * @request PATCH:/branches/{branchId}/semesters/{id}
 * @secure
 * @response `200` `(SuccessResponse & {
    data?: Semester,

})` Updated
 * @response `403` `Error`
 * @response `404` `Error`
 */
    updateSemester: (
      branchId: string,
      id: string,
      data: Semester,
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data?: Semester;
        },
        Error
      >({
        path: `/branches/${branchId}/semesters/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Semesters
     * @name DeleteSemester
     * @summary Delete a semester (Admin only)
     * @request DELETE:/branches/{branchId}/semesters/{id}
     * @secure
     * @response `200` `void` Deleted
     * @response `403` `Error`
     * @response `404` `Error`
     */
    deleteSemester: (
      branchId: string,
      id: string,
      params: RequestParams = {},
    ) =>
      this.request<void, Error>({
        path: `/branches/${branchId}/semesters/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  universities = {
    /**
 * No description
 *
 * @tags Branches
 * @name ListBranches
 * @summary List branches for a university
 * @request GET:/universities/{universityId}/branches
 * @response `200` `(SuccessResponse & {
    data?: {
    items?: (Branch)[],
    pagination?: Pagination,

},

})` Paginated branches
 */
    listBranches: (
      universityId: string,
      query?: {
        /**
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * @min 1
         * @max 100
         * @default 20
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data?: {
            items?: Branch[];
            pagination?: Pagination;
          };
        },
        any
      >({
        path: `/universities/${universityId}/branches`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Branches
 * @name CreateBranch
 * @summary Create a branch (Admin only)
 * @request POST:/universities/{universityId}/branches
 * @secure
 * @response `201` `(SuccessResponse & {
    data?: Branch,

})` Created
 * @response `403` `Error`
 */
    createBranch: (
      universityId: string,
      data: Branch,
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data?: Branch;
        },
        Error
      >({
        path: `/universities/${universityId}/branches`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Branches
 * @name GetBranchBySlug
 * @summary Get a branch by slug under a university
 * @request GET:/universities/{universityId}/branches/{slug}
 * @response `200` `(SuccessResponse & {
    data?: Branch,

})` Branch details
 * @response `404` `Error`
 */
    getBranchBySlug: (
      universityId: string,
      slug: string,
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data?: Branch;
        },
        Error
      >({
        path: `/universities/${universityId}/branches/${slug}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Branches
 * @name GetBranchStructure
 * @summary Get full course structure (semesters and subjects) for a branch
 * @request GET:/universities/{universityId}/branches/{id}/structure
 * @response `200` `(SuccessResponse & {
    data?: ({
    semester?: Semester,
    subjects?: (Subject)[],

})[],

})` Course structure tree
 */
    getBranchStructure: (
      universityId: string,
      id: string,
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data?: {
            semester?: Semester;
            subjects?: Subject[];
          }[];
        },
        any
      >({
        path: `/universities/${universityId}/branches/${id}/structure`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Branches
 * @name BulkCreateBranches
 * @summary Bulk create branches for a university (Admin only)
 * @request POST:/universities/{universityId}/branches/bulk
 * @secure
 * @response `201` `(SuccessResponse & {
    data?: (Branch)[],

})` Created
 * @response `403` `Error`
 */
    bulkCreateBranches: (
      universityId: string,
      data: Branch[],
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data?: Branch[];
        },
        Error
      >({
        path: `/universities/${universityId}/branches/bulk`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Branches
 * @name UpdateBranch
 * @summary Update a branch (Admin only)
 * @request PATCH:/universities/{universityId}/branches/{id}
 * @secure
 * @response `200` `(SuccessResponse & {
    data?: Branch,

})` Updated
 * @response `403` `Error`
 * @response `404` `Error`
 */
    updateBranch: (
      universityId: string,
      id: string,
      data: Branch,
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data?: Branch;
        },
        Error
      >({
        path: `/universities/${universityId}/branches/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Branches
     * @name DeleteBranch
     * @summary Delete a branch (Admin only)
     * @request DELETE:/universities/{universityId}/branches/{id}
     * @secure
     * @response `200` `void` Deleted
     * @response `403` `Error`
     * @response `404` `Error`
     */
    deleteBranch: (
      universityId: string,
      id: string,
      params: RequestParams = {},
    ) =>
      this.request<void, Error>({
        path: `/universities/${universityId}/branches/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
 * No description
 *
 * @tags Universities
 * @name ListUniversities
 * @summary List all universities
 * @request GET:/universities
 * @response `200` `(SuccessResponse & {
    data?: {
    items?: (University)[],
    pagination?: Pagination,

},

})` List of universities
 */
    listUniversities: (
      query?: {
        /** @default 1 */
        page?: number;
        /** @default 20 */
        limit?: number;
        /** Search by university name or short name */
        search?: string;
        isActive?: true | "all";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data?: {
            items?: University[];
            pagination?: Pagination;
          };
        },
        any
      >({
        path: `/universities`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Universities
 * @name CreateUniversity
 * @summary Create a university (Admin only)
 * @request POST:/universities
 * @secure
 * @response `201` `(SuccessResponse & {
    data?: University,

})` University created
 * @response `403` `Error`
 */
    createUniversity: (data: University, params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data?: University;
        },
        Error
      >({
        path: `/universities`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Universities
 * @name GetUniversityBySlug
 * @summary Get a university by slug
 * @request GET:/universities/{slug}
 * @response `200` `(SuccessResponse & {
    data?: University,

})` University details
 * @response `404` `Error`
 */
    getUniversityBySlug: (slug: string, params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data?: University;
        },
        Error
      >({
        path: `/universities/${slug}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Universities
 * @name BulkCreateUniversities
 * @summary Bulk create universities (Admin only)
 * @request POST:/universities/bulk
 * @secure
 * @response `201` `(SuccessResponse & {
    data?: (University)[],

})` Universities created
 * @response `403` `Error`
 */
    bulkCreateUniversities: (data: University[], params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data?: University[];
        },
        Error
      >({
        path: `/universities/bulk`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Universities
 * @name UpdateUniversity
 * @summary Update a university (Admin only)
 * @request PATCH:/universities/{id}
 * @secure
 * @response `200` `(SuccessResponse & {
    data?: University,

})` Updated
 * @response `403` `Error`
 * @response `404` `Error`
 */
    updateUniversity: (
      id: string,
      data: University,
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data?: University;
        },
        Error
      >({
        path: `/universities/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Universities
     * @name DeleteUniversity
     * @summary Delete a university (Admin only)
     * @request DELETE:/universities/{id}
     * @secure
     * @response `200` `void` Deleted
     * @response `403` `Error`
     * @response `404` `Error`
     */
    deleteUniversity: (id: string, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/universities/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  health = {
    /**
 * @description Returns the operational status of the API instance. Used by load balancers and uptime monitors.
 *
 * @tags System
 * @name GetHealth
 * @summary Basic health check
 * @request GET:/health
 * @response `200` `(SuccessResponse & {
    data?: {
  /** @example "healthy" *\/
    status?: string,
  /** @format date-time *\/
    timestamp?: string,

},

})` API is operational
 * @response `503` `Error`
 */
    getHealth: (params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data?: {
            /** @example "healthy" */
            status?: string;
            /** @format date-time */
            timestamp?: string;
          };
        },
        Error
      >({
        path: `/health`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
 * @description Provides deep insights into system health, including database connectivity, memory usage, and process uptime.
 *
 * @tags System
 * @name GetHealthDetailed
 * @summary Detailed system health
 * @request GET:/health/detailed
 * @secure
 * @response `200` `(SuccessResponse & {
    data?: {
  /** @example "healthy" *\/
    status?: string,
  /** @example "connected" *\/
    database?: string,
    memory?: {
  /** @example "120 MB" *\/
    rss?: string,
  /** @example "80 MB" *\/
    heapTotal?: string,

},
  /** @example 3600 *\/
    uptime?: number,

},

})` All systems operational
 * @response `503` `Error` System degradation detected (e.g., database disconnected)
 */
    getHealthDetailed: (params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data?: {
            /** @example "healthy" */
            status?: string;
            /** @example "connected" */
            database?: string;
            memory?: {
              /** @example "120 MB" */
              rss?: string;
              /** @example "80 MB" */
              heapTotal?: string;
            };
            /** @example 3600 */
            uptime?: number;
          };
        },
        Error
      >({
        path: `/health/detailed`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  maintenance = {
    /**
     * @description Deletes all records from all collections except 'users'. This is irreversible.
     *
     * @tags Maintenance
     * @name WipeDatabase
     * @summary Wipe all content from database (Admin only)
     * @request POST:/maintenance/wipe-db
     * @secure
     * @response `200` `void` Database wiped successfully
     * @response `401` `Error`
     * @response `403` `Error`
     */
    wipeDatabase: (params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/maintenance/wipe-db`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  papers = {
    /**
 * No description
 *
 * @tags PaperQuestions
 * @name ListQuestionsForPaper
 * @summary List questions linked to a paper (ordered)
 * @request GET:/papers/{paperId}/questions
 * @response `200` `(SuccessResponse & {
    data?: {
    items?: (Question)[],
    pagination?: Pagination,

},

})` Paginated questions for the paper
 */
    listQuestionsForPaper: (
      paperId: string,
      query?: {
        /** @default 1 */
        page?: number;
        /** @default 20 */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data?: {
            items?: Question[];
            pagination?: Pagination;
          };
        },
        any
      >({
        path: `/papers/${paperId}/questions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags PaperQuestions
 * @name CreateQuestionForPaper
 * @summary Create a question and link it to this paper (Editor or Admin)
 * @request POST:/papers/{paperId}/questions
 * @secure
 * @response `201` `(SuccessResponse & {
    data?: Question,

})` Question created and linked
 * @response `403` `Error`
 */
    createQuestionForPaper: (
      paperId: string,
      data: Question,
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data?: Question;
        },
        Error
      >({
        path: `/papers/${paperId}/questions`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags PaperQuestions
 * @name LinkQuestionToPaper
 * @summary Link an existing question to this paper (Editor or Admin)
 * @request POST:/papers/{paperId}/questions/{questionId}/link
 * @secure
 * @response `201` `(SuccessResponse & {
    data?: {
    linked?: boolean,

},

})` Linked
 * @response `403` `Error`
 */
    linkQuestionToPaper: (
      paperId: string,
      questionId: string,
      data: object,
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data?: {
            linked?: boolean;
          };
        },
        Error
      >({
        path: `/papers/${paperId}/questions/${questionId}/link`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Papers
 * @name ListPapers
 * @summary List papers (public sees approved only)
 * @request GET:/papers
 * @response `200` `(SuccessResponse & {
    data?: {
    items?: (Paper)[],
    pagination?: Pagination,

},

})` Paginated list of papers
 */
    listPapers: (
      query?: {
        examYear?: number;
        examType?: string;
        subjectOfferingId?: string;
        /** @default 1 */
        page?: number;
        /** @default 20 */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data?: {
            items?: Paper[];
            pagination?: Pagination;
          };
        },
        any
      >({
        path: `/papers`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Papers
 * @name CreatePaper
 * @summary Submit a new paper (Editor / Admin)
 * @request POST:/papers
 * @secure
 * @response `201` `(SuccessResponse & {
    data?: Paper,

})` Paper created
 * @response `403` `Error`
 */
    createPaper: (data: Paper, params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data?: Paper;
        },
        Error
      >({
        path: `/papers`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Papers
 * @name GetPaperBySlug
 * @summary Get a paper by slug
 * @request GET:/papers/{slug}
 * @response `200` `(SuccessResponse & {
    data?: Paper,

})` Paper details
 * @response `404` `Error`
 */
    getPaperBySlug: (slug: string, params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data?: Paper;
        },
        Error
      >({
        path: `/papers/${slug}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Papers
 * @name UpdatePaper
 * @summary Update a paper (Editor / Admin)
 * @request PATCH:/papers/{id}
 * @secure
 * @response `200` `(SuccessResponse & {
    data?: Paper,

})` Paper updated
 * @response `403` `Error`
 * @response `404` `Error`
 */
    updatePaper: (id: string, data: Paper, params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data?: Paper;
        },
        Error
      >({
        path: `/papers/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Papers
     * @name DeletePaper
     * @summary Delete a paper (Admin only)
     * @request DELETE:/papers/{id}
     * @secure
     * @response `204` `void` Paper deleted
     * @response `403` `Error`
     * @response `404` `Error`
     */
    deletePaper: (id: string, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/papers/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
 * No description
 *
 * @tags Papers
 * @name UpdatePaperStatus
 * @summary Approve or reject a paper (Admin only)
 * @request PATCH:/papers/{id}/status
 * @secure
 * @response `200` `(SuccessResponse & {
    data?: Paper,

})` Status updated
 * @response `403` `Error`
 * @response `404` `Error`
 */
    updatePaperStatus: (
      id: string,
      data: {
        status?: "draft" | "pending" | "approved" | "rejected";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data?: Paper;
        },
        Error
      >({
        path: `/papers/${id}/status`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  platformConfig = {
    /**
 * No description
 *
 * @tags Platform Config
 * @name GetPlatformConfig
 * @summary Get platform configuration (Admin only)
 * @request GET:/platform-config
 * @secure
 * @response `200` `(SuccessResponse & {
    data?: PlatformConfig,

})` Platform configuration
 * @response `401` `Error`
 * @response `403` `Error`
 */
    getPlatformConfig: (params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data?: PlatformConfig;
        },
        Error
      >({
        path: `/platform-config`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Platform Config
 * @name UpdatePlatformConfig
 * @summary Update platform configuration (Admin only)
 * @request PATCH:/platform-config
 * @secure
 * @response `200` `(SuccessResponse & {
    data?: PlatformConfig,

})` Updated platform configuration
 * @response `401` `Error`
 * @response `403` `Error`
 */
    updatePlatformConfig: (
      data: {
        devMode?: boolean;
        contentFreeze?: boolean;
        maintenanceMode?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data?: PlatformConfig;
        },
        Error
      >({
        path: `/platform-config`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  questions = {
    /**
 * No description
 *
 * @tags Questions
 * @name SearchQuestions
 * @summary Search and list questions (paginated)
 * @request GET:/questions
 * @response `200` `(SuccessResponse & {
    data?: {
    items?: (Question)[],
    pagination?: Pagination,

},

})` Paginated questions
 */
    searchQuestions: (
      query?: {
        type?: string;
        difficulty?: string;
        isVerified?: true | false;
        /** @default 1 */
        page?: number;
        /** @default 20 */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data?: {
            items?: Question[];
            pagination?: Pagination;
          };
        },
        any
      >({
        path: `/questions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Questions
 * @name CreateQuestion
 * @summary Create a standalone question (Editor or Admin)
 * @request POST:/questions
 * @secure
 * @response `201` `(SuccessResponse & {
    data?: Question,

})` Created
 * @response `403` `Error`
 */
    createQuestion: (data: Question, params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data?: Question;
        },
        Error
      >({
        path: `/questions`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Questions
 * @name GetQuestionBySlug
 * @summary Get question by slug
 * @request GET:/questions/slug/{slug}
 * @response `200` `(SuccessResponse & {
    data?: Question,

})` Question
 * @response `404` `Error`
 */
    getQuestionBySlug: (slug: string, params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data?: Question;
        },
        Error
      >({
        path: `/questions/slug/${slug}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Questions
 * @name GetQuestionById
 * @summary Get question by id
 * @request GET:/questions/{id}
 * @response `200` `(SuccessResponse & {
    data?: Question,

})` Question
 * @response `404` `Error`
 */
    getQuestionById: (id: string, params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data?: Question;
        },
        Error
      >({
        path: `/questions/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Questions
 * @name UpdateQuestion
 * @summary Update a question (Editor or Admin)
 * @request PATCH:/questions/{id}
 * @secure
 * @response `200` `(SuccessResponse & {
    data?: Question,

})` Updated
 * @response `403` `Error`
 * @response `404` `Error`
 */
    updateQuestion: (id: string, data: Question, params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data?: Question;
        },
        Error
      >({
        path: `/questions/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Questions
     * @name DeleteQuestion
     * @summary Delete a question (Admin only)
     * @request DELETE:/questions/{id}
     * @secure
     * @response `200` `void` Deleted
     * @response `403` `Error`
     * @response `404` `Error`
     */
    deleteQuestion: (id: string, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/questions/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  search = {
    /**
 * No description
 *
 * @tags Search
 * @name UnifiedSearch
 * @summary Global unified search across catalog entities
 * @request GET:/search
 * @response `200` `(SuccessResponse & {
    data?: {
    questions?: (Question)[],
    subjects?: (Subject)[],
    papers?: (Paper)[],
    totalQuestions?: number,
    totalSubjects?: number,
    totalPapers?: number,

},

})` Aggregated search results
 */
    unifiedSearch: (
      query?: {
        /** Search text (empty returns no-result payload) */
        q?: string;
        /** @default 1 */
        page?: number;
        /** @default 20 */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data?: {
            questions?: Question[];
            subjects?: Subject[];
            papers?: Paper[];
            totalQuestions?: number;
            totalSubjects?: number;
            totalPapers?: number;
          };
        },
        any
      >({
        path: `/search`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  semesters = {
    /**
 * No description
 *
 * @tags Semesters
 * @name ListAllSemesters
 * @summary List all semesters across all branches
 * @request GET:/semesters
 * @response `200` `(SuccessResponse & {
    data?: {
    items?: (Semester)[],
    pagination?: Pagination,

},

})` Semesters list
 */
    listAllSemesters: (
      query?: {
        branchId?: string;
        /**
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * @min 1
         * @max 100
         * @default 20
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data?: {
            items?: Semester[];
            pagination?: Pagination;
          };
        },
        any
      >({
        path: `/semesters`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  seo = {
    /**
 * No description
 *
 * @tags SEO
 * @name GetSitemapData
 * @summary Get all public URLs for sitemap generation
 * @request GET:/seo/sitemap-data
 * @response `200` `(SuccessResponse & {
    data?: ({
    url?: string,
  /** @format date-time *\/
    lastMod?: string,
    priority?: number,

})[],

})` List of public URLs
 */
    getSitemapData: (params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data?: {
            url?: string;
            /** @format date-time */
            lastMod?: string;
            priority?: number;
          }[];
        },
        any
      >({
        path: `/seo/sitemap-data`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  subjectOfferings = {
    /**
 * No description
 *
 * @tags SubjectOfferings
 * @name ListSubjectOfferings
 * @summary List subject offerings (filter by university, branch, and/or semester)
 * @request GET:/subject-offerings
 * @response `200` `(SuccessResponse & {
    data?: {
    items?: (SubjectOffering)[],
    pagination?: Pagination,

},

})` Paginated subject offerings
 */
    listSubjectOfferings: (
      query?: {
        /** Use with branchId and semesterId for the preferred filter */
        universityId?: string;
        branchId?: string;
        /** If alone, returns offerings for that semester */
        semesterId?: string;
        isActive?: true | "all";
        /** @default 1 */
        page?: number;
        /** @default 20 */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data?: {
            items?: SubjectOffering[];
            pagination?: Pagination;
          };
        },
        any
      >({
        path: `/subject-offerings`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags SubjectOfferings
 * @name CreateSubjectOffering
 * @summary Create a subject offering (Editor or Admin)
 * @request POST:/subject-offerings
 * @secure
 * @response `201` `(SuccessResponse & {
    data?: SubjectOffering,

})` Created
 * @response `403` `Error`
 */
    createSubjectOffering: (
      data: SubjectOffering,
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data?: SubjectOffering;
        },
        Error
      >({
        path: `/subject-offerings`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags SubjectOfferings
 * @name GetSubjectOfferingById
 * @summary Get a subject offering by id
 * @request GET:/subject-offerings/id/{id}
 * @response `200` `(SuccessResponse & {
    data?: SubjectOffering,

})` Subject offering
 * @response `404` `Error`
 */
    getSubjectOfferingById: (id: string, params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data?: SubjectOffering;
        },
        Error
      >({
        path: `/subject-offerings/id/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags SubjectOfferings
 * @name GetSubjectOfferingBySlug
 * @summary Get a subject offering by slug
 * @request GET:/subject-offerings/{slug}
 * @response `200` `(SuccessResponse & {
    data?: SubjectOffering,

})` Subject offering
 * @response `404` `Error`
 */
    getSubjectOfferingBySlug: (slug: string, params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data?: SubjectOffering;
        },
        Error
      >({
        path: `/subject-offerings/${slug}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags SubjectOfferings
 * @name UpdateSubjectOffering
 * @summary Update a subject offering (Admin only)
 * @request PATCH:/subject-offerings/{id}
 * @secure
 * @response `200` `(SuccessResponse & {
    data?: SubjectOffering,

})` Updated
 * @response `403` `Error`
 * @response `404` `Error`
 */
    updateSubjectOffering: (
      id: string,
      data: SubjectOffering,
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data?: SubjectOffering;
        },
        Error
      >({
        path: `/subject-offerings/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags SubjectOfferings
     * @name DeleteSubjectOffering
     * @summary Delete a subject offering (Admin only)
     * @request DELETE:/subject-offerings/{id}
     * @secure
     * @response `200` `void` Deleted
     * @response `403` `Error`
     * @response `404` `Error`
     */
    deleteSubjectOffering: (id: string, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/subject-offerings/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
 * No description
 *
 * @tags Syllabus
 * @name GetSyllabusBySubjectOffering
 * @summary Get syllabus with modules and topics
 * @request GET:/subject-offerings/{subjectOfferingId}/syllabus
 * @response `200` `(SuccessResponse & {
    data?: (Syllabus & {
    modules?: ((Module & {
    topics?: (Topic)[],

}))[],

}),

})` Syllabus hierarchy
 */
    getSyllabusBySubjectOffering: (
      subjectOfferingId: string,
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data?: Syllabus & {
            modules?: (Module & {
              topics?: Topic[];
            })[];
          };
        },
        any
      >({
        path: `/subject-offerings/${subjectOfferingId}/syllabus`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  subjects = {
    /**
 * No description
 *
 * @tags Subjects
 * @name ListSubjects
 * @summary List all subjects
 * @request GET:/subjects
 * @response `200` `(SuccessResponse & {
    data?: {
    items?: (Subject)[],
    pagination?: Pagination,

},

})` List of subjects
 */
    listSubjects: (
      query?: {
        /** @default 1 */
        page?: number;
        /** @default 20 */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data?: {
            items?: Subject[];
            pagination?: Pagination;
          };
        },
        any
      >({
        path: `/subjects`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Subjects
 * @name CreateSubject
 * @summary Create a subject (Editor / Admin only)
 * @request POST:/subjects
 * @secure
 * @response `201` `(SuccessResponse & {
    data?: Subject,

})` Created
 * @response `403` `Error`
 */
    createSubject: (data: Subject, params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data?: Subject;
        },
        Error
      >({
        path: `/subjects`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Subjects
 * @name GetSubjectBySlug
 * @summary Get a subject by slug
 * @request GET:/subjects/{slug}
 * @response `200` `(SuccessResponse & {
    data?: Subject,

})` Subject details
 * @response `404` `Error`
 */
    getSubjectBySlug: (slug: string, params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data?: Subject;
        },
        Error
      >({
        path: `/subjects/${slug}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Subjects
 * @name UpdateSubject
 * @summary Update a subject (Editor / Admin only)
 * @request PATCH:/subjects/{id}
 * @secure
 * @response `200` `(SuccessResponse & {
    data?: Subject,

})` Updated
 * @response `403` `Error`
 * @response `404` `Error`
 */
    updateSubject: (id: string, data: Subject, params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data?: Subject;
        },
        Error
      >({
        path: `/subjects/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Subjects
     * @name DeleteSubject
     * @summary Delete a subject (Admin only)
     * @request DELETE:/subjects/{id}
     * @secure
     */
    deleteSubject: (id: string, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/subjects/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  syllabus = {
    /**
     * No description
     *
     * @tags Syllabus
     * @name CreateSyllabus
     * @summary Initialize a new syllabus
     * @request POST:/syllabus
     * @secure
     * @response `201` `SuccessResponse` Syllabus initialized
     */
    createSyllabus: (data: Syllabus, params: RequestParams = {}) =>
      this.request<SuccessResponse, any>({
        path: `/syllabus`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Syllabus
     * @name UpdateSyllabus
     * @summary Update syllabus metadata
     * @request PATCH:/syllabus/{id}
     * @secure
     * @response `200` `void` Syllabus updated
     */
    updateSyllabus: (id: string, data: Syllabus, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/syllabus/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  modules = {
    /**
     * No description
     *
     * @tags Syllabus
     * @name CreateModule
     * @summary Add a module to a syllabus
     * @request POST:/modules
     * @secure
     * @response `201` `void` Module created
     */
    createModule: (data: Module, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/modules`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Syllabus
     * @name UpdateModule
     * @summary Update a module
     * @request PATCH:/modules/{id}
     * @secure
     * @response `200` `void` Module updated
     */
    updateModule: (id: string, data: Module, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/modules/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Syllabus
     * @name DeleteModule
     * @summary Delete a module
     * @request DELETE:/modules/{id}
     * @secure
     * @response `204` `void` Module deleted
     */
    deleteModule: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/modules/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
 * No description
 *
 * @tags Syllabus
 * @name GetModuleQuestions
 * @summary Get questions for a module
 * @request GET:/modules/{id}/questions
 * @response `200` `(SuccessResponse & {
    data?: {
    items?: (Question)[],
    pagination?: Pagination,

},

})` List of questions
 */
    getModuleQuestions: (
      id: string,
      query?: {
        /** @default 1 */
        page?: number;
        /** @default 20 */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data?: {
            items?: Question[];
            pagination?: Pagination;
          };
        },
        any
      >({
        path: `/modules/${id}/questions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  topics = {
    /**
     * No description
     *
     * @tags Syllabus
     * @name CreateTopic
     * @summary Add a topic to a module
     * @request POST:/topics
     * @secure
     * @response `201` `void` Topic created
     */
    createTopic: (data: Topic, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/topics`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Syllabus
     * @name UpdateTopic
     * @summary Update a topic
     * @request PATCH:/topics/{id}
     * @secure
     * @response `200` `void` Topic updated
     */
    updateTopic: (id: string, data: Topic, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/topics/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Syllabus
     * @name DeleteTopic
     * @summary Delete a topic
     * @request DELETE:/topics/{id}
     * @secure
     * @response `204` `void` Topic deleted
     */
    deleteTopic: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/topics/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
 * No description
 *
 * @tags Syllabus
 * @name GetTopicQuestions
 * @summary Get questions for a topic
 * @request GET:/topics/{id}/questions
 * @response `200` `(SuccessResponse & {
    data?: {
    items?: (Question)[],
    pagination?: Pagination,

},

})` List of questions
 */
    getTopicQuestions: (
      id: string,
      query?: {
        /** @default 1 */
        page?: number;
        /** @default 20 */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data?: {
            items?: Question[];
            pagination?: Pagination;
          };
        },
        any
      >({
        path: `/topics/${id}/questions`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
  users = {
    /**
 * No description
 *
 * @tags Users
 * @name GetCurrentUser
 * @summary Get my profile and activity stats
 * @request GET:/users/me
 * @secure
 * @response `200` `(SuccessResponse & {
    data?: {
    user?: User,
    stats?: {
    bookmarks?: number,

},

},

})` User record and bookmark counts
 * @response `401` `Error`
 */
    getCurrentUser: (params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data?: {
            user?: User;
            stats?: {
              bookmarks?: number;
            };
          };
        },
        Error
      >({
        path: `/users/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Users
 * @name ListUsers
 * @summary List all users (Admin only)
 * @request GET:/users
 * @secure
 * @response `200` `(SuccessResponse & {
    data?: {
    items?: (User)[],
    total?: number,
    page?: number,
    limit?: number,

},

})` List of users with pagination
 */
    listUsers: (
      query?: {
        role?: "admin" | "editor" | "normal";
        search?: string;
        isActive?: boolean;
        /** @default "createdAt" */
        sortBy?: "name" | "email" | "role" | "createdAt";
        /** @default "desc" */
        sortOrder?: "asc" | "desc";
        /** @default 1 */
        page?: number;
        /** @default 10 */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data?: {
            items?: User[];
            total?: number;
            page?: number;
            limit?: number;
          };
        },
        any
      >({
        path: `/users`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Users
 * @name GetUserById
 * @summary Get a user by clerkId with activity stats (Admin only)
 * @request GET:/users/{clerkId}
 * @secure
 * @response `200` `(SuccessResponse & {
    data?: {
    user?: User,
    stats?: {
    bookmarksCount?: number,

},

},

})` User record and activity stats
 * @response `404` `Error`
 */
    getUserById: (clerkId: string, params: RequestParams = {}) =>
      this.request<
        SuccessResponse & {
          data?: {
            user?: User;
            stats?: {
              bookmarksCount?: number;
            };
          };
        },
        Error
      >({
        path: `/users/${clerkId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
 * No description
 *
 * @tags Users
 * @name UpdateUser
 * @summary Update a user (Admin only)
 * @request PATCH:/users/{clerkId}
 * @secure
 * @response `200` `(SuccessResponse & {
    data?: {
    user?: User,

},

})` User updated successfully
 */
    updateUser: (
      clerkId: string,
      data: {
        role?: "admin" | "editor" | "normal";
        isActive?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        SuccessResponse & {
          data?: {
            user?: User;
          };
        },
        any
      >({
        path: `/users/${clerkId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  webhooks = {
    /**
 * @description Secure endpoint for Clerk.com to send user lifecycle events (created, updated, deleted) and session events (created). This endpoint also enforces a "Single Session per User" policy. **Verification**: This endpoint verifies the [Svix Webhook Signature](https://docs.clerk.com/main-concepts/webhooks) to ensure requests originate from Clerk.
 *
 * @tags External Integrations
 * @name PostClerkWebhook
 * @summary Clerk Webhook Handler (Users & Sessions)
 * @request POST:/webhooks/clerk
 * @response `200` `{
  /** @example true *\/
    received?: boolean,

}` Event acknowledged and processed
 * @response `400` `Error`
 * @response `429` `Error`
 */
    postClerkWebhook: (
      data: {
        data?: object;
        /** @example "event" */
        object?: string;
        /** @example "user.created" */
        type?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example true */
          received?: boolean;
        },
        Error
      >({
        path: `/webhooks/clerk`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
