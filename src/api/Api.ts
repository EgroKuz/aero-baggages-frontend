/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateUpdateBaggage {
  /** ID */
  id?: number;
  /**
   * Number
   * @minLength 1
   * @maxLength 10
   */
  number: string;
  /**
   * Weight
   * @min -2147483648
   * @max 2147483647
   */
  weight: number;
  /**
   * Description
   * @minLength 1
   */
  description: string;
}

export interface Baggage {
  /** ID */
  id?: number;
  /**
   * Number
   * @minLength 1
   * @maxLength 10
   */
  number: string;
  /**
   * Weight
   * @min -2147483648
   * @max 2147483647
   */
  weight: number;
  /**
   * Description
   * @minLength 1
   */
  description: string;
  /**
   * Image
   * @format uri
   * @minLength 1
   * @maxLength 80
   */
  image?: string | null;
}

export interface SingleBaggage {
  /** ID */
  id?: number;
  /**
   * Number
   * @minLength 1
   * @maxLength 10
   */
  number: string;
  /**
   * Weight
   * @min -2147483648
   * @max 2147483647
   */
  weight: number;
  /**
   * Description
   * @minLength 1
   */
  description: string;
  /**
   * Image
   * @format uri
   * @minLength 1
   * @maxLength 80
   */
  image?: string | null;
  /** Status */
  status?: true | false;
}

export interface Transfer {
  /** ID */
  id?: number;
  /**
   * Transfer date
   * @format date
   */
  transfer_date?: string | null;
  /**
   * Owner name
   * @minLength 1
   * @maxLength 50
   */
  owner_name?: string | null;
  /**
   * Flight
   * @minLength 1
   * @maxLength 10
   */
  flight?: string | null;
  /** User */
  user?: string;
  /** Moderator */
  moderator?: string;
  /** Status */
  status?: "draft" | "deleted" | "formed" | "completed" | "rejected";
  /**
   * Creation date
   * @format date
   */
  creation_date?: string;
  /**
   * Formation date
   * @format date
   */
  formation_date?: string | null;
  /**
   * Completion date
   * @format date
   */
  completion_date?: string | null;
  /**
   * Heaviest baggage
   * @min -2147483648
   * @max 2147483647
   */
  heaviest_baggage?: number | null;
}

export interface BaggageTransfer {
  /** ID */
  id?: number;
  /** Fragility */
  fragility?: boolean;
  /** Transfer */
  transfer: number;
  /** Baggage */
  baggage: number;
}

export interface User {
  /** ID */
  id?: number;
  /**
   * Email address
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Password
   * @minLength 1
   * @maxLength 128
   */
  password: string;
  /**
   * First name
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Last name
   * @maxLength 150
   */
  last_name?: string;
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Staff status
   * Designates whether the user can log into this admin site.
   * @default false
   */
  is_staff?: boolean;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
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

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
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

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://127.0.0.1:8000/api" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
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
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
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

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
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
 * @title Baggage transfers API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://127.0.0.1:8000/api
 * @contact <keo22u932@student.bmstu.ru>
 *
 * API for baggage transfers
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  baggages = {
    /**
     * No description
     *
     * @tags baggages
     * @name BaggagesList
     * @request GET:/baggages/
     * @secure
     */
    baggagesList: (
      query?: {
        /** Фильтрация по совпадению веса багажа */
        baggage_weight?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** Список багажей */
          baggages?: object[];
          /** ID черновика заявки, если существует */
          draft_transfer?: number | null;
          /** Количество багажей в черновике */
          baggages_to_transfer?: number | null;
        },
        void
      >({
        path: `/baggages/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags baggages
     * @name BaggagesCreateCreate
     * @request POST:/baggages/create/
     * @secure
     */
    baggagesCreateCreate: (data: CreateUpdateBaggage, params: RequestParams = {}) =>
      this.request<Baggage, void>({
        path: `/baggages/create/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags baggages
     * @name BaggagesRead
     * @request GET:/baggages/{baggage_id}/
     * @secure
     */
    baggagesRead: (baggageId: string, params: RequestParams = {}) =>
      this.request<SingleBaggage, void>({
        path: `/baggages/${baggageId}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags baggages
     * @name BaggagesAddToTransferCreate
     * @request POST:/baggages/{baggage_id}/add_to_transfer/
     * @secure
     */
    baggagesAddToTransferCreate: (baggageId: string, params: RequestParams = {}) =>
      this.request<Transfer, void>({
        path: `/baggages/${baggageId}/add_to_transfer/`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags baggages
     * @name BaggagesDeleteDelete
     * @request DELETE:/baggages/{baggage_id}/delete/
     * @secure
     */
    baggagesDeleteDelete: (baggageId: string, params: RequestParams = {}) =>
      this.request<Baggage[], void>({
        path: `/baggages/${baggageId}/delete/`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags baggages
     * @name BaggagesUpdateUpdate
     * @request PUT:/baggages/{baggage_id}/update/
     * @secure
     */
    baggagesUpdateUpdate: (baggageId: string, data: CreateUpdateBaggage, params: RequestParams = {}) =>
      this.request<Baggage, void>({
        path: `/baggages/${baggageId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags baggages
     * @name BaggagesUpdateImageCreate
     * @request POST:/baggages/{baggage_id}/update_image/
     * @secure
     */
    baggagesUpdateImageCreate: (
      baggageId: string,
      data: {
        /**
         * Новое изображение для багажа
         * @format binary
         */
        image: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<Baggage, void>({
        path: `/baggages/${baggageId}/update_image/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  };
  transfer = {
    /**
     * No description
     *
     * @tags transfer
     * @name TransferDeleteBaggageFromTransferDelete
     * @request DELETE:/transfer/{transfer_id}/delete_baggage_from_transfer/{baggage_id}/
     * @secure
     */
    transferDeleteBaggageFromTransferDelete: (transferId: string, baggageId: string, params: RequestParams = {}) =>
      this.request<Transfer, void>({
        path: `/transfer/${transferId}/delete_baggage_from_transfer/${baggageId}/`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags transfer
     * @name TransferUpdateBaggageTransferUpdate
     * @request PUT:/transfer/{transfer_id}/update_baggage_transfer/{baggage_id}/
     * @secure
     */
    transferUpdateBaggageTransferUpdate: (transferId: string, baggageId: string, params: RequestParams = {}) =>
      this.request<BaggageTransfer, void>({
        path: `/transfer/${transferId}/update_baggage_transfer/${baggageId}/`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  transfers = {
    /**
     * No description
     *
     * @tags transfers
     * @name TransfersList
     * @request GET:/transfers/
     * @secure
     */
    transfersList: (
      query?: {
        /** Фильтр по статусу заявки */
        status?: string;
        /**
         * Начальная дата формирования (формат: YYYY-MM-DDTHH:MM:SS)
         * @format date-time
         */
        date_formation_start?: string;
        /**
         * Конечная дата формирования (формат: YYYY-MM-DDTHH:MM:SS)
         * @format date-time
         */
        date_formation_end?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Transfer[], void>({
        path: `/transfers/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags transfers
     * @name TransfersRead
     * @request GET:/transfers/{transfer_id}/
     * @secure
     */
    transfersRead: (transferId: string, params: RequestParams = {}) =>
      this.request<
        {
          /** ID */
          id?: number;
          /** Baggages to transfer */
          baggages_to_transfer?: number;
          /** Owner */
          user?: string;
          /** Baggages */
          baggages?: {
            id?: number;
            weight?: number;
            number?: string;
            description?: string;
            /** @format uri */
            image?: string;
          }[];
          /**
           * Запланированная дата отправки
           * @format date
           */
          transfer_date?: string | null;
          /**
           * Номер рейса
           * @maxLength 50
           */
          flight?: string | null;
          /**
           * Имя владельца
           * @maxLength 50
           */
          owner_name?: string | null;
          /** Moderator */
          moderator?: string | null;
          /** Статус */
          status?: "draft" | "deleted" | "formed" | "completed" | "rejected";
          /**
           * Дата создания
           * @format date-time
           */
          creation_date?: string;
          /**
           * Дата формирования
           * @format date-time
           */
          formation_date?: string | null;
          /**
           * Дата завершения
           * @format date-time
           */
          completion_date?: string | null;
          /** Самый тяжелый багаж */
          heaviest_baggage?: number | null;
        },
        void
      >({
        path: `/transfers/${transferId}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags transfers
     * @name TransfersDeleteDelete
     * @request DELETE:/transfers/{transfer_id}/delete/
     * @secure
     */
    transfersDeleteDelete: (transferId: string, params: RequestParams = {}) =>
      this.request<Transfer, void>({
        path: `/transfers/${transferId}/delete/`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags transfers
     * @name TransfersUpdateUpdate
     * @request PUT:/transfers/{transfer_id}/update/
     * @secure
     */
    transfersUpdateUpdate: (
      transferId: string,
      data: {
        /**
         * Дата отправки (формат: YYYY-MM-DDTHH:MM:SS)
         * @format date-time
         */
        transfer_date?: string;
        /** ФИО владельца багажа */
        owner_name?: string;
        /** Номер рейса */
        flight?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Transfer, void>({
        path: `/transfers/${transferId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags transfers
     * @name TransfersUpdateStatusAdminUpdate
     * @request PUT:/transfers/{transfer_id}/update_status_admin/
     * @secure
     */
    transfersUpdateStatusAdminUpdate: (
      transferId: string,
      data: {
        /** Новый статус заявки ('completed' для завершения, 'rejected' для отклонения) */
        status: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Transfer, void>({
        path: `/transfers/${transferId}/update_status_admin/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags transfers
     * @name TransfersUpdateStatusUserUpdate
     * @request PUT:/transfers/{transfer_id}/update_status_user/
     * @secure
     */
    transfersUpdateStatusUserUpdate: (transferId: string, params: RequestParams = {}) =>
      this.request<Transfer, void>({
        path: `/transfers/${transferId}/update_status_user/`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags users
     * @name UsersList
     * @request GET:/users/
     * @secure
     */
    usersList: (params: RequestParams = {}) =>
      this.request<
        {
          /** ID пользователя */
          id?: number;
          /** Имя пользователя */
          username?: string;
          /** Электронная почта пользователя */
          email?: string;
          /** Является ли сотрудником */
          is_staff?: boolean;
          /** Является ли суперпользователем */
          is_superuser?: boolean;
        }[],
        void
      >({
        path: `/users/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersLoginCreate
     * @request POST:/users/login/
     * @secure
     */
    usersLoginCreate: (
      data: {
        /** username */
        username: string;
        /** password */
        password: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        User,
        {
          error?: string;
        }
      >({
        path: `/users/login/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.UrlEncoded,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersLogoutCreate
     * @request POST:/users/logout/
     * @secure
     */
    usersLogoutCreate: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/users/logout/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersRegisterCreate
     * @request POST:/users/register/
     * @secure
     */
    usersRegisterCreate: (data: User, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/users/register/`,
        method: "POST",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersUpdateUpdate
     * @request PUT:/users/update/
     * @secure
     */
    usersUpdateUpdate: (data: User, params: RequestParams = {}) =>
      this.request<User, void>({
        path: `/users/update/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersAssignManagerCreate
     * @request POST:/users/{user_id}/assign_manager/
     * @secure
     */
    usersAssignManagerCreate: (userId: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/users/${userId}/assign_manager/`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
}
